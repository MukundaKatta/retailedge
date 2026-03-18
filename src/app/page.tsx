"use client";
import Sidebar from "@/components/Sidebar";

const stats = [
  { label: "Active Stores", value: "24", change: "+3 this month", color: "text-cyan-600" },
  { label: "Edge Devices", value: "186", change: "98% online", color: "text-green-600" },
  { label: "Daily Customers", value: "12.4K", change: "+8% vs last week", color: "text-blue-600" },
  { label: "AI Detections/hr", value: "45.2K", change: "All on-device", color: "text-purple-600" },
];

const recentAlerts = [
  { type: "shelf", message: "Low stock: Organic Milk (Aisle 3, Store #12)", time: "2 min ago", severity: "warning" },
  { type: "analytics", message: "Unusual crowd density at Store #7 entrance", time: "8 min ago", severity: "info" },
  { type: "device", message: "Camera #23 offline at Store #15", time: "15 min ago", severity: "error" },
  { type: "inventory", message: "Restock needed: Fresh produce section, Store #3", time: "22 min ago", severity: "warning" },
  { type: "pos", message: "POS terminal #4 processing slow at Store #9", time: "35 min ago", severity: "info" },
  { type: "signage", message: "Content update deployed to 48 displays", time: "1 hr ago", severity: "success" },
];

const storePerformance = [
  { store: "Store #3 - Downtown", customers: 1250, conversion: 34, revenue: 45200, ai_alerts: 12, devices: 12 },
  { store: "Store #7 - Mall", customers: 2100, conversion: 28, revenue: 62400, ai_alerts: 8, devices: 18 },
  { store: "Store #12 - Suburb", customers: 890, conversion: 38, revenue: 31800, ai_alerts: 15, devices: 10 },
  { store: "Store #15 - Airport", customers: 3200, conversion: 22, revenue: 48600, ai_alerts: 5, devices: 14 },
  { store: "Store #21 - University", customers: 1650, conversion: 31, revenue: 28900, ai_alerts: 9, devices: 8 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">RetailEdge Dashboard</h1>
          <p className="text-gray-500 mt-1">On-device AI for retail operations across all stores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-xl p-6 card-hover">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Alerts</h2>
            <div className="space-y-3">
              {recentAlerts.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${a.severity === "error" ? "bg-red-500" : a.severity === "warning" ? "bg-amber-500" : a.severity === "success" ? "bg-green-500" : "bg-blue-500"}`} />
                    <div>
                      <p className="text-sm text-gray-900">{a.message}</p>
                      <p className="text-xs text-gray-500">{a.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${a.severity === "error" ? "bg-red-100 text-red-700" : a.severity === "warning" ? "bg-amber-100 text-amber-700" : a.severity === "success" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{a.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Performance (Today)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2 text-gray-500 font-medium">Store</th><th className="text-right py-2 text-gray-500 font-medium">Visitors</th><th className="text-right py-2 text-gray-500 font-medium">Conv%</th><th className="text-right py-2 text-gray-500 font-medium">Revenue</th><th className="text-right py-2 text-gray-500 font-medium">Devices</th></tr></thead>
                <tbody>{storePerformance.map((s) => (
                  <tr key={s.store} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 font-medium">{s.store}</td>
                    <td className="py-2 text-right">{s.customers.toLocaleString()}</td>
                    <td className="py-2 text-right">{s.conversion}%</td>
                    <td className="py-2 text-right">${s.revenue.toLocaleString()}</td>
                    <td className="py-2 text-right">{s.devices}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Processing Summary (Today)</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[["Shelf Scans", "128K", "bg-cyan-100 text-cyan-700"], ["Face Detections", "45K", "bg-blue-100 text-blue-700"], ["Product IDs", "89K", "bg-purple-100 text-purple-700"], ["Queue Counts", "12K", "bg-green-100 text-green-700"], ["Signage Triggers", "2.4K", "bg-amber-100 text-amber-700"], ["Anomalies", "23", "bg-red-100 text-red-700"]].map(([label, value, color]) => (
              <div key={label} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className={`text-2xl font-bold ${(color as string).split(" ")[1]}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
