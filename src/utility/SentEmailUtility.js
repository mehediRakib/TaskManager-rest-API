const nodemailer=require('nodemailer');

const sendEmailUtility=async (Emailto,EmailText,EmailSubject)=>{
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });
    let mailOptions = {
        from: 'Task Manager <info@teamrabbil.com>',
        to: Emailto,
        subject: EmailSubject,
        text: EmailText

    };
    return  await transporter.sendMail(mailOptions);
}
module.exports=sendEmailUtility;