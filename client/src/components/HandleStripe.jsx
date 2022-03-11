import { useState, useEffect } from "react"
import {StripeComponent, HavePaymentComponent} from './'

export default () => {
    const [hasCard, setHasCard] = useState(false);
    useEffect(async () => {
        const user = await JSON.parse(window.localStorage.getItem('user'));
        setHasCard(user.has_card);
        console.log(hasCard);
         
    },[])
    return (
        <>
         { hasCard && (
             <HavePaymentComponent/>
         )
         }
         {!hasCard && (
             <StripeComponent/>
         )}
        </>

    )
}