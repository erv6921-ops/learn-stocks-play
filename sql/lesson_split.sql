create or replace function public.split_lesson(
  p_lesson_id uuid,
  p_part1_name text,
  p_part1_content jsonb,
  p_part2_name text,
  p_part2_content jsonb,
  p_part2_question_ids uuid[]
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_teacher uuid;
  v_upload uuid;
  v_sub uuid;
  v_status text;
  v_approved timestamptz;
  v_created timestamptz;
  v_new_id uuid;
  v_moved int := 0;
  v_cla int := 0;
  v_al int := 0;
begin
  select teacher_id, upload_id, sub_lesson_id, status, teacher_approved_at, created_at
    into v_teacher, v_upload, v_sub, v_status, v_approved, v_created
    from public.lessons where id = p_lesson_id for update;

  if not found then
    raise exception 'Lesson % not found', p_lesson_id;
  end if;

  if v_teacher is null or v_teacher is distinct from auth.uid() then
    raise exception 'Only the lesson owner can split this lesson';
  end if;

  update public.lessons
     set name = p_part1_name, content = p_part1_content
   where id = p_lesson_id;

  insert into public.lessons
    (upload_id, sub_lesson_id, teacher_id, name, status, content, teacher_approved_at, created_at)
  values
    (v_upload, v_sub, v_teacher, p_part2_name, v_status, p_part2_content, v_approved,
     v_created - interval '1 second')
  returning id into v_new_id;

  update public.generated_questions
     set lesson_id = v_new_id
   where lesson_id = p_lesson_id
     and id = any (coalesce(p_part2_question_ids, array[]::uuid[]));
  get diagnostics v_moved = row_count;

  insert into public.class_lesson_assignments (class_id, lesson_id)
  select cla.class_id, v_new_id
    from public.class_lesson_assignments cla
   where cla.lesson_id = p_lesson_id
  on conflict (lesson_id, class_id) do nothing;
  get diagnostics v_cla = row_count;

  insert into public.assigned_lessons
    (class_id, lesson_id, assigned_by, assignment_type, due_date, due_time)
  select al.class_id, v_new_id::text, al.assigned_by, al.assignment_type, al.due_date, al.due_time
    from public.assigned_lessons al
   where al.lesson_id = p_lesson_id::text
  on conflict (class_id, lesson_id) do nothing;
  get diagnostics v_al = row_count;

  return jsonb_build_object(
    'part2_lesson_id', v_new_id,
    'questions_moved', v_moved,
    'classes_assigned', greatest(v_cla, v_al)
  );
end;
$fn$;

grant execute on function public.split_lesson(uuid, text, jsonb, text, jsonb, uuid[]) to authenticated;
