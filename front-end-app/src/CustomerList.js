import {useState, useEffect } from "react";
import {getAll} from './restdb';
import { useNavigate } from "react-router-dom";
function CustomerList(props) {
    const navigate = useNavigate()
    const [internalSelected, setSelected] = useState(props.selected);
    let [query, setQuery] = useState("");
    const handleSearch = (event) => {
      
      query = setQuery(event.target.value)
      console.log(query)
    }
    const handleSubmitSearch = (event) => {
      console.log(event.target)
      getAll(props.setCustomers).then( () => {
      if (event.target.id === "search") {
        console.log(query)
        const filtered = props.customers.filter(
          (customer) => {
            return (customer.name.toLowerCase().includes(query.toLowerCase()) ||
              customer.email.toLowerCase().includes(query.toLowerCase()) ||
              customer.password.toLowerCase().includes(query.toLowerCase())
            );
          }
        )
        props.setSelected({id: -1, name: "", email: "", password: ""})
        props.setCustomers(filtered)
      } else if (event.target.id === "cancel") {
        console.log("cancelling")
        setQuery("")
        props.setSelected({id: -1, name: "", email: "", password: ""})
      } 
      });
    }
    useEffect(() => setSelected(props.selected), [props.selected]);
    useEffect(() => setQuery(""), [props.refresh])
    return (
      <div className='Card'>
        <div className="Form-navigation">
          <button onClick={() => navigate('/form/')}>Add</button>
          <button disabled={(props.selected.id === -1)} onClick={() => navigate('/form/')}>Update</button>
        </div>
        <div className='Inner-card'>
          <h1>Customer List</h1>
          <div className="Search-bar">
            <input placeholder="Search" className="Search-field" value={query} onChange={(event) => handleSearch(event)} onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSubmitSearch({target: {id : 'search'}})
              }
            }}></input>
            <button id="search" className="Search-field" onClick={(event) => handleSubmitSearch(event)}>Search</button>
            <button id="cancel" className="Search-field" onClick={(event) => handleSubmitSearch(event)}>Cancel</button>
          </div>
          <div className="Table-container">
            <table className='Table'>
              <thead className="Thead">
                <tr>
                  <th className='Table-header'>Name</th>
                  <th className='Table-header'>Email</th>
                  <th className='Table-header'>Password</th>
                </tr>
              </thead>
              <tbody>
                {props.customers.map((customer) => {
                  return (
                    <tr onClick={() => props.handleClick(customer)} id={customer.id}>
                      <td className='Table-cell' id={"name" + customer.id} style={{fontWeight: (internalSelected.id === customer.id) ? "bold": "normal"}}>{customer.name}</td>
                      <td className='Table-cell' id={"email" + customer.id} style={{fontWeight: (internalSelected.id === customer.id) ? "bold": "normal"}}>{customer.email}</td>
                      <td className='Table-cell' id={"password" + customer.id} style={{fontWeight: (internalSelected.id === customer.id) ? "bold": "normal"}}>{customer.password}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <body style={{fontWeight: 'bold'}}>{`Displaying ${props.customers.length} records`}</body>
        </div>
      </div>
    )
}

export default CustomerList