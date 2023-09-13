import { useState } from 'react'
import './style.css'
import { db, initializeFirebase } from './firebase_config.jsx'
import { create } from './create.jsx'


const listTeams = [
    { "name": "Equipo 8", "score": 8, "clr": "#C0392B" },
    { "name": "Equipo 4", "score": 4, "clr": "#F1948A" },
    { "name": "Equipo 1", "score": 1, "clr": "#9B59B6" },
    { "name": "Equipo 5", "score": 5, "clr": "#5B2C6F" },
    { "name": "Equipo 7", "score": 7, "clr": "#2980B9" },
    { "name": "Equipo 3", "score": 3, "clr": "#3498DB" },
    { "name": "Equipo 10", "score": 10, "clr": "#1ABC9C" },
    { "name": "Equipo 6", "score": 6, "clr": "#D4AC0D" },
    { "name": "Equipo 9", "score": 9, "clr": "#F5B041" },
    { "name": "Equipo 2", "score": 2, "clr": "#D35400" },
    { "name": "Equipo 11", "score": 11, "clr": "#D95400" },
    { "name": "Equipo 12", "score": 12, "clr": "#D54400" }
]

const sortList = listTeams.sort((a, b) => a.score - b.score)

function Dashboard() {
    const [count, setCount] = useState(1)
    initializeFirebase()
    return (
        <>
            <div class="p-3 mb-2 bg-secondary-subtle text-emphasis-secondary">
                <h1>Dashboard</h1>
                <p>Here you  will see the podioum of your Brotherhood</p>
                <div className="container text-center">
                    {sortList.map((team, index) => (
                        <div key={index} className="row" style={{ backgroundColor: team.clr }}>
                            <div class="col">{team.name}</div>
                            <div class="col">{team.score}</div>
                        </div>
                    ))}
                </div>
                <div></div>
                <h2>Bottons to edit the BD</h2>
                <p>Here you will control de DataBase</p>
                <div class="container-fluid">
                    <div className="row">
                        {/*<div class="col"> Botton add*
                        <button onClick={() => create(db())}>
                            Add item
                </button>
                </div>*/}
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end"> {/*Ingresar*/}
                            <button class="btn btn-primary me-md-2" type="button">Logg in</button>
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}

export default Dashboard


