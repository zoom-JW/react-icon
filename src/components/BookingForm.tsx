import React from 'react'
import Cards, { type Focused } from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { FaCreditCard } from 'react-icons/fa'

interface BookingFormProps {
  cardData: {
    number: string
    name: string
    expiry: string
    cvc: string
    focus: Focused
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInputFocus: (e: React.FocusEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export const BookingForm: React.FC<BookingFormProps> = ({
  cardData,
  onInputChange,
  onInputFocus,
  onSubmit,
}) => {
  return (
    <div className="payment-section">
      <div className="cards-wrapper">
        <Cards
          number={cardData.number}
          name={cardData.name}
          expiry={cardData.expiry}
          cvc={cardData.cvc}
          focused={cardData.focus}
        />
      </div>

      <form onSubmit={onSubmit} className="booking-form">
        <input
          type="text"
          name="number"
          placeholder="Номер карты"
          value={cardData.number}
          onChange={onInputChange}
          onFocus={onInputFocus}
          maxLength={16}
          className="booking-input"
        />
        <input
          type="text"
          name="name"
          placeholder="Имя владельца"
          value={cardData.name}
          onChange={onInputChange}
          onFocus={onInputFocus}
          className="booking-input"
        />
        <div className="row-inputs">
          <input
            type="text"
            name="expiry"
            placeholder="ММ/ГГ"
            value={cardData.expiry}
            onChange={onInputChange}
            onFocus={onInputFocus}
            maxLength={4}
            className="booking-input"
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC/CVV"
            value={cardData.cvc}
            onChange={onInputChange}
            onFocus={onInputFocus}
            maxLength={3}
            className="booking-input"
          />
        </div>

        <button type="submit" className="confirm-btn">
          <FaCreditCard className="confirm-btn-icon" /> Оплатить и забронировать
        </button>
      </form>
    </div>
  )
}
