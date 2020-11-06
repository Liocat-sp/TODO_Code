import React, { createContext, useReducer, useEffect } from 'react';
import { ReactComponent as Add } from '../icons/add.svg';
import Card from '../components/card/Card';
import './todo.css';
import Modal from '../components/cardModal/Modal';
import * as actionTypes from '../components/actionType/actionType';
import BackDrop from '../components/BackDrop/BackDrop';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as Settings } from '../icons/settings.svg';
import Setting from '../components/Setting/Setting';

export const todoContext = createContext();


const initialState = {
    countId: 0,
    TodoData: [],
    hiddenData: [],
    ModelOpen: false,
    ModalData: { id: null, text: null },
    settingsOpen: false,
    hideSettings: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...state,
                ModelOpen: true
            }
        case actionTypes.SETTINGSOPEN: return {
            ...state,
            settingsOpen: true
        }    
        case actionTypes.OPENMODAL:
            return {
                ...state,
                ModelOpen: !state.ModelOpen,
                ModalData: initialState.ModalData
            }
        case actionTypes.ADDTODO:
            if (action.payLoad.length > 0) {
                const ID = state.countId + 1;
                const insertItem = { id: ID, text: action.payLoad, visiblity: true };
                return {
                    ...state,
                    countId: ID,
                    TodoData: [insertItem, ...state.TodoData],
                    ModelOpen: !state.ModelOpen
                }
            }
            else {
                return {
                    ...state,
                    ModelOpen: !state.ModelOpen
                }
            }
        case actionTypes.HIDDEN:  // to hide the element
            const List = [...state.TodoData];
            const newitem = List.find((item) => item.id === action.payLoad);
            const newList = List.filter((item) => item.id !== action.payLoad);
            newitem.visiblity = false;
            return {
                ...state,
                TodoData: newList,
                hiddenData: [newitem, ...state.hiddenData]
            }

        case actionTypes.VISIBLITY:
            const List2 = [...state.hiddenData];
            const newitem2 = List2.find(item => item.id === action.payLoad);
            const newList2 = List2.filter(item => item.id !== action.payLoad);
            newitem2.visiblity = true;
            return {
                ...state,
                TodoData: [newitem2, ...state.TodoData],
                hiddenData: newList2
            }

        case actionTypes.REMOVE:
            const TODO = [...state.TodoData];
            const newTODO = TODO.filter((item) => item.id !== action.payLoad);
            return {
                ...state,
                TodoData: newTODO
            }

        case actionTypes.REMOVE2:
            const TODO2 = [...state.hiddenData];
            const newTODO2 = TODO2.filter((item) => item.id !== action.payLoad);
            return {
                ...state,
                hiddenData: newTODO2
            }
        case actionTypes.EDIT:
            return {
                ...state,
                ModalData: { id: action.id, text: action.text },
                ModelOpen: true
            }
        case actionTypes.CHANGE:
            const current = state.TodoData.find((items) => items.id === action.id);
            current.text = action.text;
            console.log(state.TodoData);
            return {
                ...state,
                TodoDate: state.TodoData,
                ModelOpen: !state.ModelOpen
            };
        case actionTypes.HIDINGFET: return{
            ...state,
            hideSettings: !state.hideSettings
        }
        case actionTypes.CLOSESETTING : return {
            ...state,
            settingsOpen: false
        }    

        default: return state;
    }
}


function ToDo(props) {

    const [ToDo, dispatch] = useReducer(reducer, initialState, () => {
        const localData = localStorage.getItem('todo');
        return localData? JSON.parse(localData) : initialState; 
    });

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(ToDo));
    }, [ToDo]);
    return (
        <todoContext.Provider value={{ state: ToDo, todoDispatch: dispatch }}>
            <div className="container">
                <div className="head">
                    <Add className="addbtn" onClick={() => dispatch({ type: actionTypes.ADD })} />
                    <Settings className="settings" onClick = {() => dispatch({type: actionTypes.SETTINGSOPEN})} />
                </div>
                <div className="content">
                    <TransitionGroup className="todo-list">
                        {
                            ToDo.TodoData.map(item => {
                                if (item.visiblity === true) {
                                    return <CSSTransition
                                        key={item.id}
                                        timeout={300}
                                        classNames="item">
                                        <Card
                                            key={item.id}
                                            id={item.id}
                                            text={item.text}
                                            visiblity={item.visiblity} />
                                    </CSSTransition>
                                }
                                return null;
                            })
                        }
                    </TransitionGroup>
                    { !ToDo.hideSettings?<TransitionGroup className="todo-list">
                            {
                                ToDo.hiddenData.map(item => {
                                    if (item.visiblity === false) {
                                        return <CSSTransition
                                            key={item.id}
                                            timeout={300}
                                            classNames="item" >
                                            <Card
                                                key={item.id}
                                                id={item.id}
                                                text={item.text}
                                                visiblity={item.visiblity} />
                                        </CSSTransition>
                                    }
                                    return null;
                                })
                            }
                        </TransitionGroup>:null
                        
                    }

                </div>
                {ToDo.ModelOpen ? <div><Modal id={ToDo.ModalData.id} text={ToDo.ModalData.text} /><BackDrop /></div> : null}
                {ToDo.settingsOpen?<Setting /> : null}
            </div>
        </todoContext.Provider>

    );
}

export default ToDo;


