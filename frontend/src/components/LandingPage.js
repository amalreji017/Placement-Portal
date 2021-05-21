import React from 'react';
import '../App.css';
function LandingPage() {
    return (
        <div className="landing">
            <header className="App-header" >
                 <h1>MITS PLACEMENT PORTAL</h1>
                <a href="/login"> <button type="button" className="btn btn-secondary">LOGIN</button></a>
                <a href="../../resume/cse/2018/18cs052.pdf" download> <button type="button" className="btn btn-secondary">download</button></a>
            </header>
        </div>
    );
}
export default LandingPage;