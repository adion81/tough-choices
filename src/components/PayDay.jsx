import React,{useState} from 'react';

const PayDay = props => {
    const [m,setM] = useState(0);
    return (
        <div className="decision">
            <h2>PayDay Loan</h2>
            <p>Please Select the Amount</p>
            <div className="m-5">
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger" onClick={() => setM(m === 0 ? 0 : m -1)}>-</button>
                    <h3 style={{margin: "0 10px"}}>{m}</h3>
                    <button className="btn btn-success" onClick={() => setM(m +1)}>+</button>

                </div>
            </div>
            <button className="btn btn-warning" onClick={(e) => props.handlePayDay(e,m)}>Submit</button>
        </div>
    );
}

export default PayDay;