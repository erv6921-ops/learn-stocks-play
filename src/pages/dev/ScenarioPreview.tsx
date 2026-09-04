import { useSearchParams } from "react-router-dom"
import { ScenarioResponse } from "@/components/lesson/ScenarioResponse"
import { getScenarioSet } from "@/content/gullerIntro/scenarios"

// DEV-ONLY isolated preview of the P4 scenario free-response panel, so it can be
// reviewed without driving a whole lesson to the completion screen. Gated behind
// import.meta.env.DEV in App.tsx, so it never exists in a production build.
//   /dev/scenario                       → defaults to gulliver-lo-1-1
//   /dev/scenario?lesson=gulliver-lo-1-4 → previews any lesson's scenario set
const GULLIVER_LOS = Array.from({ length: 8 }, (_, i) => `gulliver-lo-1-${i + 1}`)

export default function ScenarioPreview() {
  const [params, setParams] = useSearchParams()
  const lessonId = params.get("lesson") || "gulliver-lo-1-1"
  const set = getScenarioSet(lessonId)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Dev preview
          </p>
          <h1 className="text-2xl font-bold">Scenario free-response</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Exactly what students see (optionally) under the lesson completion screen. Submitting
            needs the <code>scenario_responses</code> table (see BUILD-SUMMARY.md); until then a
            submit shows a soft error toast and nothing breaks.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {GULLIVER_LOS.map((id) => (
            <button
              key={id}
              onClick={() => setParams({ lesson: id })}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                id === lessonId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {id.replace("gulliver-lo-", "LO ")}
            </button>
          ))}
        </div>

        {set ? (
          <ScenarioResponse lessonId={lessonId} />
        ) : (
          <p className="text-sm text-muted-foreground py-8">
            No scenario set for <code>{lessonId}</code>.
          </p>
        )}
      </div>
    </div>
  )
}
