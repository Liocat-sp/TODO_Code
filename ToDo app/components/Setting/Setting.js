import React, { useContext, useRef } from 'react';
import './Setting.css';
import { todoContext } from '../../container/todo';
import * as actionTypes from '../actionType/actionType';
function Setting () {
    const TODO = useContext(todoContext);
    const check = useRef();
    const handelCheck = (e) => {
        if(check.current.checked)
        {
            TODO.todoDispatch({type:actionTypes.HIDINGFET})
        }
        else{
            TODO.todoDispatch({type:actionTypes.HIDINGFET})
        }
    }
      return (
          <div className="setting">
              <div className="navigation" onClick={() => TODO.todoDispatch({type: actionTypes.CLOSESETTING})}> Back </div>
              <div className="Menu set">
                    <div>Disable hidding Feature</div>
                    <input ref={check} type="checkbox" checked={TODO.state.hideSettings} className="check" onChange={() => handelCheck()}/>
              </div>
              <div className="Menu">Developer: Saurabh Pathak</div>
              <div className="Menu details">
                  <p>Details:</p>
                  <p>there are some input issues so, don't change lines.</p>
                  <p>input is made to look as mobile textfield.</p>
              </div>
          </div>
      );
}

export default Setting;