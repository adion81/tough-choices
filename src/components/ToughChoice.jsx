import React,{useState} from 'react';
import HouseCard from './HouseCard';

const ToughChoice = props => {
    const [houses] = useState([
        {
            id : "home",
            title:"House(Subsidized)",
            houseHold: "You, Your Teen, Your Twins, Your Dog",
            costGreen: 2,
            costYellow: 0
        },
        {
            id : "car",
            title:"Sleeping In Car",
            houseHold: "You, Your Teen, Your Twins, Your Dog",
            costGreen: 1,
            costYellow: 0
        },
        {
            id: "apartment",
            title:"Private Apartment",
            houseHold: "You, Your Teen, Your Twins, Your Dog",
            costGreen: 4,
            costYellow: 0
        },
        {
            id:"friend",
            title:"Friend/Family",
            houseHold: "You, Your Teen, Your Twins",
            costGreen: 1,
            costYellow: 1
        },
        {
            id:"hotel",
            title:"Single Room Hotel",
            houseHold: "You",
            costGreen: 1,
            costYellow: 2
        },
        {
            id:"shelter",
            title:"Family Shelter",
            houseHold: "You, Your Twins",
            costGreen: 2,
            costYellow: 0
        }
    ])

    
    return (
        <div className="col-lg-8 col-12 d-flex flex-wrap justify-content-around text-dark">
            {
                houses.map((h,i) => <HouseCard  
                                        key={i} 
                                        title={h.title} 
                                        costGreen={h.costGreen} 
                                        costYellow={h.costYellow} 
                                        houseHold={h.houseHold}
                                        users={props.users.filter(u => u.position === h.id)}
                                        handleMovePopUp={props.handleMovePopUp}
                                        id={h.id}
                                    />)
            }
        </div>
    );

}

export default ToughChoice;