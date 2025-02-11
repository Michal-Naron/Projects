import {useState} from 'react'



export default function Form({formData,setToDoNote}){ // z tego mam dane zeby wiedziec gdzie dodac moje to do id i zeby zrobic je widzlane
    const [data,setData] = useState({
        title:"",
        user:"",
        text:""
    })

    function changeTitle(event,data){
        setData(prev=>{
            return(
                {
                    ...prev,
                    [data]:event.target.value
                }
            )
        })
    }

    function createNoteInDatabase(){
        fetch("http://localhost:8080/note/note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // 🔥 Poprawiona literówka
            },
            body: JSON.stringify({ // 🔥 JSON.stringify() dla całego `body`
                title: data.title,
                text: data.text,
                user: data.user
            })
        })
        .then(res => res.json()) 
        .then(note => {
            setToDoNote({
                id:formData.id,
                html:`
    <div class="note">
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <h6 class="bottom-right">${data.user}</h6>
    </div>

    `
            })
        })
        .catch(err => console.error("Error:", err));
    }        

    return(
        <div style={{ display: formData.visibility ? "block" : "none" }} className="form">
            <form action="">
            <label> title
            <input onChange={(event)=>changeTitle(event,"title")} type="text" value={data.title} />
            </label>
            <label> text
            <input onChange={(event)=>changeTitle(event,"text")} type="text" value={data.text} />
            </label>
            <label> user
            <input onChange={(event)=>changeTitle(event,"user")} type="text" value={data.user} />
            </label>
            </form>
            <button onClick={createNoteInDatabase}  >Create</button>
        </div>
    )
}