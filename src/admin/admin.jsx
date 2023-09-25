import { useId, useState, useEffect } from 'react';
import { createTeam, createStation, createUser, getEditTeams } from '../firebase/teams_repository'

function AdminControl() {

    function getCurrentDateAndTime() {
        const dateTime = new Date();
        return dateTime.toLocaleString();
    };
    const dateDisplay = getCurrentDateAndTime();
    const dater = new Date(dateDisplay);

    // Form register team
    const nameInputId = useId();
    const colourInputId = useId();
    const chantInputId = useId();
    const teamInputId = useId();

    // Form register Station
    const stationInputNmae = useId();
    const stationInputDescription = useId();
    const stationInputMax = useId();
    const stationInputMin = useId();

    // Form register User
    const userInputNmae = useId();
    const userInputPassword = useId();
    const userInputFalseAdmin = useId();
    const userInputStation = useId();

    // Form register team
    const [teamName, setTeamName] = useState("");
    const [teamColour, setTeamColour] = useState("#rrggbb");
    const [teamChant, setTeamChant] = useState("");
    const [teamTotal, setTeamTotal] = useState(0);

    //FOrm register Station
    const [stationName, setStationName] = useState("");
    const [stationDescr, setStationDescr] = useState("");
    const [stationMAX, setStationMAX] = useState(0);
    const [stationMin, setStationMin] = useState(0);

    //FOrm register Station
    const [userName, setUserName] = useState("");
    const [password, setPasword] = useState("");
    const [isAdmin, setAdmin] = useState("");
    const isTrueSet = (isAdmin === 'true');
    const [stationFK, setStationFk] = useState("");

    //Traer tabla
    const [bringTable, setBringTable] = useState([]);
    useEffect(() => { getEditTeams(setBringTable) }, [])

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        //console.log(formJson);
    }
    /*
    function reset() {
        useState.setTeamName
            setTeamColour.useState("#rrggbb"),
            setTeamChant.useState(""),
            setTeamTotal.useState(0),
            setStationName.useState(""),
            setStationDescr.useState(""),
            setStationMAX.useState(0),
            setStationMin.useState(0),
            setUserName.useState(""),
            setPasword.useState(""),
            setAdmin.useState(""),
            setStationFk.useState("")

    }*/

    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col">ID</div>
                    <div className="col">Name</div>
                    <div className="col">Chant</div>
                    <div className="col">Amount</div>
                </div>
            </div>
            <div className="container text-center">
                {bringTable.map((e) => (
                    <div key={e.id} className="row">
                        <div className="col">{e.id}</div>
                        <div className="col">{e.name}</div>
                        <div className="col">{e.chant}</div>
                        <div className="col">{e.amount}</div>
                    </div>
                ))}
            </div>
            {/*Form resgister team*/}
            <form method='post' onSubmit={handleSubmit} id="allForm">
                <label htmlFor={colourInputId}>
                    Team's color:
                    <input id={colourInputId} name="colourInputId" type="color" value={teamColour} onChange={e => setTeamColour(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={nameInputId}>
                    Team's name:
                    <input id={nameInputId} name="nameInputId" type="text" placeholder="Write the teams's name" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={chantInputId}>
                    Team's chant:
                    <input id={chantInputId} name="chantInputId" placeholder="Write the team's chant" type="text" value={teamChant} onChange={e => setTeamChant(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={teamInputId}>
                    Team's members:
                    <input id={teamInputId} name="teamInputId" type="number" value={teamTotal} onChange={e => setTeamTotal(e.target.value)}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendTeam" onContextMenu={handleSubmit} onClick={() => createTeam(parseInt(teamTotal), teamChant, teamColour, dater, teamName, 0)}>Send</button>
            </form>
            <hr />
            <hr />
            {/*Form resgister Station*/}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor={stationInputNmae}>
                    Station Name:
                    <input id={stationInputNmae} name="SttnName" type="text" placeholder="Write the station's name" value={stationName} onChange={e => setStationName(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputDescription}>
                    Description as step by step:
                    <input id={stationInputDescription} name="DscptnSttn" type="text" placeholder="Write the station's description" value={stationDescr} onChange={e => setStationDescr(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMax}>
                    Max points:
                    <input id={stationInputMax} name="MxPnts" type="number" value={stationMAX} onChange={e => setStationMAX(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMin}>
                    Min points:
                    <input id={stationInputMin} name="MnPnts" type="number" value={stationMin} onChange={e => setStationMin(e.target.value)}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendStation" onContextMenu={handleSubmit} onClick={() => createStation(stationName, stationDescr, parseInt(stationMAX), parseInt(stationMin))}>Send</button>
            </form>
            <hr />
            <hr />
            {/*Form resgister User*/}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor={userInputNmae}>
                    User name:
                    <input id={userInputNmae} name="userName" type="text" placeholder="Write user's name" value={userName} onChange={e => setUserName(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={userInputPassword}>
                    Pasword:
                    <input id={userInputPassword} name="userPasword" type="password" value={password} onChange={e => setPasword(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={userInputFalseAdmin}>
                    Is admin:
                    <input id="falseId" name="adminBoolean" type="radio" value="true" onChange={e => setAdmin(e.target.value)}></input>
                    <label htmlFor="falseId">True</label><br></br>
                    <input id="trueId" name="adminBoolean" type="radio" value="false" onChange={e => setAdmin(e.target.value)}></input>
                    <label htmlFor="trueId">False</label><br></br>
                </label>
                <hr />
                <label htmlFor={userInputStation}>
                    Station director:
                    <input id={userInputStation} name="stationDirector" type="text" value={stationFK} onChange={e => setStationFk(e.target.value)}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendUsear" onContextMenu={handleSubmit} onClick={() => createUser(userName, password, isTrueSet, stationFK)}>Send</button>
                <hr />
                <hr />
            </form>
        </>
    );

}



export default AdminControl