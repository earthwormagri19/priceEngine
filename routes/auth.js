// const express = require('express');
// const router = express.Router();

// const firebase = require('firebase');
// // import firebase from 'firebase'
// // import 'firebase/auth'
// // import 'firebase/app'

// var firebaseConfig = {
//   apiKey: "AIzaSyBO-lR44grlyS7cfSOHinVG25FSy2-MKlw",
//   authDomain: "zoomfresh-ops.firebaseapp.com",
//   databaseURL: "https://zoomfresh-ops.firebaseio.com",
//   projectId: "zoomfresh-ops",
//   storageBucket: "zoomfresh-ops.appspot.com",
//   messagingSenderId: "1072758282138",
//   appId: "1:1072758282138:web:4d8da8987f2162704a0c23",
//   measurementId: "G-63CN4R208D"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// firebase.auth();

// router.post('/', (req, res) => {
//     firebase.auth().signInWithEmailAndPassword(req.email, req.password) 
//       //everything is almost exactly the same as the function above
//       .then( async res => {
//         res.json(res);
//     }).catch(err => {
//         res.status(500).json({ success: false, msg: `Something went wrong`+error });
//     });
// });

// module.exports = router;