import React from 'react';
import './Button.css';

const Button = (props) => {
    const { children, className, onClick, type = 'primary', size = 'medium', ...otherProps } = props;
    
    const classes = [
        'button',
        className,
        `button-${type}`,
        `button-${size}`,
    ];
    
    return (
        <button
            className={classes.join(' ')}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;