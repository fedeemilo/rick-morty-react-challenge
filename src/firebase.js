import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyAJLvvu5GGheS2CcHxhSVQn7gkoKecipWc",
    authDomain: "rick-morty-challenge.firebaseapp.com",
    databaseURL: "https://rick-morty-challenge.firebaseio.com",
    projectId: "rick-morty-challenge",
    storageBucket: "rick-morty-challenge.appspot.com",
    messagingSenderId: "655100034363",
    appId: "1:655100034363:web:d1d52f8ce79bd6c2ea4b1e",
    measurementId: "G-WWQCRL1WY8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// utilizamos de base de datos a firebase y la colección la nombramos 'favs'
let db = firebase.firestore().collection('data')

export function getFavs(uid) {
	return db
		.doc(uid)
		.get()
		.then((snap) => {
			return snap.data().array
		})
}

export function updateDB(array, uid) {
	db.doc(uid).set({ array })
}

// export function signOutGoogle() {
// 	firebase.auth().signOut()
// }

// // exporto la función que permite que se pueda loguearse con Google con Firebase
// export function loginWithGoogle() {
// 	let provider = new firebase.auth.GoogleAuthProvider()
// 	return firebase
// 		.auth()
// 		.signInWithPopup(provider)
// 		.then((snap) => snap.user)
// }
