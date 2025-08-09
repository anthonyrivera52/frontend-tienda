export const Skeleton = () => (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold text-teal-800 mb-4 animate-pulse bg-gray-300 h-6 w-24 rounded"></h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col items-center text-center animate-pulse"
            >
              <div className="text-2xl mb-2 bg-gray-300 h-8 w-8 rounded-full"></div>
              <h3 className="text-gray-600 text-sm font-medium bg-gray-300 h-4 w-16 mb-2 rounded"></h3>
              <p className="text-2xl font-bold text-gray-900 bg-gray-300 h-6 w-12 rounded"></p>
              <div className="w-16 h-1 mt-2 rounded-full bg-gray-300"></div>
            </div>
          ))}
      </div>
    </div>
);