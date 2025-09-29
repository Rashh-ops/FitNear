import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaRunning,
} from "react-icons/fa";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

export default function GymDetails() {
  const { id } = useParams();
  const location = useLocation(); // ✅ inside component
  const [gym, setGym] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Fetch gym details and comments
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGym(data);
        if (data.memberships && data.memberships.length > 0) {
          setSelectedPlan(data.memberships[0]);
        }
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setComments(data);
        else if (data?.comments) setComments(data.comments);
      });
  }, [id]);

  // Post comment
  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/gyms/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: "Anonymous", text: newComment }),
        }
      );
      const savedComment = await res.json();
      setComments((prev) => [...prev, savedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  if (!gym)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-mac">
        <FaRunning className="text-5xl text-gray-700 animate-bounce mb-4" />
        <h2 className="text-lg font-medium text-gray-700 animate-pulse">
          Loading gym details…
        </h2>
      </div>
    );

  const finalPrice =
    selectedPlan && isLoggedIn
      ? (selectedPlan.price * 0.9).toFixed(2)
      : selectedPlan?.price;

  const visibleComments = showAllComments ? comments : comments.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900">{gym.name}</h1>
          <p className="text-gray-600 mt-1">Timings: {gym.timings}</p>
        </div>

        {/* Contact Info */}
        {gym.contact && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Info
            </h2>
            <div className="space-y-2 text-gray-700">
              {gym.contact.phone && (
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-600" /> {gym.contact.phone}
                </p>
              )}
              {gym.contact.email && (
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-600" /> {gym.contact.email}
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              {gym.contact.social?.facebook && (
                <a
                  href={gym.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                >
                  <FaFacebookF /> Facebook
                </a>
              )}
              {gym.contact.social?.instagram && (
                <a
                  href={gym.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition flex items-center gap-1"
                >
                  <FaInstagram /> Instagram
                </a>
              )}
              {gym.contact.social?.twitter && (
                <a
                  href={gym.contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition flex items-center gap-1"
                >
                  <FaTwitter /> Twitter
                </a>
              )}
            </div>
          </div>
        )}

        {/* Photos */}
        {gym.photos?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gym.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Gym photo ${idx + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}

        {/* Activities */}
        {gym.activities?.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {gym.activities.map((act, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Map Navigation */}
        {gym.location && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${gym.location.lat},${gym.location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black text-white px-6 py-3 rounded-xl shadow-lg shadow-gray-200/50 
                      hover:scale-[1.02] active:scale-[0.98] transition-transform text-center font-medium"
          >
            Navigate with Google Maps
          </a>
        )}

        {/* Memberships */}
        {gym.memberships?.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <label className="block mb-2 font-semibold text-gray-900">
              Choose Membership
            </label>
            <select
              value={selectedPlan?.type}
              onChange={(e) =>
                setSelectedPlan(
                  gym.memberships.find((m) => m.type === e.target.value)
                )
              }
              className="border rounded-lg px-3 py-2 w-full bg-white/80"
            >
              {gym.memberships.map((m) => (
                <option key={m.type} value={m.type}>
                  {m.type} – ₹{m.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Payment */}
        {isLoggedIn && selectedPlan ? (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <Elements stripe={stripePromise}>
              <CheckoutForm fees={finalPrice} />
            </Elements>
            <p className="text-sm text-green-600 mt-2">
              10% discount applied! (Original: ₹{selectedPlan.price})
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-sm">
            Please{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
              className="text-red-600"
            >
              login
            </Link>{" "}
            to pay and get a discount.
          </p>
        )}

        {/* Trainers */}
        {gym.trainers?.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold">Trainers</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gym.trainers.map((t, idx) => (
                <li
                  key={idx}
                  className="bg-white/80 border rounded-lg p-3 shadow-sm flex flex-col items-center"
                >
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-24 h-24 rounded-full object-cover mb-2"
                    />
                  )}
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.bio}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Experience: {t.experience} years
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Equipment */}
        {gym.equipment?.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold">Equipment</h2>
            <ul className="mt-3 space-y-3">
              {gym.equipment.map((e, idx) => (
                <li
                  key={idx}
                  className="bg-white/80 border rounded-lg p-3 shadow-sm"
                >
                  <p className="font-bold">{e.name}</p>
                  <p>{e.description}</p>
                  <p className="text-sm text-gray-500">
                    Max Weight: {e.maxWeight} kg
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Comments */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="space-y-3 mt-3">
            {visibleComments.map((c, i) => (
              <div
                key={i}
                className="bg-white/80 border rounded-lg p-3 shadow-sm"
              >
                <p className="font-bold">{c.user}</p>
                <p>{c.text}</p>
                <span className="text-xs text-gray-400">
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </span>
              </div>
            ))}
          </div>
          {comments.length > 4 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              {showAllComments ? "Show less" : "Read more comments"}
            </button>
          )}
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded-lg p-2 bg-white/80"
            />
            <button
              onClick={postComment}
              className="ml-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
