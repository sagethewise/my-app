interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function InputField({ label, type, value, onChange }: InputFieldProps) {
    return (
      <div>
        <label className="block text-gray-600">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    );
  }
  