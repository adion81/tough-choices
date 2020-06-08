import React,{useContext,useEffect,useState} from 'react';
import Profile from '../components/Profile';
import ToughChoice from '../components/ToughChoice';
import TCContext from '../contexts/TcContext';
import Decision from '../components/Decision';
import axios from 'axios';
import io from 'socket.io-client';



const Game = props => {
    const [socket] = useState(() => io(`http://${process.env.REACT_APP_IP_ADDRESS}:8000`));
    const [chose,setChose] = useState(false);
    const context = useContext(TCContext);
    const [tc,setTC] = useState(null);
    const [isDeciding] = useState(false);
    const [user, setUser] = useState([
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
    socket.on("update-tc", data => {
        console.log(data.id)
        handleUpdateTC(data.id)
    })

    const handleUpdateTC = (id) => {
        if(tc === null){
            return;
        }
        else{
            if(tc._id !== id){
                return;
            }
            else{
                axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${id}`)
                    .then(res => setTC(res.data))
                    .catch(err => console.log(err));
            }
        }
    }
    const handleHouseMove = (e, id) => {
        console.log(id);
        const temp = {...user};
            if(id ==="home"){
                temp.position = "home";
                temp.teen = true;
                temp.twins = true;
                temp.dog = true;
                if(user.money < 2){
                    temp.money = 0;
                }
                else{
                    temp.money -= 2;
                }
                
            }
            else if(id === "car"){
                temp.position = "car";
                temp.teen = true;
                temp.twins = true;
                temp.dog = true;
                if(user.money < 1){
                    temp.money = 0;
                }
                else{
                    temp.money -= 1;
                }
                
            }
            else if(id === "apartment"){
                temp.position = "apartment";
                temp.teen = true;
                temp.twins = true;
                temp.dog = true;
                if(user.money < 4){
                    temp.money = 0;
                }
                else{
                    temp.money -= 4;
                }
            }
            else if(id === "friend"){
                temp.position = "friend";
                temp.teen = true;
                temp.twins = true;
                temp.dog = false;
                if(user.money < 1){
                    temp.money = 0;
                }
                else{
                    temp.money -= 1;
                }
                if(user.goodWill < 1){
                    temp.goodWill = 0;
                }
                else{
                    temp.goodWill -= 1;
                }
                    
            }
            else if(id === "hotel"){
                temp.position = "hotel";
                temp.teen = false;
                temp.twins = false;
                temp.dog = false;
                if(user.money < 1){
                    temp.money = 0;
                }
                else{
                    temp.money -= 1;
                }
                if(user.goodWill < 2){
                    temp.goodWill = 0;
                }
                else{
                    temp.goodWill -= 2;
                }
                
            }
            else if(id === "shelter"){
                temp.position = "shelter";
                temp.teen = false;
                temp.twins = true;
                temp.dog = false;
                if(user.money < 2){
                    temp.money = 0;
                }
                else{
                    temp.money -= 2;
                }
                
            }
        console.log(user);
        axios.put(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/user/update/${context.userId}/${context.tcId}`,{updated: temp,choice:{message:`${user.name} chose to live in ${id}`}})
            .then(res => {
                console.log("HEYEHEYEHEYEHEYEHEY")
                setChose(!chose);
            })
            .catch(err => console.log(err));
        

    }

    useEffect(()=> {
        axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${context.tcId}`)
            .then(res => {
                console.log(res.data);
                setTC(res.data);
                var temp = res.data.users.filter( u => u._id === context.userId )[0];
                console.log(temp)
                setUser(temp)

            })
            .catch(err => console.log(err))
    },[context,chose])



    return (
        <div className="row justify-content-around p-5">
            {
                isDeciding ? <Decision /> : null
            }
            {
                tc ? <ToughChoice handleHouseMove={handleHouseMove} users={tc.users} /> :
                        null
            }
            {
                user ? 
                    <Profile user={user}/> : null
            }
        </div>
    );
}

export default Game;