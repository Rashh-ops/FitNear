import { useEffect, useState } from "react";
import axios from "axios";
import { FaRunning } from "react-icons/fa";

function App() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/gyms?lat=${lat}&lng=${lng}`
          );
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-mac">
        <FaRunning className="text-4xl text-gray-700 animate-bounce mb-4" />
        <h2 className="text-lg font-medium text-gray-700 animate-pulse">
           Loading your fitness options…
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-mac">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 border-b border-gray-200 py-6 mb-10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 font-mac">
            Find Your Perfect Fitness Spot
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base font-mac">
            Your journey to fitness starts here — discover the best gyms near
            you.
          </p>
        </div>
      </header>

      {/* Gym Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 font-mac"
          >
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900 font-mac">
                {gym.name}
              </h2>
              <p className="text-gray-600 mt-1 font-mac">Fees: ₹{gym.fees}</p>
              <p className="text-gray-600 font-mac">Timings: {gym.timings}</p>
              <p className="text-gray-500 mt-1 text-sm font-mac">
                Distance: {(gym.distance / 1000).toFixed(2)} km away
              </p>

              {/* Activities Display */}
              {gym.activities && gym.activities.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-700 font-medium text-sm font-mac">
                    Activities:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {gym.activities.map((act, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200 font-mac"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={`/gym/${gym._id}`}
                className="inline-block mt-5 px-4 py-2 rounded-xl text-sm font-medium bg-black text-white hover:bg-gray-800 transition-all shadow-sm font-mac"
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
