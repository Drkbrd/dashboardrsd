import { useId, useState } from 'react';
import { createTeam } from '../firebase/teams_repository'

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

    // Form register team
    const [teamName, setTeamName] = useState("");
    const [teamColour, setTeamColour] = useState("#rrggbb");
    const [teamChant, setTeamChant] = useState("");
    const [teamTotal, setTeamTotal] = useState(0);

    //FOrm refister team
    const [stationName, setstationName] = useState("");
    const [stationDescr, setstationDescr] = useState("");
    const [stationMAX, setstationMAX] = useState(0);
    const [stationMin, setstationMin] = useState(0);

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

    return (
        <>
            {/*Form resgister team*/}
            <form method='post' onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendScores" onContextMenu={handleSubmit} onClick={() => createTeam(parseInt(teamTotal), teamChant, teamColour, dater, teamName, 0)}>Send</button>
            </form>
            <hr />
            {/*Form resgister Station*/}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor={stationInputNmae}>
                    Station Name:
                    <input id={stationInputNmae} name="SttnName" type="color" placeholder="Write the station's name" value={teamColour} onChange={e => setTeamColour(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputDescription}>
                    Description as step by step:
                    <input id={stationInputDescription} name="DscptnSttn" type="text" placeholder="Write the station's description" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMax}>
                    Max points:
                    <input id={stationInputMax} name="MxPnts" type="number" placeholder="Write the min score allowed" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
                </label>
                <hr />
                <label htmlFor={stationInputMin}>
                    Min points:
                    <input id={stationInputMin} name="MnPnts" type="number" placeholder="Write the min score allowed" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
                </label>
                <hr />
                <button type="submit" className="btn btn-outline-primary btn-lg" id="buttonSendScores" onContextMenu={handleSubmit} onClick={() => createTeam(parseInt(teamTotal), teamChant, teamColour, dater, teamName, 0)}>Send</button>
            </form>
        </>
    );
}
export default AdminControl