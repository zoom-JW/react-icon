import React from 'react'
import { FaClock } from 'react-icons/fa'

interface SessionStatusProps {
  isSessionActive: boolean
  selectedSeat: number | null
}

export const SessionStatus: React.FC<SessionStatusProps> = ({ isSessionActive, selectedSeat }) => {
  return (
    <div className="session-status">
      <p>
        <FaClock className="session-clock-icon" />
        <strong>Статус сессии:</strong>{' '}
        {isSessionActive ? (
          <span className="status-active">Активна</span>
        ) : (
          <span className="status-inactive">Прервана (Idle)</span>
        )}
      </p>
      <p>
        <strong>Выбранное место:</strong>{' '}
        {selectedSeat !== null ? `№${selectedSeat}` : 'Не выбрано'}
      </p>
    </div>
  )
}
