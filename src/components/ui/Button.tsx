interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({ text, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
    >
      {text}
    </button>
  );
}
