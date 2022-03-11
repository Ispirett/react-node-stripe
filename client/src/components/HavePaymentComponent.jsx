import axios from "axios";
import {handleUpdateUser, host} from '../config/defaults.js'
import { useState, useEffect } from "react";





const removePayment =  async () => {
  const user = await JSON.parse(window.localStorage.getItem('user'));
  //*  call api 
  //We remove the payment method from the customer 
  const reponse = await axios.get(`${host}/remove_payment`, {params:{userId: user._id, customerId: user.stripe_customer_id}});
  handleUpdateUser(reponse, "removed payment method");
  console.log("remove card",reponse);
};



export default () => { 
    const [amount, setAmount] = useState(0);
    
    const handleSubmit =  async (e) => {
        e.preventDefault();
         const user = await JSON.parse(window.localStorage.getItem('user'));

        //*  call api 
        // We can now charge the customer saved payment method 
        // server/routes/stripeRoutes.js
        await axios.post(`${host}/charge`, {
                amount: amount,
                customerId: user.stripe_customer_id,

            });
        setAmount(0);
    }
     return (
     <div className="pt-4">
     <button onClick={() => removePayment()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
         Remove Card
     </button>
        <br />
        <br />
     <div>
    <label htmlFor="price" className="block text-sm font-bold text-gray-700 ">Charge in cents</label>
    <form onSubmit={(e)=> handleSubmit(e)} className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm"> $ </span>
        </div>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-700 rounded-md" placeholder="0.00"/>
        <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">Currency</label>
        <select id="currency" name="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
        </select>
        <br />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
         Charge
       </button>
       </div>
        
    </form>
    </div>
    <br />
    <small> <a target="_blank" className="pointer-cursor text-blue-500 hover:blue-800" href="https://dashboard.stripe.com/test/payments">Stripe payment dashboard </a></small>
</div>
)
}