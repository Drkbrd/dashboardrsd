import { collection, addDoc } from "firebase/firestore";

import 'firebase/database';

export async function create(db) {
  try {
    const docRef = await addDoc(collection(db, "team"), {
      amount: "12",
      chant: "porra 12",
      color: "#6B94FF",
      create_at: "7 sept 2023",
      name: "Equipo 12",
      score: 28
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
/*
export async function deleteIt() {
  const dbinit = firebase.database();
  const userRef = dbinit.database().ref('users').child("59w289jMU5qr7leAFrDb");
  console.log(db2);
  userRef.remove()
    .then(() => {
      console.log('User deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
}*/