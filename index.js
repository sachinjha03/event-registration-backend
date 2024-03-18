const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const Razorpay = require('razorpay')
const nodemailer = require('nodemailer');

const razorpay = new Razorpay({
    key_id: 'rzp_test_x60STtj7ClWCoL',
    key_secret: 'IVVeFhTOgl4ZSjUS6C56pyGv'
});

const Event = require("./models/Event")

require("./db/connection")

app.use(express.json())
app.use(cors())


app.post('/order', async (req, res) => {
    const options = {
        amount: 499,
        currency: 'INR',
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
});

app.post("/user-registration" , async(req,res) => {
    const registrationNumber = Math.floor(10000000 + Math.random() * 90000000);
    const newUser = new Event({
        name:req.body.name,
        studentIdentity : req.body.studentIdentity,
        email:req.body.email,
        contact:req.body.contact,
        event:req.body.event,
        registrationNumber:registrationNumber
    })
    const response = await newUser.save()
    try {
        const transporter = nodemailer.createTransport({
            // Configure your email service
            service: 'gmail',
            auth: {
                user: 'contactsk2303@gmail.com',
                pass: 'grcramzumbsvlhya'
            }
        });

        const mailOptions = {
            from: 'contactsk2303@gmail.com',
            to: req.body.email,
            subject: 'Event Registration Successfull',
            text: `Thank you for Registration To The Event. Please Make Sure To Save This Mail !! .
             Here is Your Registration Number :- ${response.registrationNumber} . 
             Here is Your Event Name :- ${response.event}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
    res.status(200).json({"success":true , data:response})
})


app.listen(port , () => {
    console.log(`listening to the port ${port}`);
})