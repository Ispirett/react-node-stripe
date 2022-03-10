// reference https://stripe.com/docs/stripe-js/react
import React,{useEffect} from 'react';
import {Elements, PaymentElement, useStripe,  useElements, ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
  //! standard import for env
  //yarn add react-scripts
  //? const stripeKey = process.env.REACT_STRIPE_PUB_KEY
  //* using vite to import env variables
  const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY
  const stripePromise = loadStripe(stripeKey);
  const host = import.meta.env.VITE_HOST || "http://localhost:4100"

// add a new payment method to stripe
  const handleSubmit = async (stripe, elements) => {
  
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
    });

    if (!error) {
         await  axios.get(`${host}/add_payment`,
         {params: {paymentMethodId: paymentMethod.id}})
         .then(res => {console.log(res)})
         console.log('no error', paymentMethod);
    }
    else {
        console.log('error', error);
    }
}

const CheckoutForm = () => { 
    const stripe = useStripe();
    const elements = useElements();

    return (
       <React.Fragment>
           <h2> Stripe Form</h2>
           <CardElement/>
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSubmit(stripe, elements)}> Submit 
           </button>
       </React.Fragment>
    )
}

  const StripeComponent = () => {

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
  }

  export default StripeComponent