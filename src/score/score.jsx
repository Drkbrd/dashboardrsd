import { useEffect, useId, useState } from 'react'
import { getAllTeams, getAsyncTeams, asignPoints } from '../firebase/teams_repository'
import './style.css'


function Score() {
    function getCurrentDateAndTime() {
        const dateTime = new Date();
        return dateTime.toLocaleString();
    };
    const dateDisplay = getCurrentDateAndTime();
    const dater = new Date(dateDisplay);


    function handleSubmit(e) {
        // Evita que el navegador actualice la página
        e.preventDefault();
        // Lee los datos del formulario
        const form = e.target;
        const formData = new FormData(form);
        // O puedes trabajarlo como un objeto plano:
        const formJson = Object.fromEntries(formData.entries());
        e(selectedOption.currentTarget.value);
        console.log(formJson);

    }
    var handleChange = (selectedOption) => {
        console.log(selectedOption.currentTarget.value);
        setSelectedOption(selectedOption.currentTarget.value);
    };
    const [teams, setTeams] = useState([])
    const chantInputId = useId();
    const challengeInputId = useId();
    const [sendFkSttScor, setFkSttScor] = useState(0); //sendScore nombre variable - setScore nopmbre funcion - actualizador useState es funcioninterna predefinida
    const [plcHldr1, setplcHldr1] = useState("Chant score");
    const [plcHldr2, setplcHldr2] = useState("Challenge score");
    const [sendScoreChn, setScoreChn] = useState(0);
    const [sendScoreCha, setScoreCha] = useState(0);
    var totalScore = parseInt(sendScoreChn) + parseInt(sendScoreCha)
    const [selectedOption, setSelectedOption] = useState("{}");

    function convert(obj) {
        return JSON.parse(obj)
    };

    useEffect(() => { getAsyncTeams(setTeams) }, [])
    //useEffect(() => { asignPoints(sendFkSttScor, sendIdTeam, sendDate, totalScore) }, [])
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Chant points&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <input id={chantInputId} value={sendScoreChn} onChange={e => setScoreChn(e.target.value)} ></input>
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Challenge points</span>
                                                <input id={challengeInputId} value={sendScoreCha} onChange={e => setScoreCha(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">{console.log(convert(selectedOption).id + " esta es la id y la fecha " + dateDisplay)}</div>
                                </div>
                            </div>
                            <div className="p-2 g-col-6"></div>
                            <div className="p-2 g-col-6">
                                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendScores" onClick={() => asignPoints(convert(selectedOption).id, convert(selectedOption).id, dater, totalScore)}>Send</button>
                            </div>
                        </div>

                    </div>
                </div >
            </form>
        </>
    )


}

export default Score
