import { createClient } from "@/lib/supabase/server";

export default async function SecureDashboard() {
  const supabase = await createClient();
  const { data: telemetry, error } = await supabase
    .from("telemetry")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section role="alert" className="flex items-center justify-center min-h-[400px] text-rose-500 bg-rose-500/5 rounded-xl border border-rose-500/20">
        Error loading telemetry data. Please check your Supabase connection.
      </section>
    );
  }

  return (
    <section 
      id="secure-dashboard-rsc" 
      className="flex flex-col min-h-screen bg-slate-950 text-slate-50 p-6"
      aria-labelledby="dashboard-title"
      aria-busy={telemetry === null}
    >
      <header className="mb-8">
        <h1 id="dashboard-title" className="text-2xl font-semibold tracking-tight text-white">
          Secure Telemetry Dashboard
        </h1>
      </header>

      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {telemetry?.length === 0 ? (
            <p className="text-slate-400 italic">No telemetry events detected.</p>
          ) : (
            telemetry?.map((event) => (
              <div key={event.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-emerald-400 px-2 py-1 bg-emerald-400/10 rounded-md">
                    {event.event}
                  </span>
                  <time className="text-xs text-slate-500">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </time>
                </div>
                
                <pre className="text-[10px] font-mono text-slate-400 bg-black/30 p-2 rounded overflow-x-auto max-h-32 mb-2">
                  {JSON.stringify(event.metadata, null, 2)}
                </pre>
                
                <div className="text-[10px] text-slate-600 text-right">
                  ID: {event.id.split('-')[0]}...
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
  );
}
