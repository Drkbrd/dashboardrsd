import { useState } from 'react'
import Dashboard from '../dashboard/dashboard'
import Score from '../score/score'
import Admin from '../admin/admin'

function Home() {
    const [route, setRoute] = useState('score')
    const routes = {
        dashboard: Dashboard(),
        score: Score(),
        admin: Admin()
    }

    function handleClick(e) {
        e.preventDefault()
        console.log(e.target.name)
        setRoute(e.target.name)
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">ROSARISTA'S WEEK</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" name="dashboard" onClick={handleClick}>Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" name="score" onClick={handleClick}>Score</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" name="admin" onClick={handleClick}>Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <body>
                {routes[route]}
            </body>
        </>
    )
}
export default Home