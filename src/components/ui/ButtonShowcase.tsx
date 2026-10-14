"use client";

import React, { useState } from "react";
import { Button, ButtonType, ButtonSize, ButtonState } from "./Button";
import { Card } from "./Card";

export function ButtonShowcase() {
  // Playground interactive controls matching Figma properties
  const [selectedType, setSelectedType] = useState<ButtonType>("Primary");
  const [selectedSize, setSelectedSize] = useState<ButtonSize>("Large");
  const [selectedState, setSelectedState] = useState<ButtonState>("Default");
  const [labelContent, setLabelContent] = useState("Button Label");
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [leftIconType, setLeftIconType] = useState<string>("heart");
  const [showRightIcon, setShowRightIcon] = useState(false);
  const [rightIconType, setRightIconType] = useState<string>("arrow-right");

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="border-b border-[#E4E7EC] pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101828]">Button</h1>
        <p className="text-sm text-[#667085] mt-1">
          Design system button component variants, sizes, states, and icon configurations.
        </p>
      </div>

      {/* Figma Canvas Matrix Reproduction */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#101828]">Buttons (Figma Canvas Matrix)</h2>
          <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
            Main Button: Primary-600 (#2563eb)
          </span>
        </div>

        {/* Dashed frame matching Figma purple container */}
        <div className="rounded-[18px] border-2 border-dashed border-[#C084FC]/60 bg-white p-6 sm:p-8 overflow-x-auto">
          <div className="min-w-[840px] space-y-6">
            {/* Row 1: Default State */}
            <div className="flex items-center gap-4 flex-nowrap">
              {/* Secondary (Dark) Large & Small */}
              <Button buttonType="Secondary" size="Large" labelContent="Button Label" />
              <Button buttonType="Secondary" size="Small" labelContent="Button Label" />

              {/* Cancel/Delete Large & Small */}
              <Button buttonType="Cancel/Delete" size="Large" labelContent="Button Label" />
              <Button buttonType="Cancel/Delete" size="Small" labelContent="Button Label" />

              {/* Secondary-new (Soft Blue) Large & Small */}
              <Button buttonType="Secondary-new" size="Large" labelContent="Button Label" />
              <Button buttonType="Secondary-new" size="Small" labelContent="Button Label" />

              {/* Primary (600 Blue) Large & Small */}
              <Button buttonType="Primary" size="Large" labelContent="Button Label" />
              <Button buttonType="Primary" size="Small" labelContent="Button Label" />

              {/* Tertiary */}
              <Button buttonType="Tertiary" size="Small" labelContent="Button Label" />
            </div>

            {/* Row 2: Active State */}
            <div className="flex items-center gap-4 flex-nowrap">
              {/* Secondary (Dark) Active */}
              <Button buttonType="Secondary" size="Large" buttonState="Active" labelContent="Button Label" />
              <Button buttonType="Secondary" size="Small" buttonState="Active" labelContent="Button Label" />

              {/* Cancel/Delete Active */}
              <Button buttonType="Cancel/Delete" size="Large" buttonState="Active" labelContent="Button Label" />
              <Button buttonType="Cancel/Delete" size="Small" buttonState="Active" labelContent="Button Label" />

              {/* Secondary-new Active */}
              <Button buttonType="Secondary-new" size="Large" buttonState="Active" labelContent="Button Label" />
              <Button buttonType="Secondary-new" size="Small" buttonState="Active" labelContent="Button Label" />

              {/* Primary Active */}
              <Button buttonType="Primary" size="Large" buttonState="Active" labelContent="Button Label" />
              <Button buttonType="Primary" size="Small" buttonState="Active" labelContent="Button Label" />

              {/* Tertiary Active */}
              <Button buttonType="Tertiary" size="Small" buttonState="Active" labelContent="Button Label" />
            </div>

            {/* Row 3: Inactive / Disabled State */}
            <div className="flex items-center gap-4 flex-nowrap">
              <Button buttonType="Secondary" size="Large" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Secondary" size="Small" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Cancel/Delete" size="Large" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Cancel/Delete" size="Small" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Secondary-new" size="Large" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Secondary-new" size="Small" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Primary" size="Large" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Primary" size="Small" buttonState="inactive" labelContent="Button Label" />
              <Button buttonType="Tertiary" size="Small" buttonState="inactive" labelContent="Button Label" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Figma Component Property Inspector & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Component Property Controls (Figma Inspector reproduction) */}
        <div className="lg:col-span-5 bg-[#1E1E1E] text-white rounded-2xl p-6 shadow-md space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] pb-2 border-b border-[#2E2E2E]">
            Component Properties
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#D4D4D8]">◇ Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ButtonType)}
              className="w-full bg-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 border border-[#3E3E3E] focus:outline-none focus:border-[#2563EB]"
            >
              <option value="Primary">Primary (600 Blue)</option>
              <option value="Secondary">Secondary (Dark)</option>
              <option value="Tertiary">Tertiary (Text link)</option>
              <option value="Cancel/Delete">Cancel/Delete (Light Red)</option>
              <option value="Secondary-new">Secondary-new (Light Blue)</option>
            </select>
          </div>

          {/* Size */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#D4D4D8]">◇ Size</label>
            <div className="grid grid-cols-2 gap-2">
              {(["Large", "Small"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`text-xs py-1.5 px-3 rounded-lg border font-medium transition-colors ${
                    selectedSize === s
                      ? "bg-[#2563EB] border-[#2563EB] text-white"
                      : "bg-[#2A2A2A] border-[#3E3E3E] text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#D4D4D8]">◇ State</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Default", "Active", "inactive"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`text-xs py-1.5 px-2 rounded-lg border font-medium capitalize transition-colors ${
                    selectedState === st
                      ? "bg-[#2563EB] border-[#2563EB] text-white"
                      : "bg-[#2A2A2A] border-[#3E3E3E] text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Label Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#D4D4D8]">T Label Content</label>
            <input
              type="text"
              value={labelContent}
              onChange={(e) => setLabelContent(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 border border-[#3E3E3E] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Show Left Icon */}
          <div className="pt-2 border-t border-[#2E2E2E] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#D4D4D8]">Show Left Icon</span>
            <input
              type="checkbox"
              checked={showLeftIcon}
              onChange={(e) => setShowLeftIcon(e.target.checked)}
              className="h-4 w-4 rounded bg-[#2A2A2A] border-[#3E3E3E] text-[#2563EB] focus:ring-0"
            />
          </div>

          {showLeftIcon && (
            <div className="space-y-1.5 pl-3 border-l-2 border-[#2563EB]">
              <label className="text-xs font-medium text-[#A1A1AA]">Left Icon Type</label>
              <select
                value={leftIconType}
                onChange={(e) => setLeftIconType(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-xs rounded-lg px-3 py-1.5 border border-[#3E3E3E]"
              >
                <option value="heart">heart</option>
                <option value="arrow-right">arrow-right</option>
              </select>
            </div>
          )}

          {/* Show Right Icon */}
          <div className="pt-2 border-t border-[#2E2E2E] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#D4D4D8]">Show Right Icon</span>
            <input
              type="checkbox"
              checked={showRightIcon}
              onChange={(e) => setShowRightIcon(e.target.checked)}
              className="h-4 w-4 rounded bg-[#2A2A2A] border-[#3E3E3E] text-[#2563EB] focus:ring-0"
            />
          </div>

          {showRightIcon && (
            <div className="space-y-1.5 pl-3 border-l-2 border-[#2563EB]">
              <label className="text-xs font-medium text-[#A1A1AA]">Right Icon Type</label>
              <select
                value={rightIconType}
                onChange={(e) => setRightIconType(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-xs rounded-lg px-3 py-1.5 border border-[#3E3E3E]"
              >
                <option value="arrow-right">arrow-right</option>
                <option value="heart">heart</option>
              </select>
            </div>
          )}
        </div>

        {/* Right: Live Interactive Render */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <Card variant="default" padding="lg" className="h-full flex flex-col justify-between space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
                Live Interactive Instance
              </div>
              <p className="text-sm text-[#475467]">
                Rendered with configured properties: <strong>{selectedType}</strong> /{" "}
                <strong>{selectedSize}</strong> / <strong>{selectedState}</strong>
              </p>
            </div>

            <div className="py-12 flex items-center justify-center bg-[#F7F8F5] rounded-xl border border-dashed border-[#D0D5DD]">
              <Button
                buttonType={selectedType}
                size={selectedSize}
                buttonState={selectedState}
                labelContent={labelContent}
                showLeftIcon={showLeftIcon}
                leftIconType={leftIconType}
                showRightIcon={showRightIcon}
                rightIconType={rightIconType}
              />
            </div>

            <div className="p-4 rounded-xl bg-[#F2F4F0] text-xs font-mono text-[#334155] overflow-x-auto">
              <code>
                {`<Button`}
                <br />
                {`  buttonType="${selectedType}"`}
                <br />
                {`  size="${selectedSize}"`}
                <br />
                {selectedState !== "Default" ? `  buttonState="${selectedState}"\n` : ""}
                {showLeftIcon ? `  showLeftIcon leftIconType="${leftIconType}"\n` : ""}
                {showRightIcon ? `  showRightIcon rightIconType="${rightIconType}"\n` : ""}
                {`  labelContent="${labelContent}"`}
                <br />
                {`/>`}
              </code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
