import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'christ89@ethereal.email',
        pass: '5g4waGuzQm3n8gSmC6'
    },
});


export async function sendResetEmail(toEmail, resetToken) {
    const mailOptions = {
        from: '"Christ Brown" <stshahab@gmail.com>', // sender address
        to: `${toEmail}`,
        subject: 'Password Reset',
        html: `<p>Click the following link to reset your password: <a href="https://localhost:3000/api/auth/reset-password/${resetToken}">Reset Password</a></p>`,
    };

    try {
        const mailSend = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent', mailSend);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send password reset email');
    }
}