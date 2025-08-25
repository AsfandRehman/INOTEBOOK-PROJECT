import { useState } from "react";
import React from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=> {
    const s1 = {
        "name": "asfand",
        "subject": "python"
    }
    const [state, setState] = useState(s1)
    const update = ()=> {
        setTimeout(() => {
        setState({
            "name": "Haras",
            "subject": "Javascript"
        })
    }, 1000);}
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;