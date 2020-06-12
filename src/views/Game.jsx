import React,{useContext,useEffect,useState} from 'react';
import Profile from '../components/Profile';
import ToughChoice from '../components/ToughChoice';
import TCContext from '../contexts/TcContext';
import Decision from '../components/Decision';
import PayDay from '../components/PayDay';
import axios from 'axios';
import io from 'socket.io-client';



const Game = props => {
    const [socket] = useState(() => io(`http://${process.env.REACT_APP_IP_ADDRESS}:8000`));
    const [chose,setChose] = useState(false);
    const context = useContext(TCContext);
    const [tc,setTC] = useState(null);
    const [isDeciding,setIsDeciding] = useState(false);
    const [isPayDay,setIsPayDay] = useState(false);
    const [movingTo,setMovingTo] = useState({
        name: "",
        costM: 0,
        costG: 0,
    });
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

    useEffect(() => {
        socket.on("update-tc", data => {
            console.log(data.id)
            if(context.tcId === null){
                return;
            }
            else{
                if(context.tcId !== data.id){
                    return;
                }
                else{
                    axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${data.id}`)
                        .then(res => setTC(res.data))
                        .catch(err => console.log(err));
                }
            }
        })
    },[socket,context.tcId])

    // const handleUpdateTC = (id) => {
    //     if(tc === null){
    //         return;
    //     }
    //     else{
    //         if(tc.title !== id){
    //             return;
    //         }
    //         else{
    //             axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${id}`)
    //                 .then(res => setTC(res.data))
    //                 .catch(err => console.log(err));
    //         }
    //     }
    // }
    const handleMovePopUp = (e,id,costM,costG) => {
        if(id === user.position){
            return;
        }
        setMovingTo({
            name: id,
            costM : costM,
            costG: costG
        })
        setIsDeciding(true);

    }

    const handlePayDayPopUp = () => {
        setIsPayDay(true);
    }

    const handlePayDay = (e,money) => {
        const temp = {...user};
        temp.money += money;
        temp.paydayLoan ++;
        temp.loanAmount += money;
        axios.put(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/user/update/${context.userId}/${context.tcId}`,{updated: temp,choice:{message:`${user.name} accepted a payday loan of ${money} money.`}})
            .then(res => {
                setIsPayDay(false);
                socket.emit("updated-user",{id:context.tcId});
                setChose(!chose);
            })
            .catch(err => console.log(err));
    }


    const handleHouseMove = (e, id,money,goodWill) => {
        console.log(id);
        setIsDeciding(false);
        const temp = {...user};
        if(user.money < money){
            temp.money = 0;
        }
        else{
            temp.money -= money;
        }
        if(user.goodWill < goodWill){
            temp.goodWill = 0;
        }
        else{
            temp.goodWill -= goodWill;
        }
        if(id ==="home"){
            temp.position = "home";
            temp.teen = true;
            temp.twins = true;
            temp.dog = true;
        }
        else if(id === "car"){
            temp.position = "car";
            temp.teen = true;
            temp.twins = true;
            temp.dog = true;
        }
        else if(id === "apartment"){
            temp.position = "apartment";
            temp.teen = true;
            temp.twins = true;
            temp.dog = true;
        }
        else if(id === "friend"){
            temp.position = "friend";
            temp.teen = true;
            temp.twins = true;
            temp.dog = false;
        }
        else if(id === "hotel"){
            temp.position = "hotel";
            temp.teen = false;
            temp.twins = false;
            temp.dog = false;
        }
        else if(id === "shelter"){
            temp.position = "shelter";
            temp.teen = false;
            temp.twins = true;
            temp.dog = false;
        }
        console.log(user);
        axios.put(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/user/update/${context.userId}/${context.tcId}`,{updated: temp,choice:{message:`${user.name} chose to live in ${id} and spent ${money} money & ${goodWill} good will.`}})
            .then(res => {
                setChose(!chose);
                socket.emit("updated-user",{id:context.tcId})
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
                isDeciding ? <Decision 
                                handleHouseMove={handleHouseMove} 
                                name={movingTo.name} 
                                costM={movingTo.costM}
                                costG={movingTo.costG}
                            /> : null
            }
            {
                isPayDay ? <PayDay handlePayDay={handlePayDay} /> : null
            }
            {
                tc ? <ToughChoice handleMovePopUp={handleMovePopUp} users={tc.users} /> :
                        null
            }
            {
                user ? 
                    <Profile user={user} handlePayDayPopUp={handlePayDayPopUp}/> : null
            }
        </div>
    );
}

export default Game;