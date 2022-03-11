
## REACT SETUP

```cmd
yarn install or npm install
```
* Create .env file in client directory with the following variables in .env-example file.

## Server 

```cmd 
yarn develop or yarn start
```
* Create .env file in server  directory with the following variables in .env-example file.

## Note
* User model should have **stripe_customer_id** and **has_card** attributes in schema when adding code to your app.
* Ensure your stripe is in test mode.

## IMPORTANT
* If the localStorage user is deleted, delete the user form mongodb to avoid errors.
you can also delete the customer on stripe to avoid duplicate customers.

#### Once everything is set up the flow is as follows:


##### First
* On the load of the main page we check local storage for the user object.
* If the user object is not found we create a new user and a stripe customer with dummy data in **server/routes/authRoutes**.

##### Second
* Enter credit card details dummy card **4242 4242 4242 4242 exp: 01/20 cvc: 123**
* Card is now added as a payment Method for stripe customer and can now be used in the features.
* You can view the payment methods on the stripe dashboard [customers](https://dashboard.stripe.com/test/customers)
  click on the customer and you can see the payment methods.

* You would now be presented with a charge form and remove payment button.
* charges should be entered in cents eg: **2000 = $2.00**
* You can view the charges on the stripe dashboard [payments](https://dashboard.stripe.com/test/payments)

##### Third
* Code is commented and should be clear to understand.
* **server/routes/authRoutes** and  **server/routes/stripeRoutes** are the route files.
* routes marked with **!** are the routes being used.


