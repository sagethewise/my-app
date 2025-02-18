"use client";

export default function ReportsPage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-8 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reports</h2>
      <p className="text-gray-600 text-center">
        This section will display reports and analytics. Future updates will include charts, tables, and dynamic data.
      </p>

      {/* Örnek bir tablo */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Reports</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Report Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Closed Tickets</td>
              <td className="border p-2">March 2024</td>
              <td className="border p-2 text-green-600">Completed</td>
            </tr>
            <tr>
              <td className="border p-2">Open Tickets</td>
              <td className="border p-2">April 2024</td>
              <td className="border p-2 text-red-600">Pending</td>
            </tr>
            <tr>
              <td className="border p-2">Ongoing Tickets</td>
              <td className="border p-2">May 2024</td>
              <td className="border p-2 text-orange-400">In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
