import React from "react";
import reactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = ({}) => {
    return <div className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

export const Modal = ({ children }) => {
    return (
        <>
            {reactDom.createPortal(<Backdrop />, portalElement)}
            {reactDom.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};
