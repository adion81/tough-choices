import React, {useState, useContext} from 'react';
import TCContext from '../contexts/TcContext';
import axios from 'axios';
import io from 'socket.io-client';
import {navigate} from '@reach/router';


const SignIn = props => {

    const context = useContext(TCContext);
    console.log(context);
    const [socket] = useState(() => io(`http://${process.env.REACT_APP_IP_ADDRESS}:8000`));
    const [user,setUser] = useState({
        name:"",
        initials: "",
        color:"#ff0000"
    })
    const [accessCode,setAccessCode] = useState("");
    // const [errors,setErrors] = useState({
    //     name:"",
    //     initials:"",
    //     color: "",
    //     submit:false
    // })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        user.money = Math.floor(Math.random()*20) + 18;
        user.goodWill = Math.floor(Math.random()*20) + 18;
        axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/api/tc/user/${accessCode}`,user)
            .then(res => {
                if(res.data.errors){
                    console.log(res.data.errors)
                }
                else if(res.data.msg === "none"){
                    console.log(res.data.msg)
                }
                else{
                    context.setUserId(res.data._id);
                    context.setTcId(accessCode);
                    socket.emit("added-user",{id:accessCode})
                    setUser({
                        name:"",
                        initials:"",
                        color:"#ff0000"
                    })
                    setAccessCode("")
                    navigate("/scenario")

                }
            })
            .catch(err => {
                if(err.response.status === 404){
                    console.log("Please enter a valid code");
                }
                console.log(err)});
    }
    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const boxStyle = {
        display: "block",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "midnightblue",
        padding: "5px",
        borderRadius: "5px",
        margin: "10px auto",
        width: "25%",
        textAlign: "center",
        boxShadow: "2px 2px 2px midnightblue"
    }
    const inputStyle = {
        boxShadow: "2px 2px 2px midnightblue"
    }
    // const errorStyle ={
    //     backgroundColor: "rgba(255,0,0,.8)",
    //     border: "1px solid red"
    // }
    return(
        <div style={{padding: "70px",textAlign:"center",color:"white"}}>
            <h2>Tough Choices Sign In</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="sign-in col-lg-4 mx-auto p-5 d-flex flex-column justify-content-around ">
                <div className="form-group">
                    <label style={boxStyle} >Name</label>
                    {/* <span style={errorStyle}>{errors.name.length > 0 ? errors.name : ""}</span> */}
                    <input 
                        type="text" 
                        style={inputStyle}
                        className="form-control" 
                        name="name"
                        value={user.name} 
                        placeholder="ex:  Jane Smith" 
                        onChange={(e) => handleInput(e)}
                    />
                </div>
                <div className="form-group">
                    <label style={boxStyle} className="mx-auto">Initials</label>
                    <input 
                        type="text"     
                        value={user.initials}
                        style={inputStyle}
                        name="initials"
                        className="form-control"
                        placeholder="ex: JS"
                        onChange={(e) => handleInput(e)}
                    />
                </div>
                <div className="form-group">
                    <label style={boxStyle} className="mx-auto">Color</label>
                    <input 
                        type="color" 
                        className="form-control"
                        style={inputStyle}
                        value={user.color}
                        name="color"
                        onChange={(e) => handleInput(e)}
                    />
                </div>
                <div className="form-group">
                    <label style={boxStyle} className="mx-auto">Code</label>
                    <input 
                        type="text"     
                        value={accessCode}
                        style={inputStyle}
                        name="access"
                        className="form-control"
                        placeholder="ex: 507f1f77bcf86cd799439011"
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </div>
                {/* {
                    errors.submit ? 
                        <input type="submit" style={inputStyle}value="JOIN TOUGH CHOICES" className="btn btn-info"/> :
                        <input type="submit" style={inputStyle}value="JOIN TOUGH CHOICES" className="btn btn-info" disabled/>
                } */}
                <input type="submit" style={inputStyle}value="JOIN TOUGH CHOICES" className="btn btn-info"/>
            </form>
        </div>
    );
}

export default SignIn;