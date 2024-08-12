import nodemailer from 'nodemailer';
export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'alhabib5565@gmail.com',
      pass: 'hine xrep gjos mxmr',
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'alhabib5565@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
};
