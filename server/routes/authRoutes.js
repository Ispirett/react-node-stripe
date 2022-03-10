const User = require('../models/User');
const authRoute  = (app) => {

    app.get('/auth/sign_up', (req, res) => {
        const user = new User({
            name: "Foo Bar",
            email: "foo.bar@g.com",
        })
        user.save.then((result) => {
            res.status(200).json({status:"success", result:result});
        }).catch(error => {
            res.status(500).json({status:"error", message:error.message});
        })
    })
}

module.exports = authRoute;