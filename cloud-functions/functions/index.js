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

    if (parkingId === null || isUsed === null) throw new Error("parkingId and isUsed must be passed");

    const db = admin.firestore();

    const parkingRef = db.collection('services').doc(parkingId);

    var getParking = parkingRef.get()
        .then(doc => {

            if (!doc.exists) {
                console.log('The document does not exist. New document will be created');
                parkingRef.set({parkingId, isUsed});
                res.send('does not exists');
                return;
            }

            console.log('The document already exists. Let\'s do some fun stuff');
            res.send('does exists');
            return;
        })
        .catch(err => {
            console.log('Error retrieving the document', err);
            res.send('Error')
        });

    return getParking;
});