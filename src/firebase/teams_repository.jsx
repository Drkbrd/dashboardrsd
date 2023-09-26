import { db } from './firebase_config'
import { collection, getDocs, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

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

//Registrar escore del team
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

//Creación de Station
export async function createStation(nm, dscrpt, minVl, mxVl) {
    try {
        const docRef = await addDoc(collection(db, "station"), {
            name: nm,
            description: dscrpt,
            maxVal: mxVl,
            minValue: minVl
        });
        console.log("Team written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding team: ", e);
    }
}

//Creación de users
export async function createUser(usrNme, psswrd, sdmn, fkSttn) {
    try {
        const docRef = await addDoc(collection(db, "user"), {
            userName: usrNme,
            password: psswrd,
            is_admin: sdmn,
            FK_station: fkSttn
        });
        console.log("Team written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding team: ", e);
    }
}