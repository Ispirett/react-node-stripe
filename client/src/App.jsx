import { useState } from 'react'
import { StripeComponent } from './components'
import logo from './logo.svg'

function App() {
  const [count, setCount] = useState(0)

  
  return (
   <div className='container '>

     <div className='mx-auto pt-20 w-72 '>
     <h1 className='text-2xl font-bold'>Stripe</h1>

      <div className='grid grid-rows-4  grid-col-3 gap-4'>
        <StripeComponent/>
      </div>

     </div>

   </div>
  )
}

export default App
