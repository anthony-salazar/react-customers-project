import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {get, getAll, deleteById, post, put} from './memdb'

function App() {
  const [refreshCustomers, setRefresh] = useState(false);
  const [customers, setCustomers] = useState([]) 
  const [selected, setSelected] = useState({id: -1, name: "", email: "", password: ""});
  const handleRowClicked = (customer) => {
    if (customer.id === selected.id) {
      setSelected({id: -1, name: "", email: "", password: ""})
    } else {
      setSelected(customer)
    }
  }
  const getCustomers = function() {
    setCustomers(getAll())
  }
  const handleDelete = () => {
    if (selected.id !== -1) {
      deleteById(selected.id)
      setRefresh(!refreshCustomers)
    }
  }
  const handleSave = () => {
    if (selected.id === -1) {
      if (selected.name && selected.email && selected.password) {
        post(selected)
      }
    } else {
      put(selected.id, selected)
    }
    setRefresh(!refreshCustomers)
    setSelected({id: -1, name: "", email: "", password: ""})
  }
  const handleInput = (event) => {
    let holder = {name:"", email:"", password:""}
    if (selected.hasOwnProperty('id')) {
      holder = {...selected}
    }
    holder[event.target.id] = event.target.value;
    setSelected(holder)
  }
  useEffect(getCustomers, refreshCustomers);
  return ( 
    <div>
    <div className='Card'>
      <div className='Inner-card'>
        <h1>Customer List</h1>
        <table className='Table'>
          <thead >
            <tr >
              <th className='Table-header'>Name</th>
              <th className='Table-header'>Email</th>
              <th className='Table-header'>Password</th>
            </tr>
          </thead>
          <tbody >
            {customers.map((customer) => {
              return (
                <tr onClick={() => handleRowClicked(customer)} id={customer.id}>
                  <td className='Table-cell' id={"name" + customer.id} style={{fontWeight: (selected.id === customer.id) ? "bold": "normal"}}>{customer.name}</td>
                  <td className='Table-cell' id={"email" + customer.id} style={{fontWeight: (selected.id === customer.id) ? "bold": "normal"}}>{customer.email}</td>
                  <td className='Table-cell' id={"password" + customer.id} style={{fontWeight: (selected.id === customer.id) ? "bold": "normal"}}>{customer.password}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='Inner-card' style={{marginTop: "10px"}}>
        <form onSubmit={(event) => event.preventDefault()}>
          <h1>{selected.id !== -1 ? "Update" : "Add"}</h1>
          <table className='Table'>
            <tr>
              <td className='Table-cell'>
                <label>Name: </label>
              </td>
              <td className='Table-cell'>
                <input id="name" type='text' value={selected.name} onChange={(event)=>handleInput(event)}></input>
              </td>
            </tr>
            <tr>
              <td className='Table-cell'>
                <label>Email: </label>
              </td>
              <td className='Table-cell'>
                <input id="email" type='text' value={selected.email} onChange={(event)=>handleInput(event)}></input>
              </td>
            </tr>
            <tr>
              <td className='Table-cell'>
                <label>Password: </label>
              </td>
              <td className='Table-cell'>
                <input id="password" type='text' value={selected.password} onChange={(event)=>handleInput(event)}></input>
              </td>
            </tr>
            
          </table>
        </form>
        <div className='Form-buttons Table-cell'>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setSelected({id: -1, name: "", email: "", password: ""})}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
/*[{name: "Jack Windsor", email: "jwin@gmail.com", password:"jwinrocks"},
                      {name: "Eliza Santiago", email: "sainte@hotmail.com", password: "go_santia"},
                      {name: "Robert Tobias Bunion", email: "rtb@icloud.com", password: "bobunion3"}]*/