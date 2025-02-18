import { CompanyProfileProps } from "@/types";

export default function CompanyProfile({ company }: { company: CompanyProfileProps }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white shadow-md rounded-lg p-10 flex flex-col items-center">
      {/* Şirket Logosu ve Bilgileri */}
      <img 
        src={company.logo} 
        alt="Company Logo" 
        className="w-36 h-36 rounded-full border-4 border-green-500 shadow-lg"
      />
      <h2 className="text-3xl font-semibold mt-4">{company.companyName}</h2>
      <p className="text-gray-500 text-lg">{company.sector}</p>

      <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <p className="bg-gray-100 p-4 rounded-lg text-center"><strong>Website:</strong> {company.website}</p>
        <p className="bg-gray-100 p-4 rounded-lg text-center"><strong>Country:</strong> {company.country}</p>
        <p className="bg-gray-100 p-4 rounded-lg text-center"><strong>City:</strong> {company.city}</p>
        <p className="bg-gray-100 p-4 rounded-lg text-center"><strong>Address:</strong> {company.address}</p>
        <p className="bg-gray-100 p-4 rounded-lg text-center"><strong>Since:</strong> {company.since}</p>
        <p className={`bg-gray-100 p-4 rounded-lg text-center ${company.status === "Active" ? "text-green-600" : "text-red-600"}`}>
          <strong>Status:</strong> {company.status}
        </p>
      </div>
    </div>
  );
}
