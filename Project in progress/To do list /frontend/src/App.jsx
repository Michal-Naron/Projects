import {useState} from "react"
// import Container from './components/container'
import Form from './components/Form'
import './App.css'
import { Container } from "./bociann/container/Container"

function App() {
  const [formData,setFormData] = useState({id:0,visibility:false})
  const [toDoNote, setToDoNote] = useState({id:"",html:""})

  return (
    <>
      <Container />
      <Form setToDoNote={setToDoNote} formData={formData}></Form>
      {/* <Container toDoNote={toDoNote} forwadData={setFormData}></Container>
      <Form setToDoNote={setToDoNote} formData={formData}></Form> */}
    </>
  )
}

export default App
