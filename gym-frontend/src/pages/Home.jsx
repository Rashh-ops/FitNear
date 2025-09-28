import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/gyms?lat=${lat}&lng=${lng}`);
          setGyms(res.data);
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">Loading nearby gyms...</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-6 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">Find Your Perfect Fitness Spot</h1>
          <p className="text-gray-500 mt-1">Your journey to fitness starts here — find the best places near you.</p>
        </div>
      </header>

      {/* Gym Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{gym.name}</h2>
              <p className="text-gray-600 mt-1">Fees: ₹{gym.fees}</p>
              <p className="text-gray-600">Timings: {gym.timings}</p>
              <p className="text-gray-500 mt-1">
                Distance: {(gym.distance / 1000).toFixed(2)} km away
              </p>

               {/* ✅ Activities Display */}
              {gym.activities && gym.activities.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-700 font-medium">Activities:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {gym.activities.map((act, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={`/gym/${gym._id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default App;
