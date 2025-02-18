interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md my-2">
        {message}
      </div>
    );
  }
  