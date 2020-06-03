import React,{useContext,useEffect,useState} from 'react';
import Profile from '../components/Profile';
import ToughChoice from '../components/ToughChoice';
import TCContext from '../contexts/TcContext';
import axios from 'axios';


const Game = props => {
    const context = useContext(TCContext);
    console.log("This is user Id",context.userId);
    const [users, setUsers] = useState([
        {
            name: "Melissa Picciola",
            initials: "MP",
            color: "#ff00ff",
            teen: true,
            twins: true,
            dog: true,
            money: 34,
            goodWill: 18,
            paydayLoan: 0,
            position: "home",
            choices:[]
        }
    ]);
    // useEffect(()=> {
    //     axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${context.tcId}`)
    //         .then(res => {
    //             console.log(res.data)
    //             var temp = res.data.users.filter( u => u._id === context.userId );
    //             console.log(temp)
    //             setUser(temp)

    //         })
    //         .catch(err => console.log(err))
    // },[context])



    return (
        <div className="row justify-content-around p-5">
            <ToughChoice users={users} />
            {
                users ? 
                    <Profile user={users[0]}/> : null
            }
        </div>
    );
}

export default Game;