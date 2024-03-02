import React from "react";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    containerClass?: string
}
export default function Input({id, label, containerClass, ...rest}: inputProps) {
    return (
        <div className={containerClass || ""}>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...rest}/>
        </div>);
}