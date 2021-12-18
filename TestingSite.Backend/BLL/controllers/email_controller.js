const nodemailer = require("nodemailer");

class EmailService{
    constructor(){

    }
    createTransporter = () =>{
        let transporterConfig = {
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'real.user',
                pass: 'verysecret'
            }
        };
        this.transporter = nodemailer.createTransport(transporterConfig);
    }
    

}

module.exports = new EmailService();