"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleTickets } from "@/types"; // ✅ Artık `types/index.ts` içinden verileri çekiyoruz

export default function ViewTickets() {
    console.log("ViewTickets bileşeni yüklendi!"); // ✅ Bileşenin yüklendiğini

  return (
    <div className="w-full max-w-screen-xl bg-white shadow-md rounded-lg p-8 mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4">Your Support Tickets</h2>

      {/* Ticket Listesi */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Ticket ID</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Assignee</th>
            <th className="border p-2">Create Date</th>
            <th className="border p-2">Update Date</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleTickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="border p-2">
                <Link href={`/customer/dashboard/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
                  {ticket.id}
                </Link>
              </td>
              <td className="border p-2">{ticket.subject}</td>
              <td className="border p-2">{ticket.assignee}</td>
              <td className="border p-2">{ticket.createDate}</td>
              <td className="border p-2">{ticket.updateDate}</td>
              <td className={`border p-2 ${ticket.priority === "Urgent" ? "text-red-600" : "text-black"}`}>{ticket.priority}</td>
              <td className="border p-2">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
