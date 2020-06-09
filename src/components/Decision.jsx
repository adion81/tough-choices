import React,{useState} from 'react';

const Decision  = props => {
    const [m,setM] = useState(0);
    const [g,setG] = useState(0);

    

    return (
        <div className="decision">
            <h2>You are about to move to {props.name}</h2>
            <p>Please pay the appropriate amount</p>
            <div className="m-5">
                <h3>Money: {props.costM}</h3>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger" onClick={() => setM(m === 0 ? 0 : m -1)}>-</button>
                    <h3 style={{margin: "0 10px"}}>{m}</h3>
                    <button className="btn btn-success" onClick={() => setM(m +1)}>+</button>

                </div>
            </div>
            <div className="m-5">
                <h3>Good Will: {props.costG}</h3>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger" onClick={() => setG(g === 0 ? 0 : g - 1)}>-</button>
                    <h3 style={{margin: "0 10px"}}>{g}</h3>
                    <button className="btn btn-success" onClick={() => setG(g +1)}>+</button>

                </div>
            </div>
            <button className="btn btn-warning" onClick={(e) => props.handleHouseMove(e,props.name,m,g)}>Submit</button>
            
        </div>
    );
}
export default Decision;