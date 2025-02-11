import Todo from "./Todo"
import "../App.css"
export default function Container({forwadData,toDoNote}){
    return(
        <div className="container2">
            <Todo id="1" toDoNote={toDoNote} setFormData={forwadData} ></Todo>
            <Todo id="2" toDoNote={toDoNote}  setFormData={forwadData} ></Todo>
            <Todo id="3" toDoNote={toDoNote}  setFormData={forwadData} ></Todo>
            <Todo id="4" toDoNote={toDoNote}  setFormData={forwadData} ></Todo>
            <Todo id="5" toDoNote={toDoNote}  setFormData={forwadData} ></Todo>
        </div>
    )
}