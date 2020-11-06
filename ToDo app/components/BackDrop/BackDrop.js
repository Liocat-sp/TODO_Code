import React, { useContext } from 'react';
import './BackDrop.css';
import { todoContext } from '../../container/todo';
import * as actionTypes from '../actionType/actionType';

function BackDrop () {
    const TODO = useContext(todoContext);
    return (
        <div className="backdrop" onClick={() => TODO.todoDispatch({type:actionTypes.OPENMODAL})}></div>
    );
}

export default BackDrop;