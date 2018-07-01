const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin  = require('firebase-admin');


admin.initializeApp();

exports.startService = functions.https.onRequest((req, res) => {

    const { parkingId, isUsed } = req.query;

    if (parkingId === null || isUsed === null) {
        res.status(500).send("parkingId and isUsed must be passed"); 
        return;
    }

    const db = admin.firestore();

    const parkingRef = db.collection('services').doc(parkingId);

    const requestIsUsed = Boolean(parseInt(isUsed));

    var getParking = parkingRef.get()
        .then(doc => {

            let message = '';

            if (!doc.exists) {
                message = 'El estacionamiento ' + parkingId + ' no se encuentra en la base datos. Se creará un nuevo registro';
                console.log(message);
                parkingRef.set({ isUsed: requestIsUsed });
                res.send({ success: true, message });
                return;
            }

            const { isUsed } = doc.data();

            if (isUsed === requestIsUsed) {
                console.log('El estado del estacionamiento ' + parkingId + ' no ha cambiado');
                res.send({ success: false, message: '' });
                return;
            }

            if (isUsed === false) {
                message = 'El vehiculo salió del estacionamiento ' + parkingId;
            } else {
                message = 'Un nuevo vehiculo ha entrado al estacionamiento ' + parkingId;
            }
            console.log(message);
            parkingRef.set({ isUsed: requestIsUsed });
            res.send({ success: true, message });
           /*
                const accountSid = 'AC90463b329a3d591cef9141bc7c5eb22b'; // Your Account SID from www.twilio.com/console
                const authToken = 'a71a8fd163fbde11fe7b785906b07269';   // Your Auth Token from www.twilio.com/console

                const client = new twilio(accountSid, authToken);

                const promise = client.messages.create({
                    body: 'Hello from my serverless function',
                    to: '+51949265183',  // Text this number
                    from: '+13012652316' // From a valid Twilio number
                })
                .then((message) => console.log(message.sid))
                .then(() => res.send('sending message to +51949265183'));
                return promise;
            }
             
            */
            return;
        })
        .catch(err => {
            console.log('Error retrieving the document', err);
            res.send('Error')
        });

    return getParking;
});