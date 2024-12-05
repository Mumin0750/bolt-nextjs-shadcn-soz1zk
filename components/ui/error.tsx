interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{message}</p>
      </div>
    </div>
  );
}