import { useEffect, useId, useState } from 'react'
import { getAllTeams, getAsyncTeams, getAsyncStation, updateTeam, createTeam } from '../firebase/teams_repository'
import './style.css'




function Score() {

    //Add date___________________________________________________________________________________________________________________________
    function getCurrentDateAndTime() {
        const dateTime = new Date();
        return dateTime.toLocaleString();
    };
    const dateDisplay = getCurrentDateAndTime();
    const dater = new Date(dateDisplay);
    //Add date___________________________________________________________________________________________________________________________

    //Block Update___________________________________________________________________________________________________________________________
    function handleSubmit(e) {
        // Evita que el navegador actualice la página
        e.preventDefault();
        // Lee los datos del formulario
        const form = e.target;
        const formData = new FormData(form);
        // O puedes trabajarlo como un objeto plano:
        const formJson = Object.fromEntries(formData.entries());
        e(selectedOption.currentTarget.value);
        //console.log(formJson + "handleSubmit here");
    }

    function convert(obj) {
        return JSON.parse(obj)
    };
    //Block Update___________________________________________________________________________________________________________________________



    //Bring Station info___________________________________________________________________________________________________________________________
    const [station, setTableStt] = useState([])

    function stationFilterDescription(stationTable) {
        var conector = bringTableStt.filter((e) => e.id === stationTable);
        var descrReturn = conector.map((e) => e.description);
        return descrReturn,
            console.log(descrReturn + "stationFilterDescription");
    }
    function stationFilterName(stationTable) {
        var conector = bringTableStt.filter((e) => e.id === stationTable);
        var nameReturn = conector.map((e) => e.name);
        return nameReturn,
            console.log(nameReturn + "stationFilterName");
    }
    //Bring Station info___________________________________________________________________________________________________________________________

    //Bring Team's info___________________________________________________________________________________________________________________________
    /*Codigo anterior 
    const [teams, setTeams] = useState([])
    const chantInputId = useId();
    const challengeInputId = useId();
    const [sendFkSttScor, setFkSttScor] = useState(0); //sendScore nombre variable - setScore nopmbre funcion - actualizador useState es funcioninterna predefinida

    const [sendIdTeam, setIdTeam] = useState("");
    const [sendDate, setDate] = useState("");
    const [sendScoreChn, setScoreChn] = useState(0);
    const [sendScoreCha, setScoreCha] = useState(0);
    var totalScore = parseInt(sendScoreChn) + parseInt(sendScoreCha)
    const [selectedOption, setSelectedOption] = useState("{}");
    */

    const [selectedOption, setSelectedOption] = useState("{}");
    const [teams, setTeams] = useState([])


    var handleChange = (selectedOption) => {
        //console.log(selectedOption.currentTarget.value);
        setSelectedOption(selectedOption.currentTarget.value);
    };

    //Create Station why? No estoy creadno nuevo
    /*
    function setTeamParam(key, value) {
        var newTeam = {};
        Object.assign(newTeam, team);
        newTeam[key] = value;
        setTeam(newTeam);
        console.log(newTeam)
    }*/

    //update Team
    async function upsertTeam(team) {
        await updateTeam(team)
        setTeam({ "name": "", "score": 0 }) //esto se la puiedo enviar a las dos

    }

    //Traer tabla teams y eiditar_________________________________________________________________________________________________________________

    const [bringTeam, setTeam] = useState({});
    useEffect(() => { getAsyncStation(setTableStt) }, [])
    useEffect(() => { getAsyncTeams(setTeams) }, [])
    //Traer tabla teams y eiditar_________________________________________________________________________________________________________________




    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="fullBody">
                    <div className="card border-danger mb-3; bg-transparent">
                        <div className="card-header">
                            <h1 className="textStyle">ROSARISTA'S WEEK</h1>
                        </div>
                        <div className="card-body text-danger; ">
                            {/*Here to selct Station----------------------------------------------------------------------------------------------------------------------*/}
                            <div className="row align-items-center">
                                <div className="row">
                                    <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idStationSelect" onChange={handleChange}>
                                        <option defaultValue>Select a team</option>
                                        {station.map((station) => {
                                            return <option key={station.id} value={JSON.stringify(station)} > {station.name}</option>
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="container; align-items-center">
                            <div className="row">
                                <div className="col">
                                    <p>{convert(selectedOption).name}</p>
                                </div>
                                <div className="col">
                                    <p>{convert(selectedOption).description}</p>
                                </div>
                            </div>
                        </div>


                        {/*Here to selct Station----------------------------------------------------------------------------------------------------------------------*/}

                        <div className="card-body text-danger; ">
                            {/*Here to selct team---------------------------------------------------------------------------------------------------------------------- */}
                            <div className="text-bg-secondary p-3; row align-items-center">
                                <div className="col; divSizeTeam">
                                    Team:
                                </div>
                                <div className="col">
                                    <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idTeamSelcted" onChange={(e) => { handleChange; setTeamParam("created_at", dateDisplay); setSelectedOption(e.target.value).id }}>
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
                            <div className="p-2 g-col-6"></div>
                            <div className="text-bg-secondary p-3">
                                <div className="row align-items-center">
                                    <div className="col"></div>

                                    <div className="col">
                                        <div className="row mb-3">
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Chant points&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                {/*<input id={chantInputId} value={sendScoreChn} onChange={e => setScoreChn(e.target.value)} ></input>¨*/}
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                            <div className="col-sm-10; align-self-center; input-group">
                                                <span className="input-group-text">Challenge points</span>
                                                {/*<input id={challengeInputId} value={sendScoreCha} onChange={e => setScoreCha(e.target.value)}></input>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">{/*console.log(convert(selectedOption).id + " esta es la id y la fecha " + dateDisplay)*/}</div>
                                </div>
                            </div>
                            {/*Here to selct Team----------------------------------------------------------------------------------------------------------------------*/}
                            <div className="p-2 g-col-6"></div>
                            <div className="p-2 g-col-6">
                                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendScores" onClick={() => upsertStation(team)}>Send</button>
                            </div>
                        </div>

                    </div>
                </div >
            </form >
        </>
    )


}

export default Score
