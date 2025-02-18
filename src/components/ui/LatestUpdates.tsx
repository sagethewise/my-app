"use client"; // Bu satırı en üste ekle!

import { useEffect, useState } from "react";
import { fetchLatestUpdates } from "../../utils/fetchLatestUpdates";
import { Update } from "../../types";

export default function LatestUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUpdates() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLatestUpdates();
        setUpdates(data);
      } catch (err) {
        setError("Güncellemeler yüklenirken hata oluştu!");
      } finally {
        setLoading(false);
      }
    }
    loadUpdates();
  }, []);

  return (
    <div className="w-full bg-white  rounded-lg p-6 flex flex-col items-left">
      <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Yükleniyor...</p>}
      {updates.length === 0 && !loading ? (
        <p className="text-gray-600">Henüz bir güncelleme yok.</p>
      ) : (
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="bg-gray-50 p-6 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold">{update.title}</h3>
              <p className="text-gray-600 mt-2">{update.content}</p>
              <p className="text-gray-400 text-sm mt-4">Posted on {update.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
