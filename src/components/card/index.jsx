import React, { useEffect } from 'react'

export const Card = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
};

export const CardHeader = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
};

export const CardBody = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
};

export const CardFooter = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
};