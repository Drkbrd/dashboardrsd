import { useEffect, useState } from 'react'
import { getAllTeams, getAsyncTeams } from '../firebase/teams_repository'
import './style.css'


function Score() {
    const [teams, setTeams] = useState([])
    const [selectedOption, setSelectedOption] = useState("{}");
    function convert(obj) {
        return JSON.parse(obj)
    };

    var handleChange = (selectedOption) => {
        console.log(selectedOption.currentTarget.value);
        setSelectedOption(selectedOption.currentTarget.value);
    };
    useEffect(() => { getAsyncTeams(setTeams) }, [])
    return (
        <>
            <div className="fullBody">
                <div className="card border-danger mb-3; bg-transparent">
                    <div className="card-header">
                        <h1 className="textStyle">ROSARISTA'S WEEK</h1>
                    </div>
                    <div className="card-body text-danger">
                        <div className="text-bg-secondary p-3">
                            <div className="row align-items-center">
                                <div className="col; divSizeTeam">
                                    Team:
                                </div>
                                <div className="col">
                                    <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idTeamSelcted" onChange={handleChange}>
                                        <option defaultValue>Select a team</option>
                                        {teams.map((team) => {
                                            console.log(team)
                                            return <option key={team.id} value={JSON.stringify(team)} > {team.name}</option>

                                        })
                                        }
                                    </select>
                                </div>
                                <div className="col">
                                    <div className="card; bg-transparent">
                                        <div className="card-body; textStyle2">
                                            <p>{convert(selectedOption).chant}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 g-col-6"></div>
                        <div className="text-bg-secondary p-3">
                            <div className="row align-items-center">
                                <div className="col"></div>
                                <div className="col">
                                    <div className="row mb-3">
                                        <div className="col-sm-10; align-self-center">
                                            <input type="chantPoints" className="form-control form-control-sm; bg-transparent" id="floatingInpunt" placeholder="Chant points"></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3 ">
                                        <div className="col-sm-10; align-self-center">
                                            <input type="challengePoints" className="form-control form-control-sm; bg-transparent" id="cfloatingInpunt" placeholder="Challenge points"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>
                        <div className="p-2 g-col-6"></div>
                        <div className="p-2 g-col-6">
                            <button type="button" className="btn btn-outline-primary btn-lg">Send</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Score
