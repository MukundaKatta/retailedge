"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const hourlyData = [
  { hour: "8AM", visitors: 45, dwell_min: 12, conversion: 22 }, { hour: "9AM", visitors: 120, dwell_min: 15, conversion: 28 },
  { hour: "10AM", visitors: 210, dwell_min: 18, conversion: 32 }, { hour: "11AM", visitors: 280, dwell_min: 22, conversion: 35 },
  { hour: "12PM", visitors: 350, dwell_min: 14, conversion: 30 }, { hour: "1PM", visitors: 310, dwell_min: 16, conversion: 31 },
  { hour: "2PM", visitors: 260, dwell_min: 20, conversion: 33 }, { hour: "3PM", visitors: 290, dwell_min: 19, conversion: 34 },
  { hour: "4PM", visitors: 320, dwell_min: 17, conversion: 29 }, { hour: "5PM", visitors: 380, dwell_min: 13, conversion: 27 },
  { hour: "6PM", visitors: 290, dwell_min: 15, conversion: 31 }, { hour: "7PM", visitors: 180, dwell_min: 21, conversion: 36 },
];

const zoneHeatmap = [
  { zone: "Entrance", traffic: 100, dwell: 1.2, engagement: "Low" },
  { zone: "Fresh Produce", traffic: 78, dwell: 4.5, engagement: "High" },
  { zone: "Beverages", traffic: 65, dwell: 2.8, engagement: "Medium" },
  { zone: "Snacks & Candy", traffic: 82, dwell: 3.2, engagement: "High" },
  { zone: "Electronics", traffic: 35, dwell: 8.5, engagement: "Very High" },
  { zone: "Checkout", traffic: 95, dwell: 5.2, engagement: "Medium" },
  { zone: "Pharmacy", traffic: 22, dwell: 6.8, engagement: "High" },
  { zone: "Home Goods", traffic: 45, dwell: 4.1, engagement: "Medium" },
];

const demographics = [
  { group: "18-24", pct: 15, avg_spend: 28 }, { group: "25-34", pct: 28, avg_spend: 45 },
  { group: "35-44", pct: 24, avg_spend: 62 }, { group: "45-54", pct: 18, avg_spend: 55 },
  { group: "55+", pct: 15, avg_spend: 48 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("today");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-gray-900">Customer Analytics</h1><p className="text-gray-500 mt-1">AI-powered customer behavior insights processed entirely on-device</p></div>
          <div className="flex gap-2">
            {["today", "week", "month"].map((t) => (
              <button key={t} onClick={() => setTimeRange(t)} className={`px-4 py-2 rounded-lg text-sm font-medium ${timeRange === t ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Total Visitors</p><p className="text-3xl font-bold text-cyan-600 mt-1">3,035</p><p className="text-xs text-green-600 mt-1">+8% vs yesterday</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg Dwell Time</p><p className="text-3xl font-bold text-blue-600 mt-1">16.8 min</p><p className="text-xs text-green-600 mt-1">+2.1 min vs avg</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Conversion Rate</p><p className="text-3xl font-bold text-green-600 mt-1">31.2%</p><p className="text-xs text-green-600 mt-1">+1.5% vs last week</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Peak Hour</p><p className="text-3xl font-bold text-purple-600 mt-1">5 PM</p><p className="text-xs text-gray-400 mt-1">380 visitors</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hourly Traffic</h2>
            <div className="space-y-2">
              {hourlyData.map((h) => (
                <div key={h.hour} className="flex items-center gap-3">
                  <span className="w-10 text-xs text-gray-500">{h.hour}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${(h.visitors / 400) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8 text-right">{h.visitors}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Zone Heatmap</h2>
            <div className="grid grid-cols-2 gap-3">
              {zoneHeatmap.map((z) => (
                <div key={z.zone} className={`p-3 rounded-lg ${z.traffic > 80 ? "bg-red-50" : z.traffic > 50 ? "bg-amber-50" : "bg-blue-50"}`}>
                  <p className="font-medium text-gray-900 text-sm">{z.zone}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Traffic: {z.traffic}%</span>
                    <span>Dwell: {z.dwell}min</span>
                  </div>
                  <span className={`text-xs ${z.engagement === "Very High" ? "text-purple-600" : z.engagement === "High" ? "text-green-600" : z.engagement === "Medium" ? "text-amber-600" : "text-gray-500"}`}>{z.engagement} engagement</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution (AI Estimated)</h2>
          <div className="flex gap-4">
            {demographics.map((d) => (
              <div key={d.group} className="flex-1 text-center">
                <div className="h-32 bg-gray-100 rounded-lg relative overflow-hidden mb-2">
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-lg" style={{ height: `${d.pct * 3}%` }} />
                </div>
                <p className="text-sm font-medium">{d.group}</p>
                <p className="text-xs text-gray-500">{d.pct}% | ${d.avg_spend} avg</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">All analytics computed on-device. No images or personal data leave the store network.</p>
        </div>
      </main>
    </div>
  );
}
