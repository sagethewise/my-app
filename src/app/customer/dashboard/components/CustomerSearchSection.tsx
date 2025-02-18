"use client";

import { useEffect } from "react";

const CustomerSearchSection = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  useEffect(() => {
    console.log("CustomerSearchSection bileşeni yüklendi! ✅");
  }, []);

  return (
    <section className="w-full max-w-screen-xxxl mx-auto bg-gray-50 shadow-md rounded-lg py-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">What can we help you with?</h2>
      <div className="w-full flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-3 border rounded-lg"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* Register ve News Butonları */}
      <div className="flex justify-center space-x-8">
      <button 
  onClick={() => setActiveSection("new-ticket")} 
  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
>
  New Ticket
</button>

        {/* ✅ View Tickets Butonu, `setActiveSection` Kullanarak İçeriği Güncelliyor */}
        <button 
          onClick={() => {
            console.log("View Tickets butonuna basıldı!"); // ✅ Tıklama algılandı mı?
            setActiveSection("view-tickets");
          }} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          View Tickets
        </button>
      </div>
    </section>
  );
};

export default CustomerSearchSection;
