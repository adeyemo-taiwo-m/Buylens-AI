"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

export default function AppSettingsPage() {
  const { toast } = useToast();
  const [name, setName] = useState("Buyer");
  const [email, setEmail] = useState("buyer@buylens.ai");
  const [currency, setCurrency] = useState("NGN");
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Settings saved successfully", "success");
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear your local purchase analysis history?")) {
      localStorage.removeItem("buylens_reports");
      toast("Local history cleared", "info");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-b border-[#E4E7EC] pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Manage your account profile, currency preferences, and local data.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Account Section */}
        <Card variant="default" padding="lg" className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
            Account
          </h2>
          <div className="space-y-3">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Card>

        {/* Preferences Section */}
        <Card variant="default" padding="lg" className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
            Preferences
          </h2>
          <div className="space-y-3">
            <Select
              label="Default Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={[
                { value: "NGN", label: "Nigerian Naira (₦ NGN)" },
                { value: "USD", label: "US Dollar ($ USD)" },
                { value: "GBP", label: "British Pound (£ GBP)" },
              ]}
            />

            <div className="pt-2 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#101828]">Price & Market Alerts</p>
                <p className="text-[11px] text-[#667085]">
                  Receive notifications when monitored product models drop in price
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-4 w-4 rounded border-[#E4E7EC] text-[#0B1220] focus:ring-[#0B1220]"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Changes
          </Button>
        </div>
      </form>

      {/* Data Management Section */}
      <Card variant="default" padding="lg" className="space-y-4 border-[#FECDCA] bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#B42318]">
          Data & Privacy
        </h2>
        <p className="text-xs text-[#667085]">
          Clear all locally cached analysis reports and checklists stored in this browser session.
        </p>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={handleClearData}
        >
          Clear Local Decision History
        </Button>
      </Card>
    </div>
  );
}
