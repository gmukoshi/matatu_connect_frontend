import { useState } from "react";

const SeatSelector = ({ totalSeats = 14, bookedSeats = [], onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="card space-y-6">
      <h3 className="text-lg font-semibold text-white">
        Select Your Seat
      </h3>

      {/* SEAT GRID */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: totalSeats }, (_, i) => {
          const seat = i + 1;
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          return (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              disabled={isBooked}
              className={`
                h-12 rounded-lg font-semibold text-sm transition
                ${
                  isBooked
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : isSelected
                    ? "bg-primary text-black"
                    : "bg-surface-dark text-white hover:bg-primary/30"
                }
              `}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* ACTION */}
      <button
        disabled={!selectedSeats.length}
        onClick={() => onConfirm(selectedSeats)}
        className="btn-primary w-full"
      >
        Confirm Seat ({selectedSeats.join(", ") || "None"})
      </button>
    </div>
  );
};

export default SeatSelector;
