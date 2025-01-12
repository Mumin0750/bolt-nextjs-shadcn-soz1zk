import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-4">Could not find requested resource</p>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}