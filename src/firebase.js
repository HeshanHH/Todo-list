import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebase_config } from './firebase-config';
const firebaseConfig = firebase.initializeApp(firebase_config);
console.log(firebaseConfig);
export { firebaseConfig as firebase };

// const firebase_config = {
//   apiKey: 'A.................bw',
//   authDomain: 'todo.............com',
//   databaseURL: 'https://todo...............com',
//   projectId: 't...........6',
//   storageBucket: 't................com',
//   messagingSenderId: '4............',
//   appId: '.:...................',
// };
