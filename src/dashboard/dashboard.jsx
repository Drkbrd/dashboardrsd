import { useEffect, useState } from 'react'
import './style.css'
import { db, app } from '../firebase/firebase_config.jsx'
import { create } from './create.jsx'
import { getAllTeams, getAsyncTeams, getScoreById, getAsyncScore } from '../firebase/teams_repository'

/*
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

const sortList = listTeams.sort((a, b) => a.score - b.score)*/

function Dashboard() {
    const [count, setCount] = useState(1)
    const [teams, setTeams] = useState([])
    //getAllTeams()
    useEffect(() => { getAsyncScore(setTeams) }, [])
    return (
        <>
            <div className="p-3 mb-2 bg-dark text-white; fullBody">
                <h1 className="textStyle">Rosarist's week podioum</h1>
                <div className="container text-center">
                    {teams.sort((a, b) => b.score - a.score).map((team) => (
                        <div key={team.id} className="row" style={{ backgroundColor: team.color }}>
                            <div className="col">{team.name}</div>
                            <div className="col">{team.score}</div>
                        </div>
                    ))}
                </div>
                <div></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end"> {/*Ingresar*/}</div>
                    </div>
                    <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        Login
                    </a>
                    <div className="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Register scores</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div>
                                Use the password given by Technology Area.
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                        </div>
                    </div>
                </div >
            </div >


        </>
    )
}

export default Dashboard


