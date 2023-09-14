import './style.css'

function Score() {
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
                                    <select className="form-select form-select-sm; bg-transparent" aria-label="Small select example">
                                        <option selected>Select a team</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <div className="card; bg-transparent">
                                        <div className="card-body; textStyle2">
                                            <p className="lead">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 g-col-6">
                            <div className="col"></div>
                            <div className="col"><div className="col"><div className="text-bg-secondary p-3">
                                <div className="row mb-3">
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control form-control-sm; bg-transparent" id="chantPoints" placeholder="Chant points"></input>
                                    </div>
                                </div>
                                <div className="row mb-3 ">
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control form-control-sm; bg-transparent" id="challengePoint" placeholder="Challenge points"></input>
                                    </div>
                                </div>
                            </div>
                            </div>
                                <div className="col"></div>
                                <div className="p-2 g-col-6"></div>
                                <button type="button" className="btn btn-outline-primary btn-lg">Send</button>
                            </div>
                        </div>
                    </div>
                </>
                )
}

                export default Score
