import React, { useRef, useContext, useEffect } from 'react';
import './Modal.css';
import { todoContext } from '../../container/todo';
import * as actionType from '../actionType/actionType';

function Modal(props) {
    const TODO = useContext(todoContext);
    const MODAL = useRef();
    const content  = useRef();
    const handelclick = () => {
        let text = content.current.innerHTML;
        text = text.replace('&nbsp;'," ");
        text = text.replace("<br>","");
        text = text.replace("<div>", "");
        text = text.replace("</div>", "");
        if(props.id == null) {
            TODO.todoDispatch({type: actionType.ADDTODO, payLoad: text});
        }
        else {
            text===props.text?TODO.todoDispatch({type: actionType.OPENMODAL}):TODO.todoDispatch({type: actionType.CHANGE, id: props.id, text: text});
        }

    }
    useEffect(() => {
        const MD = MODAL.current;
        MD.style.opacity = "1";
        if(!props.text) {
            content.current.focus();
        }
    })
    return (
        
        <div className="Modal" ref={MODAL}>
            <div className="modalData" ref={content}  contentEditable="true" suppressContentEditableWarning={true}>{props.text?props.text:''}</div>
            <div className="modalController">
                <button className="cancleBtn" onClick={() => {TODO.todoDispatch({type:actionType.OPENMODAL})}}>Cancle</button>
                <button className="saveBtn" onClick={() => {handelclick()}}>Save</button>
            </div>
        </div>
    );
}

export default Modal;