import { useState } from 'react'
import './style.css'

const listTeams = [
    { "name": "Equipo 8", "score": 8, "clr": "#239B56" },
    { "name": "Equipo 4", "score": 4, "clr": "#A6ACAF" },
    { "name": "Equipo 1", "score": 1, "clr": "#A6BCAF" },
    { "name": "Equipo 5", "score": 5, "clr": "#A6AHAF" },
    { "name": "Equipo 7", "score": 7, "clr": "#A6A9AF" },
    { "name": "Equipo 3", "score": 3, "clr": "#A6AZAF" },
    { "name": "Equipo 10", "score": 10, "clr": "#A8ACAF" },
    { "name": "Equipo 6", "score": 6, "clr": "#A6A6AF" },
    { "name": "Equipo 9", "score": 9, "clr": "#A6AEAF" },
    { "name": "Equipo 2", "score": 2, "clr": "#A6ARAF" }
]

const sortList = listTeams.sort((a, b) => a.score - b.score)

function Dashboard() {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>Dashboard</h1>
            <p>Here you  will see the podioum of your Brotherhood</p>
            <div class="container text-center">
                {sortList.map((team, index) => (
                    <div key={index} class="row" style={{ backgroundColor: team.clr }}>
                        <div class="col">{team.name}</div>
                        <div class="col">{team.score}</div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Dashboard
