"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm"; // ✅ RegisterForm bileşeni eklendi

export default function SearchSection() {
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => {
    const confirmClose = window.confirm("Sayfadan ayrılıyorsunuz, kaydedilmemiş bilgileriniz silinebilir. Devam etmek istiyor musunuz?");
    if (confirmClose) {
      setShowRegister(false);
    }
  };

    return (

      <section className="bg-gray-50 py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">What can we help you with?</h2>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-2/3 p-3 border rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg ml-2">
            Search
          </button>
        </div>
                    {/* Register ve News Butonları */}
                    <div className="flex justify-center space-x-8">
                      <div>
                      <button 
        onClick={() => setShowRegister(true)} 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Register
      </button>
 {/* Modal */}
 {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          {/* Modal Kapsayıcı (Sağdan Açılan) */}
          <div 
            className="bg-white w-full max-w-md h-full shadow-lg transform transition-transform translate-x-0 overflow-y-auto p-6" 
            onClick={(e) => e.stopPropagation()} // Modal içindeyken kapanmayı engelle
          >
            {/* Kapatma Butonu */}
            <button 
              onClick={handleClose} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✖
            </button>
            <RegisterForm onClose={handleClose} />
          </div>
        </div>
      )}
                      </div>

                      <button className="bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200">
                        News
                      </button>
                    </div>
      </section>
    );
  }
  