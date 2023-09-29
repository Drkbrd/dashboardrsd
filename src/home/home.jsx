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
        //console.log(e.target.name)
        setRoute(e.target.name)
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">ROSARISTA'S WEEK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" name="dashboard" onClick={handleClick}>Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" name="score" onClick={handleClick}>Score</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" name="admin" onClick={handleClick}>Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <div>
                {routes[route]}
            </div>

        </>
    )
}
export default Home