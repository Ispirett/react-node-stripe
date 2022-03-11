const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const authRoute  = (app) => {

    app.get('/auth/sign_up', async  (req, res) => {
        try {

        // create customer on stripe 
        const customer = await stripe.customers.create({
               email: "foo.bar@g.com",
               description: "Foo Bar"
           })
        
        const user = new User({
        name: "Foo Bar",
        email: "foo.bar@g.com",
        stripe_customer_id: customer.id,
            })

        user.save().then((result) => {
            res.status(200).json({status:"success", result:result});
        }).catch(error => {
            res.status(500).json({status:"error", message:error.message});
        })

        }
        catch(err){
        console.log(err);
        }
     
        
      
    })
}

module.exports = authRoute;