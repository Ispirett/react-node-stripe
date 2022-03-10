const stripeRoutes = require('./stripeRoutes');

const appRouter = (app) => {
    stripeRoutes(app);
}

module.exports = appRouter;