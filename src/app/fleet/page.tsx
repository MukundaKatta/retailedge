"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const devices = [
  { id: "DEV-001", type: "Jetson Orin Nano", store: "Store #3", role: "Shelf Scanner", status: "online", cpu: 42, memory: 65, temp: 52, uptime: "14d 6h", model: "YOLOv8 Nano", fps: 30, last_update: "v2.4.1" },
  { id: "DEV-002", type: "Hailo-8L + RPi 5", store: "Store #3", role: "Customer Counter", status: "online", cpu: 28, memory: 45, temp: 38, uptime: "21d 12h", model: "MobileNet V3", fps: 25, last_update: "v2.4.1" },
  { id: "DEV-003", type: "Jetson Orin Nano", store: "Store #7", role: "POS Vision", status: "online", cpu: 55, memory: 72, temp: 58, uptime: "7d 3h", model: "Product Recognition V3", fps: 15, last_update: "v2.4.0" },
  { id: "DEV-004", type: "Coral Edge TPU", store: "Store #7", role: "Queue Monitor", status: "online", cpu: 15, memory: 32, temp: 35, uptime: "30d 0h", model: "Person Detection", fps: 22, last_update: "v2.3.8" },
  { id: "DEV-005", type: "Jetson Orin Nano", store: "Store #12", role: "Shelf Scanner", status: "offline", cpu: 0, memory: 0, temp: 0, uptime: "0", model: "YOLOv8 Nano", fps: 0, last_update: "v2.4.1" },
  { id: "DEV-006", type: "Hailo-8 + RPi 5", store: "Store #12", role: "Multi-Camera", status: "online", cpu: 62, memory: 58, temp: 42, uptime: "10d 18h", model: "YOLOv8 + ReID", fps: 20, last_update: "v2.4.1" },
  { id: "DEV-007", type: "RPi 5", store: "Store #15", role: "Digital Signage", status: "online", cpu: 18, memory: 35, temp: 40, uptime: "45d 8h", model: "Content Engine", fps: 0, last_update: "v2.4.0" },
  { id: "DEV-008", type: "Jetson Orin NX", store: "Store #15", role: "Multi-Model Hub", status: "online", cpu: 78, memory: 82, temp: 65, uptime: "5d 14h", model: "Multi (YOLO+Whisper+Phi-3)", fps: 28, last_update: "v2.4.1" },
];

export default function FleetPage() {
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
  const filtered = devices.filter((d) => filter === "all" || d.status === filter);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Device Fleet Management</h1>
          <p className="text-gray-500 mt-1">Monitor and manage all edge AI devices across your retail network</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Total Devices</p><p className="text-3xl font-bold text-cyan-600 mt-1">{devices.length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Online</p><p className="text-3xl font-bold text-green-600 mt-1">{devices.filter((d) => d.status === "online").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Offline</p><p className="text-3xl font-bold text-red-600 mt-1">{devices.filter((d) => d.status === "offline").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg CPU Load</p><p className="text-3xl font-bold text-blue-600 mt-1">{Math.round(devices.filter((d) => d.status === "online").reduce((s, d) => s + d.cpu, 0) / devices.filter((d) => d.status === "online").length)}%</p></div>
        </div>
        <div className="flex gap-2 mb-6">
          {(["all", "online", "offline"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"}`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
          <button className="ml-auto px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700">Push Update to All</button>
        </div>
        <div className="space-y-3">
          {filtered.map((d) => (
            <div key={d.id} className={`glass rounded-xl p-5 ${d.status === "offline" ? "opacity-60" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${d.status === "online" ? "bg-green-500" : "bg-red-500"}`} />
                  <div><p className="font-semibold text-gray-900">{d.id} - {d.type}</p><p className="text-xs text-gray-500">{d.store} | {d.role} | Model: {d.model}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">Uptime: {d.uptime}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">{d.last_update}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${d.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{d.status}</span>
                </div>
              </div>
              {d.status === "online" && (
                <div className="grid grid-cols-4 gap-3">
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">CPU</span><span className={d.cpu > 70 ? "text-red-600" : ""}>{d.cpu}%</span></div><div className="h-2 bg-gray-200 rounded-full"><div className={`h-full rounded-full ${d.cpu > 70 ? "bg-red-500" : d.cpu > 50 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${d.cpu}%` }} /></div></div>
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Memory</span><span>{d.memory}%</span></div><div className="h-2 bg-gray-200 rounded-full"><div className={`h-full rounded-full ${d.memory > 80 ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${d.memory}%` }} /></div></div>
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Temp</span><span className={d.temp > 60 ? "text-red-600" : ""}>{d.temp}C</span></div><div className="h-2 bg-gray-200 rounded-full"><div className={`h-full rounded-full ${d.temp > 60 ? "bg-red-500" : d.temp > 45 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${(d.temp / 80) * 100}%` }} /></div></div>
                  <div><div className="flex justify-between text-xs mb-1"><span className="text-gray-500">FPS</span><span>{d.fps}</span></div><div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(d.fps / 30) * 100}%` }} /></div></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
