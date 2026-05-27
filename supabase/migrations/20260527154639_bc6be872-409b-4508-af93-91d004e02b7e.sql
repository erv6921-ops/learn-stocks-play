-- Add DELETE policy for lesson_progress so users can remove their own records
CREATE POLICY "Users can delete own lesson progress"
ON public.lesson_progress
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);