import React from 'react'
import { FaChair } from 'react-icons/fa'

interface SeatGridProps {
  selectedSeat: number | null
  onSelectSeat: (seatNumber: number) => void
}

export const SeatGrid: React.FC<SeatGridProps> = ({ selectedSeat, onSelectSeat }) => {
  const seats = [1, 2, 3, 4, 5, 6]

  return (
    <div className="seats-container">
      <p className="seats-title">Выберите место в зале</p>
      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => onSelectSeat(seat)}
            className={`seat-btn ${selectedSeat === seat ? 'seat-btn--selected' : ''}`}
          >
            <FaChair className="seat-icon" />
            {seat}
          </button>
        ))}
      </div>
    </div>
  )
}
