function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-green-500 mb-4">
        404
      </h1>
      <p className="text-gray-400 mb-6">
        Page not found
      </p>

      <a
        href="/"
        className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;