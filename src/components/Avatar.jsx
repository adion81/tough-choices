import React from 'react';

const Avatar = props => {
    return (
        <p className="avatar text-center" style={{backgroundColor: props.color}}>{props.initials}</p>
    );
}

export default Avatar;