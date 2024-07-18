import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ userId, priceId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/create-subscription/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        payment_method_id: paymentMethod.id,
        price_id: priceId,
      }),
    });

    const subscription = await response.json();

    if (response.ok) {
      console.log('Subscription created successfully:', subscription);
    } else {
      setError(subscription.error);
    }
  };

  return (
    <>  
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Subscribe
            </button>
            {error && <div>{error}</div>}
        </form>
    </>
  );
};

export default CheckoutForm;
