const {

    sendPaymentNotification,

    sendCancelNotification,

    sendQueueNotification

} = require(
    "../services/whatsappService"
);


const sendNotification = async (
    req,
    res
) => {

    try {

        const {

            phoneNumber,

            type,

            data

        } = req.body;


        // =============================
        // PAYMENT SUCCESS
        // =============================

        if (type === "PAYMENT_SUCCESS") {

            const response =
                await sendPaymentNotification(

                    phoneNumber,

                    data.userName,

                    data.appointmentDate,

                    data.appointmentTime

                );


            return res.status(200).json({

                success: true,

                notificationType:
                    "PAYMENT_SUCCESS",

                message:
                    "Payment notification sent",

                twilioSid:
                    response.sid

            });

        }


        // =============================
        // APPOINTMENT CANCELLED
        // =============================

        if (
            type ===
            "APPOINTMENT_CANCELLED"
        ) {

            const response =
                await sendCancelNotification(

                    phoneNumber,

                    data.appointmentDate,

                    data.appointmentTime

                );


            return res.status(200).json({

                success: true,

                notificationType:
                    "APPOINTMENT_CANCELLED",

                message:
                    "Cancellation notification sent",

                twilioSid:
                    response.sid

            });

        }


        // =============================
        // QUEUE POSITION
        // =============================

        if (
            type ===
            "QUEUE_POSITION_2"
        ) {

            const response =
                await sendQueueNotification(

                    phoneNumber,

                    2

                );


            return res.status(200).json({

                success: true,

                notificationType:
                    "QUEUE_POSITION_2",

                message:
                    "Queue notification sent",

                twilioSid:
                    response.sid

            });

        }


        // =============================
        // INVALID TYPE
        // =============================

        return res.status(400).json({

            success: false,

            message:
                "Invalid notification type"

        });


    } catch (error) {

        console.error(
            "WhatsApp Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


module.exports = {
    sendNotification
};