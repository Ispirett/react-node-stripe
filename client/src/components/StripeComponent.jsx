// reference https://stripe.com/docs/stripe-js/react
import React,{useEffect} from 'react';
import {Elements, useStripe,  useElements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import {handleUpdateUser, host} from '../config/defaults.js'
  //! standard import for env
  //yarn add react-scripts
  //? const stripeKey = process.env.REACT_STRIPE_PUB_KEY
  //* using vite to import env variables


  const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY
  const stripePromise = loadStripe(stripeKey);

// add a new payment method to stripe
  const handleSubmit = async (stripe, elements) => {
    const user = await JSON.parse(window.localStorage.getItem('user'));
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
    });

    //* call api
    if (!error) {
       const response = await  axios.get(`${host}/add_payment`,
         {params: {paymentMethodId: paymentMethod.id,
           userId: user._id, 
           customerId:user.stripe_customer_id}
          });
         console.log(response);
         console.log('no error', paymentMethod);  
         handleUpdateUser(response);
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