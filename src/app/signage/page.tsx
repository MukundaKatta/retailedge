"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const displays = [
  { id: "D-01", location: "Store #3 Entrance", size: "55in", resolution: "4K", content: "Welcome + Promotions", ai_trigger: "Customer demographics", impressions: 1250, engagement_pct: 34, status: "active" },
  { id: "D-02", location: "Store #3 Aisle 2", size: "32in", resolution: "1080p", content: "Snack promotions", ai_trigger: "Product proximity", impressions: 890, engagement_pct: 45, status: "active" },
  { id: "D-03", location: "Store #7 Checkout", size: "24in", resolution: "1080p", content: "Queue entertainment + upsell", ai_trigger: "Wait time > 2min", impressions: 2100, engagement_pct: 28, status: "active" },
  { id: "D-04", location: "Store #7 Window", size: "75in", resolution: "4K", content: "Time-based promotions", ai_trigger: "Time of day + weather", impressions: 3200, engagement_pct: 18, status: "active" },
  { id: "D-05", location: "Store #12 Electronics", size: "43in", resolution: "4K", content: "Product demos", ai_trigger: "Customer dwell time", impressions: 420, engagement_pct: 62, status: "active" },
  { id: "D-06", location: "Store #15 Gate Area", size: "65in", resolution: "4K", content: "Travel retail promotions", ai_trigger: "Flight schedule + crowd", impressions: 4500, engagement_pct: 22, status: "updating" },
];

const contentRules = [
  { trigger: "Age group 18-24 detected", content: "Show trending snacks + energy drinks promo", effectiveness: 42 },
  { trigger: "Age group 35-54 detected", content: "Show premium wine + organic food deals", effectiveness: 38 },
  { trigger: "Queue wait > 3 minutes", content: "Switch to entertainment + impulse buy ads", effectiveness: 55 },
  { trigger: "Rainy weather detected", content: "Show hot beverages + comfort food", effectiveness: 48 },
  { trigger: "Evening (after 5 PM)", content: "Show dinner meal deals + ready-to-eat", effectiveness: 52 },
  { trigger: "Low foot traffic", content: "Show flash sale to drive traffic", effectiveness: 35 },
];

export default function SignagePage() {
  const [selectedDisplay, setSelectedDisplay] = useState<typeof displays[0] | null>(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Digital Signage AI</h1>
          <p className="text-gray-500 mt-1">AI-triggered dynamic content based on real-time customer behavior</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Active Displays</p><p className="text-3xl font-bold text-cyan-600 mt-1">{displays.filter((d) => d.status === "active").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Total Impressions</p><p className="text-3xl font-bold text-blue-600 mt-1">{(displays.reduce((s, d) => s + d.impressions, 0) / 1000).toFixed(1)}K</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg Engagement</p><p className="text-3xl font-bold text-green-600 mt-1">{Math.round(displays.reduce((s, d) => s + d.engagement_pct, 0) / displays.length)}%</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">AI Content Rules</p><p className="text-3xl font-bold text-purple-600 mt-1">{contentRules.length}</p></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displays.map((d) => (
            <div key={d.id} onClick={() => setSelectedDisplay(d)} className={`glass rounded-xl p-5 cursor-pointer card-hover ${selectedDisplay?.id === d.id ? "ring-2 ring-cyan-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div><h3 className="font-semibold text-gray-900 text-sm">{d.location}</h3><p className="text-xs text-gray-500">{d.size} {d.resolution} | {d.id}</p></div>
                <span className={`text-xs px-2 py-1 rounded-full ${d.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{d.status}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{d.content}</p>
              <p className="text-xs text-gray-500 mb-2">Trigger: {d.ai_trigger}</p>
              <div className="flex justify-between text-xs">
                <span>{d.impressions.toLocaleString()} impressions</span>
                <span className="font-medium text-cyan-600">{d.engagement_pct}% engagement</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Content Rules</h2>
          <div className="space-y-3">
            {contentRules.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">When: {r.trigger}</p>
                  <p className="text-xs text-gray-500">Show: {r.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${r.effectiveness}%` }} />
                  </div>
                  <span className="text-sm font-medium text-cyan-600">{r.effectiveness}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
