"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const inventory = [
  { sku: "BEV-001", name: "Sparkling Water 1L", category: "Beverages", store: "Store #3", stock: 12, min_stock: 20, max_stock: 100, velocity: 8.5, days_supply: 1.4, ai_reorder: true, status: "low" },
  { sku: "DAI-015", name: "Organic Whole Milk 1G", category: "Dairy", store: "Store #12", stock: 0, min_stock: 15, max_stock: 60, velocity: 12, days_supply: 0, ai_reorder: true, status: "out" },
  { sku: "DAI-022", name: "Greek Yogurt Vanilla", category: "Dairy", store: "Store #12", stock: 0, min_stock: 10, max_stock: 40, velocity: 6.2, days_supply: 0, ai_reorder: true, status: "out" },
  { sku: "SNK-045", name: "Trail Mix Premium", category: "Snacks", store: "Store #7", stock: 45, min_stock: 20, max_stock: 80, velocity: 4.2, days_supply: 10.7, ai_reorder: false, status: "ok" },
  { sku: "ELE-008", name: "USB-C Cable 2m", category: "Electronics", store: "Store #15", stock: 8, min_stock: 5, max_stock: 30, velocity: 1.8, days_supply: 4.4, ai_reorder: false, status: "ok" },
  { sku: "PRO-012", name: "Avocados Organic", category: "Produce", store: "Store #7", stock: 18, min_stock: 25, max_stock: 80, velocity: 15, days_supply: 1.2, ai_reorder: true, status: "low" },
  { sku: "BEV-032", name: "Cold Brew Coffee 12oz", category: "Beverages", store: "Store #3", stock: 35, min_stock: 15, max_stock: 60, velocity: 5.5, days_supply: 6.4, ai_reorder: false, status: "ok" },
  { sku: "SNK-018", name: "Protein Bars Box", category: "Snacks", store: "Store #21", stock: 5, min_stock: 10, max_stock: 50, velocity: 3.8, days_supply: 1.3, ai_reorder: true, status: "low" },
];

export default function InventoryPage() {
  const [filter, setFilter] = useState<"all" | "out" | "low" | "ok">("all");
  const filtered = inventory.filter((i) => filter === "all" || i.status === filter);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Inventory Management</h1>
          <p className="text-gray-500 mt-1">AI-powered inventory monitoring with automatic reorder triggers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Out of Stock</p><p className="text-3xl font-bold text-red-600 mt-1">{inventory.filter((i) => i.status === "out").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Low Stock</p><p className="text-3xl font-bold text-amber-600 mt-1">{inventory.filter((i) => i.status === "low").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Auto-Reorders</p><p className="text-3xl font-bold text-cyan-600 mt-1">{inventory.filter((i) => i.ai_reorder).length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Tracked SKUs</p><p className="text-3xl font-bold text-gray-600 mt-1">{inventory.length}</p></div>
        </div>
        <div className="flex gap-2 mb-6">
          {(["all", "out", "low", "ok"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {f === "all" ? "All Items" : f === "out" ? "Out of Stock" : f === "low" ? "Low Stock" : "In Stock"}
            </button>
          ))}
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Product</th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Store</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Stock</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Velocity/day</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Days Supply</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">AI Reorder</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Status</th>
            </tr></thead>
            <tbody>{filtered.map((item) => (
              <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3"><p className="font-medium">{item.name}</p><p className="text-xs text-gray-500">{item.sku} | {item.category}</p></td>
                <td className="py-3 px-3">{item.store}</td>
                <td className="py-3 px-3 text-right"><span className={item.stock === 0 ? "text-red-600 font-bold" : item.stock < item.min_stock ? "text-amber-600 font-medium" : ""}>{item.stock}</span><span className="text-gray-400">/{item.max_stock}</span></td>
                <td className="py-3 px-3 text-right">{item.velocity}/day</td>
                <td className="py-3 px-3 text-right"><span className={item.days_supply < 2 ? "text-red-600 font-medium" : ""}>{item.days_supply.toFixed(1)} days</span></td>
                <td className="py-3 px-3 text-center">{item.ai_reorder ? <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full">Triggered</span> : <span className="text-xs text-gray-400">-</span>}</td>
                <td className="py-3 px-3 text-center"><span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === "out" ? "bg-red-100 text-red-700" : item.status === "low" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{item.status === "out" ? "Out" : item.status === "low" ? "Low" : "OK"}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
