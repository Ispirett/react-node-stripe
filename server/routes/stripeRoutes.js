const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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


    
    app.get('/add_payment', async (req, res) => {
      console.log(req.query.paymentMethodId);
        try{
            const paymentMethod = await stripe.paymentMethods.attach(
                req.query.paymentMethodId,
                {customer: customer_id}  //* customer id should be stored on the user object in the database  
            )
            res.status(200).json({status: "success", paymentMethod:paymentMethod});
        }
        catch(err){
            res.status(500).json({status: "error", message: err.message});
        }
       
    })
  
    app.get('/remove_payment', async (req, res) => {
        
        try{
            // get all customer payments
            const paymentMethods = await stripe.paymentMethods.list({
                customer: customer_id,
                type: 'card'
            })

            // get first paymentMethod
            const firstPaymentMethodId = paymentMethods.data[0].id;
           
            // remove payment method
            const paymentMethod = await stripe.paymentMethods.detach(
                firstPaymentMethodId,
            )

            res.status(200).json({status: "success", paymentMethod: paymentMethod});
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
}

module.exports = stripeRoutes;