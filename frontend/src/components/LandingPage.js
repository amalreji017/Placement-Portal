import React from 'react';
import '../App.css';
function LandingPage() {
    return (
        <div className="landing">
            <header className="App-header" >
                 <h1>MITS PLACEMENT PORTAL</h1>
                <a href="/login"> <button type="button" class="btn btn-secondary">LOGIN</button></a>
            </header>
        </div>
    );
}
export default LandingPage;