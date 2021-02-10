import React from 'react';

function Alert({statusText,status}) {
    return (
        <div style={{backgroundColor:'red',textAlign:"center",color:"white"}}>
            <p>
                {statusText}
            </p>
            <hr />
            <p className="mb-0">
                {`Code: ${status}`}
            </p>
        </div>
    );
}

export default Alert;