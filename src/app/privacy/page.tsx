"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const complianceChecks = [
  { regulation: "GDPR (EU)", status: "compliant", checks: 12, passed: 12, details: "All data processed on-device, no PII stored, auto-deletion enabled" },
  { regulation: "CCPA (California)", status: "compliant", checks: 8, passed: 8, details: "No personal data collected, aggregate analytics only, opt-out available" },
  { regulation: "BIPA (Illinois)", status: "compliant", checks: 6, passed: 6, details: "No biometric data stored, face detection only (no recognition), no templates" },
  { regulation: "LGPD (Brazil)", status: "compliant", checks: 10, passed: 10, details: "On-device processing, data minimization, purpose limitation enforced" },
  { regulation: "POPIA (South Africa)", status: "compliant", checks: 7, passed: 7, details: "Lawful processing, minimal data, security safeguards in place" },
];

const privacyFeatures = [
  { feature: "On-Device Processing", description: "All AI inference runs locally. No images or video leave the device.", enabled: true, critical: true },
  { feature: "Face Detection (Not Recognition)", description: "Detects presence of people for counting. Cannot identify individuals.", enabled: true, critical: true },
  { feature: "Automatic Data Purge", description: "Raw sensor data deleted within 100ms after processing. Only aggregate stats retained.", enabled: true, critical: true },
  { feature: "Anonymized Analytics", description: "Demographics are estimated in aggregate. No individual tracking.", enabled: true, critical: false },
  { feature: "Encrypted Telemetry", description: "Device health data encrypted with AES-256 before transmission.", enabled: true, critical: false },
  { feature: "Opt-Out Signage", description: "Clear signage at store entrances about AI monitoring.", enabled: true, critical: true },
  { feature: "Audit Logging", description: "All data access and processing logged for compliance audits.", enabled: true, critical: false },
  { feature: "Data Retention Policy", description: "Aggregate analytics retained for 90 days, then auto-deleted.", enabled: true, critical: false },
];

const auditLog = [
  { timestamp: "2026-03-17 14:30:00", action: "Privacy scan completed", result: "All 43 checks passed", user: "System" },
  { timestamp: "2026-03-17 12:00:00", action: "Data retention cleanup", result: "Purged 847 records older than 90 days", user: "System" },
  { timestamp: "2026-03-16 16:45:00", action: "Compliance report generated", result: "Q1 2026 report for GDPR audit", user: "admin@retailedge.io" },
  { timestamp: "2026-03-16 10:00:00", action: "Privacy policy update", result: "Updated to reflect new signage locations", user: "admin@retailedge.io" },
  { timestamp: "2026-03-15 09:00:00", action: "New device provisioned", result: "DEV-008 configured with privacy defaults", user: "admin@retailedge.io" },
];

export default function PrivacyPage() {
  const [showAudit, setShowAudit] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Compliance</h1>
          <p className="text-gray-500 mt-1">Privacy-first retail AI with full regulatory compliance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Compliance Status</p><p className="text-3xl font-bold text-green-600 mt-1">100%</p><p className="text-xs text-gray-400">All regulations</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Regulations Tracked</p><p className="text-3xl font-bold text-cyan-600 mt-1">{complianceChecks.length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Privacy Features</p><p className="text-3xl font-bold text-blue-600 mt-1">{privacyFeatures.length}</p><p className="text-xs text-gray-400">All enabled</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Data Incidents</p><p className="text-3xl font-bold text-green-600 mt-1">0</p><p className="text-xs text-gray-400">Lifetime</p></div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Compliance</h2>
          <div className="space-y-3">
            {complianceChecks.map((c) => (
              <div key={c.regulation} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">{c.passed}/{c.checks}</div>
                  <div><p className="font-medium text-gray-900">{c.regulation}</p><p className="text-xs text-gray-500">{c.details}</p></div>
                </div>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {privacyFeatures.map((f) => (
              <div key={f.feature} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${f.enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-400"}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{f.feature} {f.critical && <span className="text-xs text-red-500">*</span>}</p>
                  <p className="text-xs text-gray-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Critical privacy feature - cannot be disabled</p>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Log</h2>
            <button onClick={() => setShowAudit(!showAudit)} className="text-sm text-cyan-600">{showAudit ? "Hide" : "Show"}</button>
          </div>
          {showAudit && (
            <div className="space-y-2">
              {auditLog.map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                  <div><p className="text-gray-900">{log.action}</p><p className="text-xs text-gray-500">{log.result}</p></div>
                  <div className="text-right"><p className="text-xs text-gray-500">{log.timestamp}</p><p className="text-xs text-gray-400">{log.user}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
