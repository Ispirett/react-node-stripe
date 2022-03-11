import { useState, useEffect } from 'react'
import { StripeComponent, HandleStripe } from './components'
import {host} from './config/defaults.js'
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)


  //* if user is not in localStorage create one in mongodb
  useEffect( async () => {
   const user = await window.localStorage.getItem('user');

    if (user === null) {
    //  We create a new user in mongodb 
    // api can be found in server/routes/authRoutes.js 
  
     const response = await axios.get(`${host}/auth/sign_up`)
     console.log(response.data.result);
     window.localStorage.setItem('user', JSON.stringify(response.data.result));
    }
    else {
      // get user object form localStorage
      const parsedUser = JSON.parse(user);
      console.log(parsedUser._id);
    }
  }, []);
  
  return (
   <div className='container '>
     <div className='mx-auto pt-20 w-72 '>
     <h1 className='text-2xl font-bold'>Stripe</h1>
     <p className='text-grey-500'>
      When deleting user from local storage be sure to 
      delete the user from mongodb to avoid any errors.
      </p>
      <div className='grid grid-rows-4  grid-col-3 gap-4'>
        <HandleStripe/>
      </div>

     </div>

   </div>
  )
}

export default App
