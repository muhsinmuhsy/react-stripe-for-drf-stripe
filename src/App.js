import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

// Your actual Stripe public key
const stripePromise = loadStripe('pk_test_51PdQReI2SPLgXlZ7dC7aLvtf1x1e5aoE5trPqYK4Vf95EShqegEo8s0KHt1Mepz5Z4aXPP9C5jMRv4esbZq2vWKy00kMa6r0Cf');

const App = () => {

  const priceId = 'price_1PdTgoI2SPLgXlZ76UFwEJbA';  // Replace with your actual price ID

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm priceId={priceId}/>
    </Elements>
  );
};

export default App;
