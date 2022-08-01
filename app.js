const express = require("express");
require("dotenv/config");
const nodemailer = require("nodemailer");

const envFile = process.env;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: envFile.MAIL_USER,
        pass: envFile.MAIL_PASSWORD,
        clientId: envFile.OAUTH_CLIENTID,
        clientSecret: envFile.OAUTH_CLIENT_SECRET,
        refreshToken: envFile.OAUTH_REFRESH_TOKEN
    }
})

const app = express();

app.get("/emailer", (req, res, next) => {
    transporter.sendMail({
        from: "chimebukaanyanwu@gmail.com",
        to: "chimebukaanyanwu@gmail.com",
        subject: "Node emailing app",
        text: "testing automated sending of emails using nodejs"
    }, (err, data) => {
        if (err) {
            console.log(err)
            return res.json("There was an error sending the email");
        }
        res.json("email was sent!")
    })
})

app.listen(process.env.PORT || 4000, () => console.log(`Runninng on port ${process.env.PORT}`));