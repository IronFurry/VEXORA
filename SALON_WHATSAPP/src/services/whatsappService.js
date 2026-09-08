const client = require("../config/twilio");


// ==============================
// PAYMENT NOTIFICATION
// ==============================

const sendPaymentNotification = async (phoneNumber) => {

    return await client.messages.create({

        from: process.env.TWILIO_WHATSAPP_NUMBER,

        to: `whatsapp:${phoneNumber}`,

        contentSid: process.env.TWILIO_CONTENT_SID

    });

};


// ==============================
// CANCEL NOTIFICATION
// ==============================

const sendCancelNotification = async (phoneNumber) => {

    return await client.messages.create({

        from: process.env.TWILIO_WHATSAPP_NUMBER,

        to: `whatsapp:${phoneNumber}`,

        contentSid: process.env.TWILIO_CONTENT_SID

    });

};


// ==============================
// QUEUE NOTIFICATION
// ==============================

const sendQueueNotification = async (phoneNumber) => {

    return await client.messages.create({

        from: process.env.TWILIO_WHATSAPP_NUMBER,

        to: `whatsapp:${phoneNumber}`,

        contentSid: process.env.TWILIO_CONTENT_SID

    });

};


module.exports = {

    sendPaymentNotification,
    sendCancelNotification,
    sendQueueNotification

};