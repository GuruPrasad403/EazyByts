import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import send from 'send';

dotenv.config();

async function sendEmail(to,Sub,otp,name) {
    try {
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Replace with your SMTP host
            port: 465, // Port for secure TLS
            secure: true, // Use SSL/TLS
            auth: {
            user: process.env.EMAIL_USER, // Your email address
         pass: process.env.EMAIL_PASS, // Your app password
    },
    tls: {
      rejectUnauthorized: false, // Disable strict TLS verification (use only for debugging)
    },
  });
  console.log(to)
  
        let info = await transporter.sendMail({
            from: `"CMS BLOG " <${process.env.EMAIL_USER}>`,
            to: to,
            subject:Sub,
            text: 'Thank you for signing up!',
            html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background-color: #007bff;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
        }

        .content .otp {
            display: inline-block;
            margin: 20px 0;
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            background: #f1f1f1;
            padding: 10px 20px;
            border-radius: 4px;
        }

        .footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Account Verification</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for registering with our CMS. Please use the OTP below to verify your account:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
            <p>If you did not request this email, please contact our support team.</p>
        </div>
        <div class="footer">
            &copy; 2024 CMS. All rights reserved. For assistance, contact <a href="mailto:support@cms.com">support@cms.com</a>
        </div>
    </div>
</body>

</html>
`
        });
        
        console.log('Message sent successfully: %s', info.messageId);
    } catch (error) {
        console.error('Error while sending email:', error);
    }
}

export default sendEmail;