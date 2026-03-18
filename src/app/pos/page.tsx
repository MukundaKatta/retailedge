"use client";
import Sidebar from "@/components/Sidebar";

const terminals = [
  { id: "POS-01", store: "Store #3", status: "active", transactions_today: 342, avg_time_s: 45, ai_features: ["Product recognition", "Customer count", "Queue estimation"], last_tx: "30 sec ago", revenue: 12450 },
  { id: "POS-02", store: "Store #3", status: "active", transactions_today: 298, avg_time_s: 52, ai_features: ["Product recognition", "Fraud detection"], last_tx: "1 min ago", revenue: 10820 },
  { id: "POS-03", store: "Store #7", status: "active", transactions_today: 456, avg_time_s: 38, ai_features: ["Product recognition", "Self-checkout assist", "Queue estimation"], last_tx: "15 sec ago", revenue: 18200 },
  { id: "POS-04", store: "Store #7", status: "slow", transactions_today: 189, avg_time_s: 72, ai_features: ["Product recognition"], last_tx: "3 min ago", revenue: 7560 },
  { id: "POS-05", store: "Store #12", status: "active", transactions_today: 278, avg_time_s: 41, ai_features: ["Product recognition", "Customer count", "Loyalty recognition"], last_tx: "45 sec ago", revenue: 9840 },
  { id: "POS-06", store: "Store #15", status: "offline", transactions_today: 0, avg_time_s: 0, ai_features: ["Product recognition"], last_tx: "2 hrs ago", revenue: 0 },
];

const aiInsights = [
  { insight: "Queue at Store #7 exceeding 5 min average wait", action: "Open additional checkout lane", impact: "+12% throughput" },
  { insight: "Product recognition confidence low for new organic line", action: "Retrain model with new SKU images", impact: "+8% accuracy" },
  { insight: "Peak checkout time: 5-6 PM across all stores", action: "Pre-staff additional lanes at 4:45 PM", impact: "-22% wait time" },
  { insight: "Self-checkout error rate 15% at Store #7", action: "Update product weight database", impact: "-60% false alerts" },
];

export default function POSPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">POS Integration</h1>
          <p className="text-gray-500 mt-1">AI-enhanced point-of-sale with on-device product recognition and queue management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Active Terminals</p><p className="text-3xl font-bold text-cyan-600 mt-1">{terminals.filter((t) => t.status === "active").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Transactions Today</p><p className="text-3xl font-bold text-green-600 mt-1">{terminals.reduce((s, t) => s + t.transactions_today, 0).toLocaleString()}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg Checkout Time</p><p className="text-3xl font-bold text-blue-600 mt-1">{Math.round(terminals.filter((t) => t.avg_time_s > 0).reduce((s, t) => s + t.avg_time_s, 0) / terminals.filter((t) => t.avg_time_s > 0).length)}s</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Total Revenue</p><p className="text-3xl font-bold text-purple-600 mt-1">${(terminals.reduce((s, t) => s + t.revenue, 0) / 1000).toFixed(1)}K</p></div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Terminal Status</h2>
          <div className="space-y-3">
            {terminals.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${t.status === "active" ? "bg-green-500" : t.status === "slow" ? "bg-amber-500 animate-pulse" : "bg-red-500"}`} />
                  <div><p className="font-medium text-gray-900">{t.id} - {t.store}</p><p className="text-xs text-gray-500">Last tx: {t.last_tx} | Avg: {t.avg_time_s}s</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><p className="text-sm font-medium">{t.transactions_today} txns</p><p className="text-xs text-gray-500">${t.revenue.toLocaleString()}</p></div>
                  <div className="flex gap-1">{t.ai_features.slice(0, 2).map((f) => <span key={f} className="text-xs px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded">{f}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h2>
          <div className="space-y-3">
            {aiInsights.map((a, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 text-sm">{a.insight}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-blue-600">Action: {a.action}</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Impact: {a.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
