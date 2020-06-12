import React from 'react';
import './Components.css';
import {navigate} from '@reach/router';

const Profile = props => {

    const signOut = (e) => {
        localStorage.clear();
        navigate("/tough-choices");
    }
    const { user } = props;
    return (
        <div className="card col-12 col-lg-3 ">
            <div className="card-body">
                <div className="d-flex justify-content-around">
                    <h4 className="card-title">{user.name}</h4>
                    <p className="avatar text-center" style={{fontSize: "100%",backgroundColor: user.color}}>{user.initials}</p>

                </div>
                    <button 
                        className="btn btn-primary"
                        onClick={signOut}
                    >Sign Off</button>
                <div id="stats">
                    <h4 className="card-title">Current HouseHold:</h4>
                    <p className="card-title green">You</p>
                    <p className={user.teen ? "green card-title": "red card-title"}>Your Teen</p>
                    <p className={user.twins ? "green card-title": "red card-title"}>Your Twins</p>
                    <p className={user.dog ? "green card-title": "red card-title"}>Your Dog</p>
                </div>
                <div id="resources">
                    <h4 className="card-title">Resources:</h4>
                    <p className="card-text">Money: {user.money}</p>
                    <progress max="35" value={user.money}></progress>
                    <p className="card-text">Good Will: {user.goodWill}</p>
                    <progress max="35" value={user.goodWill}></progress>
                    <button 
                        className="btn btn-danger btn-outline-warning"
                        onClick={props.handlePayDayPopUp}
                    >PayDay Loan</button>
                </div>
                
            </div>
        </div>
    );
}

export default Profile;