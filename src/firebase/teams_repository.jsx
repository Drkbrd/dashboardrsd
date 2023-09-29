import { db } from './firebase_config'
import { collection, getDocs, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc, where } from "firebase/firestore";


//CRUD Team-------------------------------------------------------------------------------------------------------
//Get all the teams, busca y devulve
export async function getAllTeams(setTeams) {
    const querySnapshot = await getDocs(collection(db, "team"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        doc.id, " => ", doc.data();
    });
    const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    setTeams(newData)
}

//Get all the teams - reactivo y cambia automatico
export async function getAsyncTeams(setTeams) {
    const q = await query(collection(db, "team"));
    const scores = await getAllScore();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        newData.forEach((team) => team.score = scores.filter((score) => score["fk_team"] == team.id).reduce((accumulator, score) => accumulator + score.score, 0))
        setTeams(newData)
    });
}

export async function getAsyncScore(setTeams) {
    const q = query(collection(db, "score"));
    var teams = []
    await getAllTeams((t) => teams = t);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const scores = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const newTeamsRef = teams.map((team) => ({ ...team, score: 0 }));
        newTeamsRef.forEach((team) => team.score = scores.filter((score) => score["fk_team"] == team.id).reduce((accumulator, score) => accumulator + score.score, 0))
        setTeams(newTeamsRef)
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
//get score by id
export async function getScoreById(team) {
    //console.log("Hola entre a getScoreById")
    const q = query(collection(db, "score"), where("fk_team", "==", team.id));
    const querySnapshot = await getDocs(q);
    var totalScore = 0
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data().score);
        doc.id, " => ", doc.data().score
        totalScore += parseInt(doc.data().score);
    });
    console.log(totalScore + "aqui es ta el numevo total")
    return totalScore;
}

//get all scores
export async function getAllScore() {
    const querySnapshot = await getDocs(collection(db, "score"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        doc.id, " => ", doc.data()
    });
    const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
    return newData;
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
        //console.log(doc.id, " => ", doc.data());
        doc.id, " => ", doc.data()
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
//Update station  
export async function updateStation(station) {
    try {
        const userRef = doc(db, "station", station.id);
        await updateDoc(userRef, station);
    } catch (e) {
        console.error("Error adding station: ", e);
    }
}
//Delete station
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
        //console.log(doc.id, " => ", doc.data());
        doc.id, " => ", doc.data()
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
//Update user
export async function updateUser(user) {
    try {
        const userRef = doc(db, "user", user.id);
        delete user["id"]
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

//CRUD Asign points-------------------------------------------------------------------------------------------------------
//Registrar escore del team
export async function asignPoints(scores) {
    try {
        const docRef = await addDoc(collection(db, "score"), scores);
        console.log("the id for this score is ", docRef.id);
    } catch (e) {
        console.error("Error adding score: ", e);
    }
}