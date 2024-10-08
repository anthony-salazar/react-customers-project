import { useState, useEffect } from "react";
import {get, getAll, deleteById, post, put} from './restdb'
import { useNavigate } from "react-router-dom";

function CustomerAddUpdateForm(props) {
    const navigate = useNavigate()
    const [internalSelected, setInternalSelected] = useState({id: -1, name: "", email: "", password: ""})
    const handleInput = (event) => {
        let holder = {name:"", email:"", password:""}
        if (internalSelected.hasOwnProperty('id')) {
          holder = {...internalSelected}
        }
        holder[event.target.id] = event.target.value;
        props.setSelected(holder)
    }
    const handleDelete = () => {
        if (internalSelected.id !== -1) {
          deleteById(internalSelected.id, props.setCustomers)
          props.setSelected({id: -1, name: "", email: "", password: ""})
          props.handleRefresh()
        }
        navigate('..')
      }
    const handleSave = () => {
        if (internalSelected.id === -1) {
          if (internalSelected.name && internalSelected.email && internalSelected.password) {
            post(internalSelected, props.setCustomers)
          }
        } else {
          put(internalSelected.id, internalSelected, props.setCustomers)
        }
        props.handleRefresh()
        props.setSelected({id: -1, name: "", email: "", password: ""})
        navigate('..')
      }
    useEffect(() => setInternalSelected(props.selected), [props.selected])
    return (
        <div className='Card'>
            <div className='Inner-card' style={{marginTop: "10px"}}>
            <form onSubmit={(event) => event.preventDefault()}>
            <h1>{internalSelected.id !== -1 ? "Update" : "Add"}</h1>
            <table className='Table'>
                <tr>
                <td className='Table-cell'>
                    <label>Name: </label>
                </td>
                <td className='Table-cell'>
                    <input placeholder="Customer Name" id="name" type='text' value={internalSelected.name} onChange={(event)=>handleInput(event)}></input>
                </td>
                </tr>
                <tr>
                <td className='Table-cell'>
                    <label>Email: </label>
                </td>
                <td className='Table-cell'>
                    <input id="email" placeholder="Customer@email.com" type='email' value={internalSelected.email} onChange={(event)=>handleInput(event)}></input>
                </td>
                </tr>
                <tr>
                <td className='Table-cell'>
                    <label>Password: </label>
                </td>
                <td className='Table-cell'>
                    <input id="password" placeholder="Password" type='text' value={internalSelected.password} onChange={(event)=>handleInput(event)}></input>
                </td>
                </tr>
                
            </table>
            </form>
            <div className='Form-buttons Table-cell'>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => {props.setSelected({id: -1, name: "", email: "", password: ""}); navigate('..');}}>Cancel</button>
            </div>
        </div>
      </div>
    )
}

export default CustomerAddUpdateForm;