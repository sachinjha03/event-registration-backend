const mongoose = require('mongoose')

// mongoose.connect("mongodb://127.0.0.1:27017/Event-Registration").then(() => {
mongoose.connect("mongodb+srv://sachin03:sachin03nic@eventregistration.gs1f97c.mongodb.net/RegistrationDatabase?retryWrites=true&w=majority&appName=eventRegistration").then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log(`Failed to connect with database , ${err}`);
})