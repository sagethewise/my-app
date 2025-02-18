"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { sampleTickets } from "@/types"; // ✅ Örnek verileri içe aktardık.

export default function TicketDetail() {
  const router = useRouter();
  const { ticketId } = router.query;

  // Seçili ticket'ı bul
  const ticket = sampleTickets.find((t) => t.id === ticketId);

  // Eğer ticket bulunamazsa hata mesajı göster
  if (!ticket) {
    return <p className="text-center text-red-600">Ticket not found!</p>;
  }

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Ticket Details - {ticket.id}</h2>

      <div className="mb-4">
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Assignee:</strong> {ticket.assignee}</p>
        <p><strong>Create Date:</strong> {ticket.createDate}</p>
        <p><strong>Update Date:</strong> {ticket.updateDate}</p>
        <p><strong>Support Type:</strong> {ticket.supportType}</p>
        <p><strong>Work Hour:</strong> {ticket.workHour}h</p>
        <p><strong>Billing Hour:</strong> {ticket.billingHour}h</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
      </div>

      {/* Mesaj Gönderme Alanı */}
      <div className="mt-4">
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded-lg"
          placeholder="Type your message here..."
        ></textarea>
        <button onClick={sendMessage} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send Message
        </button>
      </div>
    </div>
  );
}
