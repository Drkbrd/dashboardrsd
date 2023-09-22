import { db } from './firebase_config'
import { collection, getDocs, query, onSnapshot, addDoc } from "firebase/firestore";



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

export async function getAsyncTeams(setTeams) {
    const q = await query(collection(db, "team"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        setTeams(newData)
    });
}

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

export async function createTeam(amnt, chnt, clr, crtAt, nm, scr) {
    try {
        const docRef = await addDoc(collection(db, "team"), {
            amount: amnt,
            chant: chnt,
            color: clr,
            create_at: crtAt,
            name: nm,
            score: scr
        });
        console.log("Team written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding team: ", e);
    }
}