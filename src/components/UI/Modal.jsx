import React from "react";
import reactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
    return <div onClick={onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

export const Modal = ({ children, onClose }) => {
    return (
        <>
            {reactDom.createPortal(
                <Backdrop onClose={onClose} />,
                portalElement
            )}
            {reactDom.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};
