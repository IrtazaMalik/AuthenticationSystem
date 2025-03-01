const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

module.exports.sendEmail = async ({ to, subject, text, html }) => {
    const msg = {
        to,
        from: 'sendgrid-sender@yopmail.com',
        subject,
        text,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.log(error);
    }
};
