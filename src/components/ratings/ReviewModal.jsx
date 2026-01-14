import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { submitRating } from "../../api/ratings";

const ReviewModal = ({ booking, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitRating({
        matatu_id: booking.matatu.id,
        score: rating,
        comment: comment,
      });
      // Call onSuccess to trigger parent updates (e.g. refreshing list, showing success toast)
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="font-bold text-white text-lg">Rate Your Ride</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-sm text-text-muted mb-4">
              How was your trip with <span className="text-white font-bold">{booking.matatu?.plate}</span>?
            </p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={32}
                    className={`${star <= (hoverRating || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-white/20"
                      } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2 h-4">
              {rating > 0 && (
                rating === 1 ? "Terrible 😠" :
                  rating === 2 ? "Bad 😞" :
                    rating === 3 ? "Okay 😐" :
                      rating === 4 ? "Good 🙂" : "Excellent 🤩"
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-bold text-text-muted mb-2">
                Leave a comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="The driver was..."
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none h-24"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
