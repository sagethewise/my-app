"use client";

import { useState } from "react";

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    theme: "light",
    notifications: {
      email: false,
      push: false,
      system: false,
    },
    kvkk: false, // ✅ KVKK izni için checkbox
    regulatory: false, // ✅ Mevzuat belgeleri onayı için checkbox
    language: "en",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement; // ✅ `e.target`'ı `HTMLInputElement` olarak tanımladık
    const { name, value, type } = target;
    const isChecked = type === "checkbox" ? target.checked : value; // ✅ Checkbox kontrolü eklendi
  
    setPreferences((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Preferences saved:", preferences);
    alert("Preferences saved!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-8 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Preferences</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Tema Seçimi */}
        <div>
          <label className="block text-gray-600">Theme</label>
          <select name="theme" value={preferences.theme} onChange={handleChange} className="border p-3 w-full rounded-lg">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Bildirim Seçenekleri */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
          <div className="flex items-center mb-2">
            <input type="checkbox" name="notifications.email" checked={preferences.notifications.email} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">Enable Email Notifications</label>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" name="notifications.push" checked={preferences.notifications.push} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">Enable Push Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="notifications.system" checked={preferences.notifications.system} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">Enable System Notifications</label>
          </div>
        </div>

        {/* KVKK ve Mevzuat İzinleri */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Legal Agreements</h3>
          <div className="flex items-center mb-2">
            <input type="checkbox" name="kvkk" checked={preferences.kvkk} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">I agree to the KVKK (Personal Data Protection) policies</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="regulatory" checked={preferences.regulatory} onChange={handleChange} className="mr-2" />
            <label className="text-gray-600">I accept the regulatory terms and conditions</label>
          </div>
        </div>

        {/* Dil Seçimi */}
        <div>
          <label className="block text-gray-600">Language</label>
          <select name="language" value={preferences.language} onChange={handleChange} className="border p-3 w-full rounded-lg">
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
          Save Preferences
        </button>
      </form>
    </div>
  );
}
