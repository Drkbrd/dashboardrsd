import { db } from './firebase_config'
import { collection, getDocs, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";


//CRUD Team-------------------------------------------------------------------------------------------------------
//Get all the teams, busca y devulve
export async function getAllTeams(setTeams) {
    const querySnapshot = await getDocs(collection(db, "team"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    setTeams(newData)
}

//Get all the teams - reactivo y cambia automatico
export async function getAsyncTeams(setTeams) {
    const q = await query(collection(db, "team"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        setTeams(newData)
    });
}

//Creación de un Team
export async function createTeam(team) {
    try {
        const docRef = await addDoc(collection(db, "team"), team);
        console.log("Team written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding team: ", e);
    }
}
//Update team
export async function updateTeam(team) {
    try {
        const teamRef = doc(db, "team", team.id);
        await updateDoc(teamRef, team);
    } catch (e) {
        console.error("Error adding team: ", e);
    }
}
//Delete team
export async function deleteTeam(team) {
    try {
        await deleteDoc(doc(db, "team", team.id));
    } catch (e) {
        console.error("Error deleting team: ", e);
    }
}
//CRUD Team-------------------------------------------------------------------------------------------------------

//CRUD Station-------------------------------------------------------------------------------------------------------
//Creación de Station
export async function createStation(station) {
    try {
        const docRef = await addDoc(collection(db, "station"), station);
        console.log("Station written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding station: ", e);
    }
}
//Get all the stations, busca y devulve 
export async function getAllStation(setStation) {
    const querySnapshot = await getDocs(collection(db, "station"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    setStation(newData)
}

//Get all the station - reactivo y cambia automatico 
export async function getAsyncStation(setStation) {
    const q = await query(collection(db, "station"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        setStation(newData)
    });
}
//Update team  
export async function updateStation(station) {
    try {
        const userRef = doc(db, "station", station.id);
        await updateDoc(userRef, station);
    } catch (e) {
        console.error("Error adding station: ", e);
    }
}
//Delete team
export async function deleteStation(station) {
    try {
        await deleteDoc(doc(db, "station", station.id));
    } catch (e) {
        console.error("Error deleting station: ", e);
    }
}
//CRUD Station-------------------------------------------------------------------------------------------------------

//CRUD User-------------------------------------------------------------------------------------------------------
//Creación de users
export async function createUser(user) {
    try {
        const docRef = await addDoc(collection(db, "user"), user);
        console.log("User written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding User: ", e);
    }
}

//Get all the Users, busca y devulve
export async function getAllUsers(setUser) {
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    setUser(newData)
}

//Get all the users - reactivo y cambia automatico
export async function getAsyncUser(setUser) {
    const q = await query(collection(db, "user"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        setUser(newData)
    });
}
//Update team
export async function updateUser(user) {
    try {
        const userRef = doc(db, "user", user.id);
        await updateDoc(userRef, user);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}
//Delete team
export async function deleteUser(user) {
    try {
        await deleteDoc(doc(db, "user", user.id));
    } catch (e) {
        console.error("Error deleting user: ", e);
    }
}
//CRUD User-------------------------------------------------------------------------------------------------------

/*Registrar escore del team
export async function asignPoints(fkst, fkteam, timestam, totScore) {
    try {
        const docRef = await addDoc(collection(db, "score"), {
            FK_station_score: fkst,
            FK_team: fkteam,
            creted_at: timestam,
            score: totScore
        });
        console.log("the id for this item is ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}*/