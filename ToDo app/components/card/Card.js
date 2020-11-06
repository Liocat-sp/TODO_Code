import React, { useContext, useRef, useEffect } from 'react';
import './card.css';
import { ReactComponent as Hide } from '../../icons/hide.svg';
import { ReactComponent as Remove } from '../../icons/close.svg';
import { ReactComponent as Unhide } from '../../icons/unhide.svg';
import { todoContext } from '../../container/todo';
import * as actionTypes from '../actionType/actionType';

function Card(props) {
    const TODO = useContext(todoContext);
    const text = useRef();
    const handelEditClick = () => {
        TODO.todoDispatch({ type: actionTypes.EDIT, id: props.id, text: props.text });
    }
    const shortText = props.text.length > 20 ? (props.text.substr(0, 20) + "...") : props.text;
    useEffect(() => {
        if (props.visiblity === false) {
            text.current.style.textDecoration = "line-through";
            text.current.style.color = "#9e9e9e";
        }
        else {
            text.current.style.textDecoration = "none";
            text.current.style.color = "#000";
        }
    });
    return (
        <div className="card">
            <div className="cardData">
                <div onClick={() => { props.visiblity?handelEditClick():alert('Warning: you can not edit hidden ToDo !!!') }}>
                    <p ref={text}>{shortText}</p>
                </div>

                <div>
                    {TODO.state.hideSettings?null:props.visiblity ? <Hide className="cardControls" onClick={() => { TODO.todoDispatch({ type: actionTypes.HIDDEN, payLoad: props.id }) }} /> : <Unhide className="cardControls" onClick={() => { TODO.todoDispatch({ type: actionTypes.VISIBLITY, payLoad: props.id }) }} />}
                    <Remove className="cardControls" onClick={() => props.visiblity ? TODO.todoDispatch({ type: actionTypes.REMOVE, payLoad: props.id }) : TODO.todoDispatch({ type: actionTypes.REMOVE2, payLoad: props.id })   } />
                </div>
            </div>
        </div>
    );
}

export default Card;