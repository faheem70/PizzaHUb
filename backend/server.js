const app = require('./App');
const mongoose = require('mongoose');


mongoose.set('strictQuery', true);
const connectDatabase = require("./config/database")

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
}

//conect database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`server is running http://localhost:${process.env.PORT}`);
});


// unHandled Promise Rejection

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

});