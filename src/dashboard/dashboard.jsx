import { useState } from 'react'

const listTeams = [
    { "name": "Equipo 8", "score": 8 },
    { "name": "Equipo 4", "score": 4 },
    { "name": "Equipo 1", "score": 1 },
    { "name": "Equipo 5", "score": 5 },
    { "name": "Equipo 7", "score": 7 },
    { "name": "Equipo 3", "score": 3 },
    { "name": "Equipo 10", "score": 10 },
    { "name": "Equipo 6", "score": 6 },
    { "name": "Equipo 9", "score": 9 },
    { "name": "Equipo 2", "score": 2 }
]

const sortList = listTeams.sort((a, b) => a.score - b.score)

function Dashboard() {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>Dashboard</h1>
            <p>Here you  will see the podioum of your Brotherhood</p>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortList.map((team, index) => (
                        <tr key={index}>
                            <td>{team.name}</td>
                            <td>{team.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default Dashboard
