import React from 'react';
import './Components.css';
import Avatar from './Avatar';

const Profile = props => {
    const { user } = props;
    return (
        <div className="card col-12 col-lg-3 ">
            <div className="card-body">
                <div className="d-flex justify-content-around">
                    <h4 className="card-title">{user.name}</h4>
                    <Avatar initials={user.initials} color={user.color}/>

                </div>
                <div id="stats">
                    <h4 className="card-title">Current HouseHold:</h4>
                    <p className="card-title green">You</p>
                    <p className={user.teen ? "green card-title": "card-title"}>Your Teen</p>
                    <p className={user.twins ? "green card-title": "card-title"}>Your Twins</p>
                    <p className={user.dog ? "green card-title": "card-title"}>Your Dog</p>
                </div>
                <div id="resources">
                    <h4 className="card-title">Resources:</h4>
                    <p className="card-text">Money: {user.money}</p>
                    <progress max="35" value={user.money}></progress>
                    <p className="card-text">Good Will: {user.goodWill}</p>
                    <progress max="35" value={user.goodWill}></progress>
                </div>
                
            </div>
        </div>
    );
}

export default Profile;