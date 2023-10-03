import { useEffect, useId, useState } from 'react'
import { getAllTeams, getAsyncTeams, getAsyncStation, getStationFiltered, asignPoints, getAsyncUser } from '../firebase/teams_repository'
import './style.css'
import { connectFirestoreEmulator } from 'firebase/firestore';




function Score(logOut, currentUser) {

    function convert(obj) {
        return JSON.parse(obj)
    };

    //Add date___________________________________________________________________________________________________________________________
    function getCurrentDateAndTime() {
        const dateTime = new Date();
        return dateTime;
    };
    const dateDisplay = getCurrentDateAndTime();
    //console.log(dateDisplay)
    const dater = new Date(dateDisplay);
    //Add date___________________________________________________________________________________________________________________________

    //Block Update___________________________________________________________________________________________________________________________
    function handleSubmit(e) {
        // Evita que el navegador actualice la página
        e.preventDefault();
        /* Lee los datos del formulario
        const form = e.target;
        const formData = new FormData(form);
        // O puedes trabajarlo como un objeto plano:
        const formJson = Object.fromEntries(formData.entries());
        e(selectedOption.currentTarget.value);
        //console.log(formJson + "handleSubmit here");*/
    }


    //Block Update___________________________________________________________________________________________________________________________

    //Bring User info___________________________________________________________________________________________________________________________
    const [user, setTableUser] = useState([])
    const [selectedOptionUser, setSelectedOptionUser] = useState("{}")
    var handleChangeUsr = (ed) => {
        setSelectedOptionUser(ed.currentTarget.value);
    };
    //Bring user info___________________________________________________________________________________________________________________________

    //Bring Station info___________________________________________________________________________________________________________________________
    const [station, setTableStt] = useState([])
    const [selectedOptionStt, setSelectedOptionStt] = useState("{}")
    const challengeInputId = useId();

    var handleChangeStt = (ed) => {
        //console.log(ed + "entreaqupi");
        setSelectedOptionStt(ed.currentTarget.value);
    };

    function stationFilterDescription(stationTable) {
        var conector = bringTableStt.filter((e) => e.id === stationTable);
        var descrReturn = conector.map((e) => e.description);
        return descrReturn
        //console.log(descrReturn + "stationFilterDescription");
    }
    function stationFilterName(stationTable) {
        var conector = bringTableStt.filter((e) => e.id === stationTable);
        var nameReturn = conector.map((e) => e.name);
        return nameReturn
        //console.log(nameReturn + "stationFilterName");
    }
    //Bring Station info___________________________________________________________________________________________________________________________
    //Bring Team's info___________________________________________________________________________________________________________________________
    const chantInputId = useId();
    const [selectedOption, setSelectedOption] = useState("{}");
    const [teams, setTeams] = useState([])



    var handleChange = (paramT) => {
        //console.log(paramT + "Entre a paramT");
        setSelectedOption(paramT.currentTarget.value);
    };

    //Create Station why? No estoy creadno nuevo
    function setScoreParam(key, value) {
        var newScore = {};
        Object.assign(newScore, score);
        newScore[key] = value;
        setScore(newScore);
        //console.log(newScore)
    }


    //Traer tabla teams y eiditar_________________________________________________________________________________________________________________
    const [bringTeam, setTeam] = useState({});
    useEffect(() => { getAsyncStation(setTableStt) }, [])
    useEffect(() => { getAsyncTeams(setTeams) }, [])
    useEffect(() => { getAsyncUser(setTableUser) }, [])
    useEffect(() => { getStationFiltered(selectedOptionUser) }, [])
    //Traer tabla teams y eiditar_________________________________________________________________________________________________________________

    //Create scores_______________________________________________________________________________________________________________________________
    //Codigo anterior 

    //
    //
    //const [sendFkSttScor, setFkSttScor] = useState(0); //sendScore nombre variable - setScore nopmbre funcion - actualizador useState es funcioninterna predefinida
    //const [sendIdTeam, setIdTeam] = useState("");
    //const [sendDate, setDate] = useState("");

    const [sendScoreChn, setScoreChn] = useState(0);
    const [sendScoreCha, setScoreCha] = useState(0);
    var totalScore = parseInt(sendScoreChn) + parseInt(sendScoreCha)
    //console.log(totalScore)
    //const [selectedOption, setSelectedOption] = useState("{}");
    const [score, setScore] = useState([])


    async function upsertScore(score) {
        score["created_at"] = dater
        score["score"] = totalScore
        score["fk_user"] = convert(currentUser).id
        //console.log(convert(currentUser).id)
        await asignPoints(score)
        setScoreChn(0)
        setScoreCha(0)
        // setScore({ "created_at": dater.toString() })
        //setScoreParam("score", totalScore) 

    }
    //Create scores_______________________________________________________________________________________________________________________________

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="fullBody">
                    <div className="card border-danger mb-3; bg-transparent">
                        <div className="card-header">
                            <h1 className="textStyle">ROSARISTA'S WEEK</h1>
                        </div>
                        <div>

                        </div>
                        <div className="card-body text-danger; ">
                            <div className="text-bg-secondary p-3">
                                {/*Here to selct Station----------------------------------------------------------------------------------------------------------------------*/}
                                <div className="row align-items-center">
                                    <div className="row">
                                        <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idStationSelect" onChange={(e) => { handleChangeStt; setSelectedOptionStt(e.target.value); setScoreParam("fk_station", convert(e.target.value).id) }}>
                                            <option defaultValue>Select a Station</option>
                                            {station.map((station) => {
                                                return <option key={station.id} value={JSON.stringify(station)} > {station.name}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="container; align-items-center">
                                    <div className="row">
                                        <div className="col; align-items-center">
                                            <p>{convert(selectedOptionStt).description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Here to selct Station----------------------------------------------------------------------------------------------------------------------*/}
                        <div className="card-body text-danger; ">
                            {/*Here to selct team---------------------------------------------------------------------------------------------------------------------- */}
                            <div className="text-bg-secondary p-3">
                                <div className="text-bg-secondary p-3; row align-items-center">
                                    <div className="col; divSizeTeam">
                                        Team:
                                    </div>
                                    <div className="col">
                                        <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idTeamSelcted" onChange={(e) => { handleChange; setSelectedOption(e.target.value); setScoreParam("fk_team", convert(e.target.value).id) }}>
                                            <option defaultValue>Select a team</option>
                                            {teams.map((team) => {
                                                return <option key={team.id} value={JSON.stringify(team)}>{team.name}</option>
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
                            {/*Here to selct Team----------------------------------------------------------------------------------------------------------------------*/}
                            {/*Here to selct Create Points----------------------------------------------------------------------------------------------------------------------*/}
                            <div className="p-2 g-col-6"></div>
                            <div className="text-bg-secondary p-3">
                                <div className="row align-items-center">
                                    <div className="col"></div>
                                    <div className="col">
                                        <div className="row mb-3">
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Chant points&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <input type="number" id={chantInputId} value={sendScoreChn} onChange={e => setScoreChn(e.target.value)} ></input>
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Challenge points</span>
                                                <input type="number" id={challengeInputId} value={sendScoreCha} onChange={e => setScoreCha(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                            <div className="p-2 g-col-6"></div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-success btn-lg" id="buttonSendScores" onClick={e => upsertScore(score)}>Send</button>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success btn-lg" id="loggout" onClick={e => logOut()}>Logout</button>
                </div>
            </form >
        </>
    )

    // onChange={console.log(setScoreParam("score", parseInt(sendScoreCha) + parseInt(sendScoreChn)))}
}

export default Score
