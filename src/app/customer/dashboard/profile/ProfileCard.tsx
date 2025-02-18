interface ProfileCardProps {
    name: string;
    email: string;
    phone: string;
  }
  
  export default function ProfileCard({ name, email, phone }: ProfileCardProps) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">📧 {email}</p>
        <p className="text-gray-600">📞 {phone}</p>
      </div>
    );
  }
  