import React from 'react';
import Avatar from './Avatar';

const HouseCard = props => {
    const {title,costGreen, costYellow,houseHold,users,id,handleMovePopUp} = props;
    return (
        <div onClick={(e) => handleMovePopUp(e,id,costGreen,costYellow)} style={{height: "300px"}}className="card p-0 col-3 mx-1 my-2 mx-lg-2 my-lg-4">
            <div className="card-header">
                <h6 className="card-title">{title}</h6>
            </div>
            
            <div className="card-body">
                <p className="card-text">Cost:<br></br> <span className="text">{costGreen} Greens & {costYellow} Yellows</span></p>
                <p className="card-text">Household:<br></br> <span>{houseHold}</span></p>
            </div>
            <div className="card-footer">
                {
                    users.map((u,i) => <Avatar 
                                            key={i} 
                                            initials={u.initials} 
                                            color={u.color}
                                            users={users}
                                        />)
                }
            </div>
        </div>
    );
}

export default HouseCard;