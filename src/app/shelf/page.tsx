"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const shelves = [
  { id: "S1", aisle: "Aisle 1 - Beverages", store: "Store #3", products: 48, out_of_stock: 2, misplaced: 1, last_scan: "2 min ago", camera: "Cam-12", status: "ok", alerts: ["Low stock: Sparkling Water (3 units left)"] },
  { id: "S2", aisle: "Aisle 2 - Snacks", store: "Store #3", products: 62, out_of_stock: 0, misplaced: 3, last_scan: "1 min ago", camera: "Cam-13", status: "warning", alerts: ["3 misplaced items detected", "Planogram compliance: 87%"] },
  { id: "S3", aisle: "Aisle 3 - Dairy", store: "Store #12", products: 35, out_of_stock: 4, misplaced: 0, last_scan: "5 min ago", camera: "Cam-22", status: "critical", alerts: ["4 SKUs out of stock", "Organic Milk: 0 units", "Greek Yogurt: 0 units"] },
  { id: "S4", aisle: "Aisle 4 - Fresh Produce", store: "Store #7", products: 28, out_of_stock: 1, misplaced: 0, last_scan: "30 sec ago", camera: "Cam-31", status: "ok", alerts: [] },
  { id: "S5", aisle: "Aisle 5 - Electronics", store: "Store #15", products: 55, out_of_stock: 0, misplaced: 2, last_scan: "3 min ago", camera: "Cam-41", status: "ok", alerts: ["Price tag missing on 2 items"] },
  { id: "S6", aisle: "Checkout Zone", store: "Store #7", products: 120, out_of_stock: 5, misplaced: 8, last_scan: "1 min ago", camera: "Cam-50", status: "warning", alerts: ["High impulse-buy zone", "5 empty slots need restocking"] },
];

export default function ShelfPage() {
  const [filter, setFilter] = useState<"all" | "ok" | "warning" | "critical">("all");
  const filtered = shelves.filter((s) => filter === "all" || s.status === filter);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Shelf Monitoring</h1>
          <p className="text-gray-500 mt-1">AI-powered shelf scanning for stock levels, planogram compliance, and misplaced items</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Monitored Shelves</p><p className="text-3xl font-bold text-cyan-600 mt-1">{shelves.length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Out of Stock SKUs</p><p className="text-3xl font-bold text-red-600 mt-1">{shelves.reduce((s, sh) => s + sh.out_of_stock, 0)}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Misplaced Items</p><p className="text-3xl font-bold text-amber-600 mt-1">{shelves.reduce((s, sh) => s + sh.misplaced, 0)}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg Scan Interval</p><p className="text-3xl font-bold text-green-600 mt-1">2.1min</p></div>
        </div>
        <div className="flex gap-2 mb-6">
          {(["all", "ok", "warning", "critical"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f === "all" ? "All Shelves" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map((s) => (
            <div key={s.id} className={`glass rounded-xl p-5 border-l-4 ${s.status === "critical" ? "border-red-500" : s.status === "warning" ? "border-amber-500" : "border-green-500"}`}>
              <div className="flex items-center justify-between mb-3">
                <div><h3 className="font-semibold text-gray-900">{s.aisle}</h3><p className="text-xs text-gray-500">{s.store} | {s.camera} | Last scan: {s.last_scan}</p></div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === "critical" ? "bg-red-100 text-red-700" : s.status === "warning" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{s.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Products</p><p className="text-sm font-bold">{s.products}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Out of Stock</p><p className={`text-sm font-bold ${s.out_of_stock > 0 ? "text-red-600" : "text-green-600"}`}>{s.out_of_stock}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Misplaced</p><p className={`text-sm font-bold ${s.misplaced > 0 ? "text-amber-600" : "text-green-600"}`}>{s.misplaced}</p></div>
              </div>
              {s.alerts.length > 0 && (
                <div className="space-y-1">{s.alerts.map((a, i) => (
                  <p key={i} className="text-xs text-gray-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />{a}</p>
                ))}</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
