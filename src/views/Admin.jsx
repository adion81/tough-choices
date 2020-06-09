import React,{useState, useEffect} from 'react';
import './Admin.css';
import axios from 'axios';
import io from 'socket.io-client';

const Admin = props => {
    const [socket] = useState(() => io(`http://${process.env.REACT_APP_IP_ADDRESS}:8000`));
    const [tcId,settcId] = useState(localStorage.getItem("tcKey")|| "");
    const [tc,setTc] = useState(null);

    const handleUpdateTC = (id) => {
        if(tc === null){
            return;
        }
        else{
            if(tcId !== id){
                return;
            }
            else{
                axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/${tcId}`)
                    .then(res => setTc(res.data))
                    .catch(err => console.log(err));
            }
        }
    }
    const handleDeactivate = (id) => {
        const temp = {...tc};
        temp.active = false;
        axios.put(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/deactivate/${tcId}`,temp)
            .then(res=> {
                localStorage.removeItem("tcKey");
            })
            .catch(err => console.log(err))
    }


    socket.on("update-tc", data => {
        console.log(data.id)
        handleUpdateTC(data.id)
    })
    
    const style = {
        color: "white",
        backgroundColor: "midnightblue"
    }

    const tableStyle = {
        height: "500px",
        overflowY: "auto"
    }

    const handleNewTC = () => {
        axios.post("http://localhost:8000/api/tc")
            .then(res => {
                localStorage.setItem("tcKey",res.data._id);
                setTc(res.data)
            })
            .catch(err => console.log(err));
    }
    return (
        <div style={style}>
            <h1 className="text-center text-light bg-dark" >Facilitation Station</h1>
            <div className="d-flex justify-content-around">
                <fieldset className="col-6 field-style">
                    <legend className="legend">Participant Stats</legend>
                    <div style={tableStyle}>

                        <table className="table table-hover table-light">
                            <thead>
                                <tr >
                                    <th className="sticky-style">User</th>
                                    <th className="sticky-style">Green In Hand</th>
                                    <th className="sticky-style">Yellow In Hand</th>
                                    <th className="sticky-style">PayLoans Taken</th>
                                    <th className="sticky-style">Dog Given Up</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    tc === null ? null :
                                        tc.users.map((u,idx) => {
                                            return <tr key={idx}>
                                                        <td>{u.name}</td>
                                                        <td>{u.money}</td>
                                                        <td>{u.goodWill}</td>
                                                        <td>{u.paydayLoan}</td>
                                                        <td>{u.dog ? "NO" : "YES"}</td>
                                                    </tr>
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <fieldset  className="col-4 field-style">
                    <legend className="legend">Controls</legend>
                    {
                        tc === null ? 
                            <button   
                                className="btn btn-info mx-auto d-block" 
                                style={{boxShadow:"2px 2px 2px #99e6d8"}}
                                onClick={handleNewTC}
                            >Create Tough Choice</button> :
                            <button 
                                className="btn btn-danger mx-auto d-block" 
                                style={{boxShadow:"2px 2px 2px #99e6d8"}}
                                onClick={handleDeactivate}
                            >Wrap Up</button>
                    }
                    <table id="admin">
                        <tr >
                            <td>Access Code:</td>
                            <td>{ tc === null ? "Not Active": tc._id }</td>
                        </tr>
                        <tr>
                            <td># of Participants</td>
                            <td>{ tc === null ? "Not Active": tc.users.length }</td>
                        </tr>
                    </table>
                    

                </fieldset>

            </div>

        </div>  
    );
}

export default Admin;