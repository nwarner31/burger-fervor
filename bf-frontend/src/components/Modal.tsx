import { createPortal } from "react-dom";
import React from "react";

import classes from "./Modal.module.css";

export default function Modal(props: {children?: React.ReactNode, closeModal: () => void, className?: string}) {
    const modalElement = document.getElementById("modal")!;

    return createPortal(
        <>
            <div className={classes.backdrop} onClick={props.closeModal}></div>
            <div className={`${classes.modal} ${props.className || ""}`}>{props.children}</div>
        </>, modalElement)

}