import {useState} from "react"
import Container from './components/container'
import Form from './components/Form'
import './App.css'

function App() {
  const [formData,setFormData] = useState({id:0,visibility:false})
  const [toDoNote, setToDoNote] = useState({id:"",html:""})

  return (
    <>
      <Container toDoNote={toDoNote} forwadData={setFormData}></Container>
      <Form setToDoNote={setToDoNote} formData={formData}></Form>
    </>
  )
}

export default App
