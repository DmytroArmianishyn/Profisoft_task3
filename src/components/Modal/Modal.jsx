import React from 'react';

const Modal = ({ isOpen, onClose, title, confirmText, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{position:'absolute' , height:'200px'}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <span className="close" onClick={onClose}>×</span>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;