import { useId, useState, useEffect } from 'react';
import { createTeam, createStation, createUser, getAsyncTeams, updateTeam, deleteTeam, getAsyncUser, deleteUser, updateUser, updateStation, deleteStation, getAsyncStation, getAllStation } from '../firebase/teams_repository'

function AdminControl() {

    //Get date
    function getCurrentDateAndTime() {
        const dateTime = new Date();
        return dateTime.toLocaleString();
    };
    const dateDisplay = getCurrentDateAndTime();
    const dater = new Date(dateDisplay);

    //Block update -------------------------------------------------------------------------------------------------------------------------------
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        //fetch('/some-api', { method: form.method, body: formData });
        // Or you can work with it as a plain object:
        //const formJson = Object.fromEntries(formData.entries());
        //console.log(formJson);
        const formJson = Object.fromEntries(formData.entries());
        e(selectedOption.currentTarget.value);
    }

    function convert(obj) {
        return JSON.parse(obj)
    };
    //Block update -------------------------------------------------------------------------------------------------------------------------------

    //TeamCRUD---------------------------------------------------------------------------------------------------------------------------------
    // Form register team
    const nameInputId = useId();
    const colourInputId = useId();
    const chantInputId = useId();
    const teamInputId = useId();

    //Create team
    function setTeamParam(key, value) {
        var newTeam = {};
        Object.assign(newTeam, team);
        newTeam[key] = value;
        //console.log(newTeam);
        setTeam(newTeam);
        //console.log(newTeam);
    }

    //update team
    async function upsertTeam(team) {
        if (!team["create_at"]) {
            team["create_at"] = toString(dater)
        }
        if (!team["score"]) {
            team["score"] = 0
        }
        if (!team["id"]) {
            await createTeam(team)
        } else {
            await updateTeam(team)
        }
        setTeam({ "color": "#000000", "name": "", "chant": "", "amount": 0, "create_at": dater })

    }
    //Traer tabla teams y eitar
    const [bringTable, setBringTable] = useState([]);
    const [team, setTeam] = useState({});
    useEffect(() => { getAsyncTeams(setBringTable) }, [])
    //TeamCRUD---------------------------------------------------------------------------------------------------------------------------------

    //UserCRUD---------------------------------------------------------------------------------------------------------------------------------
    const userInputNmae = useId();
    const userInputPassword = useId();
    const userInputFalseAdmin = useId();
    const userInputStation = useId();
    const [selectedOption, setSelectedOption] = useState("{}");
    //var conector = "";

    var handleChange = (selectedOption) => {
        //console.log(selectedOption.currentTarget.value.id);
        setSelectedOption(selectedOption.currentTarget.value.id);
    };
    //const idTeamToUser = convert(selectedOption).id;


    //Create User
    function setUserParam(key, value) {
        var newUser = {};
        Object.assign(newUser, user);
        newUser[key] = value;
        setUser(newUser);
        //console.log(newUser)
    }
    //update User
    async function upsertUser(user) {
        if (!user["id"]) {
            await createUser(user)
        } else {
            await updateUser(user)
        }
        setUser({ "is_admin": "", "password": "", "userName": "" })

    }
    //bring table filtered
    function namesFiltere(stationTable) {
        var conector = bringTableStt.filter((e) => e.id === stationTable);
        var nameReturn = conector.map((e) => e.name);
        return nameReturn
    }

    //Traer tabla user y eitar
    const [bringTableUsr, setTableUsr] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => { getAsyncUser(setTableUsr) }, [])
    //UserCRUD---------------------------------------------------------------------------------------------------------------------------------

    //StationCRUD---------------------------------------------------------------------------------------------------------------------------------
    // Form register Station
    const stationInputNmae = useId();
    const stationInputDescription = useId();
    const stationInputMax = useId();
    const stationInputMin = useId();

    //Create Station
    function setStationParam(key, value) {
        var newStation = {};
        Object.assign(newStation, station);
        newStation[key] = value;
        setStation(newStation);
        //console.log(newStation)
    }
    //update Station
    async function upsertStation(station) {
        if (!station["id"]) {
            await createStation(station)
        } else {
            await updateStation(station)
        }
        setStation({ "name": "", "description": "", "maxVal": 0, "minValue": 0 })

    }
    //Traer tabla teams y eitar
    const [bringTableStt, setTableStt] = useState([]);
    const [station, setStation] = useState({});
    useEffect(() => { getAsyncStation(setTableStt) }, [])
    //StationCRUD---------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            {/*Table Teams------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="container text-center">
                <div className="row">
                    {/*<div className="col">ID</div>*/}
                    <div className="col">Name</div>
                    <div className="col">Chant</div>
                    <div className="col">Amount</div>
                    <div className="col">Update</div>
                </div>
            </div>
            <div className="container text-center">
                {bringTable.map((e) => (
                    <div key={e.id} className="row">
                        {/*<div className="col">{e.id}</div>*/}
                        <div className="col">{e.name}</div>
                        <div className="col">{e.chant}</div>
                        <div className="col">{e.amount}</div>
                        <div className="col">
                            <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonUpdateTeam" onClick={() => setTeam(e)}>Edit</button>
                            <button type="submit" className="btn btn-outline-warning btn-lg" id="buttonDeleteTeam" onClick={() => deleteTeam(e)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/*Table Teams------------------------------------------------------------------------------------------------------------------------------*/}
            {/*Form resgister team------------------------------------------------------------------------------------------------------------------------------*/}
            <form id="allForm" onSubmit={handleSubmit}>
                <label htmlFor={colourInputId}>
                    Team's color:
                    <input id={colourInputId} name="colourInputId" type="color" value={team.color} onChange={e => setTeamParam("color", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={nameInputId}>
                    Team's name:
                    <input id={nameInputId} name="nameInputId" type="text" placeholder="Write the teams's name" value={team.name} onChange={e => setTeamParam("name", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={chantInputId}>
                    Team's chant:
                    <input id={chantInputId} name="chantInputId" placeholder="Write the team's chant" type="text" value={team.chant} onChange={e => setTeamParam("chant", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={teamInputId}>
                    Team's members:
                    <input id={teamInputId} name="teamInputId" type="number" value={team.amount} onChange={e => setTeamParam("amount", parseInt(e.target.value))}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendTeam" onClick={() => upsertTeam(team)}>Send</button>
                {/*createTeam(parseInt(teamTotal), teamChant, teamColour, dater, teamName, 0)*/}
            </form>
            {/*Form resgister team------------------------------------------------------------------------------------------------------------------------------*/}
            <hr />
            <hr />
            {/*Table station------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="container text-center">
                <div className="row">
                    {/*<div className="col">ID</div>*/}
                    <div className="col">Name</div>
                    <div className="col">Description</div>
                    <div className="col">Max</div>
                    <div className="col">min</div>
                    <div className="col">Update</div>
                </div>
            </div>
            <div className="container text-center">
                {bringTableStt.map((e) => (
                    <div key={e.id} className="row">
                        {/*<div className="col">{e.id}</div>*/}
                        <div className="col">{e.name}</div>
                        <div className="col">{e.description}</div>
                        <div className="col">{e.maxVal}</div>
                        <div className="col">{e.minValue}</div>
                        <div className="col">
                            <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonUpdateSttn" onClick={() => setStation(e)}>Edit</button>
                            <button type="submit" className="btn btn-outline-warning btn-lg" id="buttonDeleteSttn" onClick={() => deleteStation(e)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/*Table Station------------------------------------------------------------------------------------------------------------------------------*/}
            {/*Form resgister Station-----------------------------------------------------------------------------------------*/}
            <form onSubmit={handleSubmit}>
                <label htmlFor={stationInputNmae}>
                    Station Name:
                    <input id={stationInputNmae} name="SttnName" type="text" placeholder="Write the station's name" value={station.name} onChange={e => setStationParam("name", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputDescription}>
                    Description as step by step:
                    <input id={stationInputDescription} name="DscptnSttn" type="text" placeholder="Write the station's description" value={station.description} onChange={e => setStationParam("description", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMax}>
                    Max points:
                    <input id={stationInputMax} name="MxPnts" type="number" value={station.maxVal} onChange={e => setStationParam("maxVal", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMin}>
                    Min points:
                    <input id={stationInputMin} name="MnPnts" type="number" value={station.minValue} onChange={e => setStationParam("minValue", e.target.value)}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendStation" onClick={() => upsertStation(station)}>Send</button>
            </form>
            {/*Form resgister Station-----------------------------------------------------------------------------------------*/}
            <hr />
            <hr />
            {/*Table Users------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="container text-center">
                <div className="row">
                    {/*<div className="col">ID</div>*/}
                    <div className="col">User name</div>
                    <div className="col">Pasword</div>
                    <div className="col">Is admin</div>
                    <div className="col">Station</div>
                    <div className="col">Update</div>
                </div>
            </div>
            <div className="container text-center">
                {bringTableUsr.map((f) => (
                    <div key={f.id} className="row">
                        {/*<div className="col">{e.id}</div>*/}
                        <div className="col">{f.userName}</div>
                        <div className="col">{f.password}</div>
                        <div className="col">{f.is_admin.toString()}</div>
                        <div className="col">{namesFiltere(f.FK_station)}</div>
                        <div className="col">
                            <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonUpdateUser" onClick={() => setUser(f)}>Edit</button>
                            <button type="submit" className="btn btn-outline-warning btn-lg" id="buttonUpdateUser" onClick={() => deleteUser(f)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/*Table Users------------------------------------------------------------------------------------------------------------------------------*/}
            <hr />
            <hr />
            {/*Form resgister User-----------------------------------------------------------------------------------------------------------------------------------------*/}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor={userInputNmae}>
                    User name:
                    <input id={userInputNmae} name="userName" type="text" placeholder="Write user's name" value={user.userName} onChange={e => setUserParam("userName", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={userInputPassword}>
                    Pasword:
                    <input id={userInputPassword} name="userPasword" type="password" value={user.password} onChange={e => setUserParam("password", e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={userInputFalseAdmin}>
                    Is admin:
                    <input id="falseId" name="adminBoolean" type="radio" value={user.is_admin} onChange={e => setUserParam("is_admin", (e.target.value = true))}></input>
                    <label htmlFor="falseId">True</label><br></br>
                    <input id="trueId" name="adminBoolean" type="radio" value={user.is_admin} onChange={e => setUserParam("is_admin", (e.target.value = false))}></input>
                    <label htmlFor="trueId">False</label><br></br>
                </label>
                <hr />
                <label htmlFor={userInputStation}>
                    Station director:
                    <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example" id="idTeamSelcted" onChange={e => { handleChange; setUserParam("FK_station", convert(e.target.value).id) }}>
                        <option>Select a station</option>
                        {bringTableStt.map((e) => {
                            return <option key={e.id} value={JSON.stringify(e)}>{e.name}</option>
                        })
                        }
                        {/*setUserParam("FK_station", convert(selectedOption).id)*/}
                    </select>
                    {/*<input id={userInputStation} name="stationDirector" type="text" value={user.FK_station} onChange={e => setUserParam("FK_station", e.target.value)}></input>*/}
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendUsear" onClick={() => upsertUser(user)}>Send</button>
                <hr />
                <hr />
            </form>
            {/*Form resgister User-----------------------------------------------------------------------------------------------------------------------------------------*/}
        </>
    );

}

export default AdminControl