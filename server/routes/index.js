const stripeRoutes = require('./stripeRoutes');
const authRoutes = require('./authRoutes');
const appRouter = (app) => {
    stripeRoutes(app);
    authRoutes(app);
}

module.exports = appRouter;