import nodemailer from 'nodemailer'

const sendMail = async ( email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            posrt: 587,
            secure: false,
            auth: {
                user: process.env.EMIAL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        await transporter.sendMail({
            from:"rupeshkatuwal53@gmail.com",
            to: email,
            subject: subject,
            text:text
        });
    }
    catch(error){
        console.log(error);
    }
}

export default sendMail