import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

export default function GymDetails() {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false); // ✅ toggle for comments
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Fetch gym details + comments
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGym(data);
        if (data.memberships && data.memberships.length > 0) {
          setSelectedPlan(data.memberships[0]); // default to first membership
        }
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}/comments`)
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data)) {
      setComments(data);
    } else if (data && data.comments && Array.isArray(data.comments)) {
      setComments(data.comments);
    } else {
      setComments([]);
    }
  });

  }, [id]);

  // Handle posting a comment
  // Handle posting a comment
const postComment = async () => {
  if (!newComment.trim()) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "Anonymous", text: newComment }),
    });

    const savedComment = await res.json();

    // ✅ append the real saved comment
    setComments((prev) => [...prev, savedComment]);

    setNewComment("");
  } catch (err) {
    console.error("Failed to post comment:", err);
  }
};



  if (!gym) return <p>Loading...</p>;

  // ✅ calculate price with discount if logged in
  const finalPrice =
    selectedPlan && isLoggedIn
      ? (selectedPlan.price * 0.9).toFixed(2)
      : selectedPlan?.price;

  // ✅ show either 4 comments or all
  const visibleComments = showAllComments ? comments : comments.slice(0, 4);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Gym Info */}
      <h1 className="text-3xl font-bold">{gym.name}</h1>
      <p className="text-gray-600">Timings: {gym.timings}</p>

      {/* Contact Info */}
      <div className="mt-6 bg-white border rounded-lg shadow-md p-4">
  {gym.contact && (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact Info</h2>

      {/* Phone + Email */}
      <div className="space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span className="font-medium">{gym.contact.phone}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-lg">📧</span>
          <span className="font-medium">{gym.contact.email}</span>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 mt-4">
        {gym.contact.social?.facebook && (
          <a
            href={gym.contact.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            🌐 Facebook
          </a>
        )}
        {gym.contact.social?.instagram && (
          <a
            href={gym.contact.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition"
          >
            📷 Instagram
          </a>
        )}
        {gym.contact.social?.twitter && (
          <a
            href={gym.contact.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition"
          >
            🐦 Twitter
          </a>
        )}
      </div>
    </>
  )}
</div>



      {/* Gym Photos */}
      {gym.photos && gym.photos.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gym.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Gym photo ${idx + 1}`}
              className="w-full h-48 object-cover rounded shadow hover:scale-105 transition-transform"
            />
          ))}
        </div>
      )}

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

      {/* Google Maps Navigation */}
      {gym.location && (
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${gym.location.lat},${gym.location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            🚗 Navigate with Google Maps
          </a>
        </div>
      )}

      {/* Membership selector */}
      {gym.memberships?.length > 0 && (
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Choose Membership:</label>
          <select
            value={selectedPlan?.type}
            onChange={(e) =>
              setSelectedPlan(
                gym.memberships.find((m) => m.type === e.target.value)
              )
            }
            className="border rounded px-3 py-2 w-full"
          >
            {gym.memberships.map((m) => (
              <option key={m.type} value={m.type}>
                {m.type} – ₹{m.price}
              </option>
            ))}
          </select>
        </div>
      )}

      

      {/* ✅ Pay Now button visible only if logged in */}
      {isLoggedIn && selectedPlan ? (
        <div className="mt-4">
          <Elements stripe={stripePromise}>
            <CheckoutForm fees={finalPrice} />
          </Elements>
          <p className="text-sm text-green-600 mt-2">
            10% discount applied! (Original: ₹{selectedPlan.price})
          </p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-red-500">
          Please{" "}
          <Link to="/login">
            <strong>login</strong>
          </Link>{" "}
          to pay and get a discount.
        </p>
      )}

      {/* Trainers Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Trainers</h2>
        <ul className="mt-2 space-y-2">
          {(gym.trainers || []).map((t, idx) => (
            <li key={idx} className="border p-2 rounded">
              <p className="font-bold">{t.name}</p>
              <p>{t.bio}</p>
              <p className="text-sm text-gray-500">
                Experience: {t.experience} years
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Equipment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Equipments</h2>
        <ul className="mt-2 space-y-2">
          {(gym.equipment || []).map((e, idx) => (
            <li key={idx} className="border p-2 rounded">
              <p className="font-bold">{e.name}</p>
              <p>{e.description}</p>
              <p className="text-sm text-gray-500">
                Max Weight: {e.maxWeight} kg
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>

        <div className="space-y-2 mt-2">
          {visibleComments.map((c, i) => (
            <div key={i} className="border p-2 rounded">
              <p className="font-bold">{c.user}</p>
              <p>{c.text}</p>
              <span className="text-xs text-gray-400">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Toggle Button */}
        {comments.length > 4 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="mt-3 text-blue-600 underline"
          >
            {showAllComments ? "Show less" : "Read more comments"}
          </button>
        )}

        {/* Add new comment */}
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={postComment}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
