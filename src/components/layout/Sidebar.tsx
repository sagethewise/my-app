"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <aside className="bg-white p-6 shadow-md rounded-lg space-y-8">
      {/* Tabs */}
      <div className="flex justify-between border-b pb-2">
        <button
          onClick={() => setActiveTab("login")}
          className={`text-sm font-bold pb-1 ${
            activeTab === "login"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("subscribe")}
          className={`text-sm font-bold pb-1 ${
            activeTab === "subscribe"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Subscribe
        </button>
      </div>

      {/* Login Form */}
      {activeTab === "login" && (
        <form className="mt-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-2 border rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg mb-4"
          />
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/lost-password" className="text-sm text-blue-500 hover:underline">
              Lost password
            </Link>
          </div>
          <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </form>
      )}

      {/* Subscribe Form */}
      {activeTab === "subscribe" && (
        <form className="mt-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-2 border rounded-lg mb-4"
          />
          <label className="flex items-start mb-4">
            <input type="checkbox" className="mt-1 mr-2" />
            <span className="text-sm text-gray-600">
              I consent for Same Up to process my data and agree to the terms of the{" "}
              <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
    </aside>
  );
}
