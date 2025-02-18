"use client";

import { useEffect, useState } from "react";
import { supportTypes, priorities, defaultNewTicket } from "@/types";

export default function NewTicket() {
  const [formData, setFormData] = useState(defaultNewTicket);
  const [loading, setLoading] = useState(false);

   // Kullanıcı e-postasını API'den çek
   useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          credentials: "include", // ✅ Çerezleri API'ye dahil et
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log("📌 Kullanıcı email bilgisi API'den alındı:", data);

        if (response.ok) {
          setFormData(prev => ({ ...prev, from: data.email }));
        } else {
          console.error("❌ Kullanıcı email bilgisi alınamadı:", data.error);
        }
      } catch (error) {
        console.error("❌ API Hatası:", error);
      }
    };

    fetchUserEmail();
}, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.supportType || !formData.description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, FILEPATH: formData.file }) // ✅ "file" yerine "file_path" kullanıldı
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Ticket Created Successfully! Ticket ID: ${data.ticketId}`);
        setFormData(defaultNewTicket); // Formu sıfırla
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error submitting ticket:", error);
      alert("An error occurred while submitting the ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Ticket</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Üst Container */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <label className="block text-gray-600">From (Your Email)</label>
          <input type="email" name="from" value={formData.from} disabled className="border p-2 w-full rounded-lg bg-gray-200" />

          <label className="block text-gray-600 mt-2">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="border p-2 w-full rounded-lg" required />

          <label className="block text-gray-600 mt-2">Support Type</label>
          <select name="supportType" value={formData.supportType} onChange={handleChange} className="border p-2 w-full rounded-lg" required>
            <option value="">Select Support Type</option>
            {supportTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <label className="block text-gray-600 mt-2">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="border p-2 w-full rounded-lg">
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>

        {/* Alt Container */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <label className="block text-gray-600">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded-lg" rows={4} required></textarea>

          <div className="flex items-center mt-2">
            <input type="checkbox" name="sendCopy" checked={formData.sendCopy} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">Send a copy to my email</label>
          </div>
        </div>

        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" disabled={loading}>
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
