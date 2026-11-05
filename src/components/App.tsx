import React, { useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { Focused } from 'react-credit-cards-2'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { FaTicketAlt, FaExclamationTriangle, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'

import { SessionStatus } from './SessionStatus'
import { SeatGrid } from './SeatGrid'
import { BookingForm } from './BookingForm'

export default function App(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null)
  const [isBooked, setIsBooked] = useState<boolean>(false)
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true)

  const [cardData, setCardData] = useState<{
    number: string
    name: string
    expiry: string
    cvc: string
    focus: Focused
  }>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  })

  const IDLE_TIMEOUT: number = 20000

  const handleOnIdle = (): void => {
    if (!isSessionActive || isBooked) return
    setIsSessionActive(false)
    setSelectedSeat(null)
    toast.warn('Время сессии истекло из-за бездействия. Бронь сброшена.', {
      position: 'top-right',
      icon: <FaExclamationTriangle size={20} color="orange" />,
    })
  }

  const { activate } = useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle: handleOnIdle,
    debounce: 500,
  })

  const handleSelectSeat = (seatNumber: number): void => {
    if (!isSessionActive) {
      toast.error('Сессия неактивна. Обновите сеанс.', { position: 'top-right' })
      return
    }
    setSelectedSeat(seatNumber)
    toast.info(`Место №${seatNumber} выбрано. Заполните данные карты.`, {
      position: 'top-right',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, focus: e.target.name as Focused }))
  }

  const handleConfirmBooking = (e: React.FormEvent): void => {
    e.preventDefault()
    if (selectedSeat === null) return

    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvc) {
      toast.error('Пожалуйста, заполните все данные банковской карты!', { position: 'top-right' })
      return
    }

    setIsBooked(true)
    toast.success(
      `Оплата успешна! Билет забронирован на ${selectedDate?.toLocaleDateString()} (Место #${selectedSeat}).`,
      {
        position: 'top-right',
        icon: <FaCheckCircle size={20} />,
      }
    )
  }

  const handleReset = (): void => {
    setSelectedSeat(null)
    setIsBooked(false)
    setIsSessionActive(true)
    setCardData({ number: '', name: '', expiry: '', cvc: '', focus: '' })
    activate()
    toast.info('Сеанс обновлен.', { position: 'top-right' })
  }

  return (
    <div className="app-container">
      <ToastContainer pauseOnHover theme="colored" />

      <div className="app-card">
        <h2 className="app-title">
          <FaTicketAlt className="app-title-icon" />
          Бронирование и оплата билета
        </h2>

        <p className="app-description">
          Выберите дату, место и оплатите билет. Таймер неактивности: 20 сек.
        </p>

        <div className="field-container">
          <label className="field-label">
            <FaCalendarAlt className="field-icon" /> Дата сеанса:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            disabled={!isSessionActive || isBooked}
            className="datepicker-input"
          />
        </div>

        <SessionStatus isSessionActive={isSessionActive} selectedSeat={selectedSeat} />

        {isSessionActive && !isBooked && selectedSeat === null && (
          <SeatGrid selectedSeat={selectedSeat} onSelectSeat={handleSelectSeat} />
        )}

        {isSessionActive && selectedSeat !== null && !isBooked && (
          <BookingForm
            cardData={cardData}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            onSubmit={handleConfirmBooking}
          />
        )}

        {(isBooked || !isSessionActive) && (
          <div className="reset-btn-container">
            <button className="reset-btn" onClick={handleReset}>
              Сбросить / Новый выбор
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
