const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

const stripeRoutes = (app) => {
    const customer_id =  "cus_LI5nPJSYtOfg7Q";
    // get all customers 
    app.get('/customers', async (req, res) => {
        try{
          const customers =  await stripe.customers.list({ limit: 5 })
            res.status(200).json({status: "success", customers:customers});
        }
        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
      
    })

    // NEW CUSTOMER 
    app.post('/new_customer', async (req, res) => { 
        // create new stripe customer
        try {
            const customer = await stripe.customers.create({
                //   use a unique identifier for the customer
                   email: req.body.email,
                   description: "New Customer"
               })
           //* save customer id on the user object database here. eg: customer.id
            res.status(200).json({status: "success", customer:customer});
        }
        catch(err) {
            res.status(500).json({status: "error", message: err.message});
        }
     
        
    })

    // GET CUSTOMER 
    // * customer should be saved generally on the user object 
    app.get('/get_customer/:stripe_customer_id', async(req, res) => {

        try{
            const customer = await stripe.customers.retrieve(customer_id);
            res.status(200).json({status: "success", customer: customer});
        }
        catch(err) {
            res.status(500).json({status: "error", message: err.message});
        }
        
    })
 

    // !important
    // ADD PAYMENT 
    app.get('/add_payment', async (req, res) => {
        try{
            let user;
            const paymentMethod = await stripe.paymentMethods.attach(
                req.query.paymentMethodId,
                {customer: req.query.customerId}  //* customer id should be stored on the user object in the database  
            )

            // update user hasCard to true
            User.findByIdAndUpdate(req.query.userId,{has_card: true})
            .then(result => {
                //  the return user is stale so we update it manulally before sending it to the frontend
                 result.has_card = true;
                 user = result;
                 console.log("update user", user)
                 res.status(200).json({status: "success", user: user});
                })
                
            .catch(error => {console.log("update user error", error)})


            
        }

        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
       
    })
  // !important
  // REMOVE PAYMENT
    app.get('/remove_payment', async (req, res) => {
        
        try{
            let user;
            // get all customer payments
            const paymentMethods = await stripe.paymentMethods.list({
                customer: req.query.customerId,
                type: 'card'
            })

            // get first paymentMethod
            const firstPaymentMethodId = paymentMethods.data[0].id;
           
            // remove payment method
            const paymentMethod = await stripe.paymentMethods.detach(
                firstPaymentMethodId,
            )
            // update user 
            User.findByIdAndUpdate(req.query.userId,{has_card: false})
            .then(result => {
                //  the return user is stale so we update it manulally before sending it to the frontend
                 result.has_card = false;
                 user = result;
                 console.log("update user", user)
                 res.status(200).json({status: "success", user: user});
                })
        }
        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
    })


   

    // PRODUCTS
    app.get('/products', async (req, res) => {
        try{
            const products = await stripe.products.list({ limit: 5 })
            res.status(200).json({status: "success", products:products});
        }
        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
    })
    // CHARGE CUSTOMER
    // https://stripe.com/docs/saving-cards
    app.post('/charge',async (req, res) => {
        try{

            const paymentMethods = await stripe.paymentMethods.list({
                customer: req.body.customerId,
                type: 'card'
            })

            // get first paymentMethod
            const firstPaymentMethodId = paymentMethods.data[0].id;


            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: 'usd',
                payment_method_types: ['card'],
                confirm: true,
                customer: req.body.customerId,
                payment_method: firstPaymentMethodId,
              });

            res.status(200).json({status: "success", paymentIntent: paymentIntent});
        }
        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
    })
}

module.exports = stripeRoutes;