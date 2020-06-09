import React from 'react';
import invert from 'invert-color';

const Avatar = props => {
    const color = invert(props.color,true);
    return (
        <p className="avatar text-center" style={{backgroundColor: props.color, color: color}}>{props.initials}</p>
    );
}

export default Avatar;