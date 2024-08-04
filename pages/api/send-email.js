import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, subject, text } = req.body;

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // SMTP server address (e.g., smtp.gmail.com)
            port: process.env.SMTP_PORT, // SMTP server port (e.g., 587 for TLS)
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // SMTP username
                pass: process.env.SMTP_PASS, // SMTP password
            },
        });

        try {
            // Send email
            await transporter.sendMail({
                from: `"EOSI Referral System" <${process.env.SMTP_USER}>`, // sender address
                to, // list of receivers
                subject, // Subject line
                text, // plain text body
            });

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
