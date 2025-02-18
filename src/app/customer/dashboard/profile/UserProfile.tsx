import { UserProfileProps } from "@/types";

export default function UserProfile({ user }: { user: UserProfileProps }) {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-8 flex flex-col items-center">
      {/* Profil Fotoğrafı ve Kullanıcı Bilgileri */}
      <img 
        src={user.profilePicture} 
        alt="Profile" 
        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
      />
      <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
      <p className="text-gray-500">{user.title}</p>

      <div className="mt-6 w-full flex flex-wrap justify-center gap-6">
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>E-Mail:</strong> {user.email}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Position:</strong> {user.position}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Contact Number:</strong> {user.phone}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Country:</strong> {user.country}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>City:</strong> {user.city}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Address:</strong> {user.address}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Since:</strong> {user.since}</p>
        <p className="bg-gray-100 p-3 rounded-lg w-64 text-center"><strong>Passive Date:</strong> {user.passiveDate}</p>
        <p className={`bg-gray-100 p-2 rounded-lg ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
          <strong>Status:</strong> {user.status}
        </p>
      </div>
    </div>
  );
}
