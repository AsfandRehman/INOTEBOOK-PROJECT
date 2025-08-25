
import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=> {
   const notesInitial = [
    {
      "_id": "67963ab4c37a767a85048891",
      "user": "6795081b98720e4ba25b4c0e",
      "title": "Morning",
      "description": "go to the gym asap",
      "tag": "personal",
      "date": "2025-01-26T13:37:56.297Z",
      "__v": 0
    },
    {
      "_id": "67963abec37a767a8504889a",
      "user": "6795081b98720e4ba25b4c0e",
      "title": "Morning",
      "description": "go to the gym asap",
      "tag": "personal",
      "date": "2025-01-26T13:38:06.784Z",
      "__v": 0
    },
    {
      "_id": "67964a45574242eda012e65c",
      "user": "6795081b98720e4ba25b4c0e",
      "title": "night",
      "description": "dont go to cafe please",
      "tag": "personal",
      "date": "2025-01-26T14:44:21.809Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // add a note
  const addNote = (title, description, tag)=> {
     console.log("note has been added")
     const note = {
      "_id": "67964a45574242eda012e65c12",
      "user": "6795081b98720e4ba25b4c0e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2025-01-26T14:44:21.809Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // delete a note
  const deleteNote = (id)=> {
      console.log("note deleted" + id)
      const newNotes = notes.filter((note)=> {
        return note._id!==id
      })
      setNotes(newNotes)
  }

  // edit a note
  const editNote = (id, title, description, tag)=> {
    console.log("edit done" + id)
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
      
    }
  }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;