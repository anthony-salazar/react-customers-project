import {useState, useEffect } from "react";

function CustomerList(props) {
    console.log(props);
    const [internalSelected, setSelected] = useState(props.selected);
    useEffect(() => setSelected(props.selected), [props.selected]);
    return (
        <div className='Inner-card'>
        <h1>Customer List</h1>
        <table className='Table'>
          <thead className="Table-row" >
            <tr>
              <th className='Table-header'>Name</th>
              <th className='Table-header'>Email</th>
              <th className='Table-header'>Password</th>
            </tr>
          </thead>
          <tbody className='Table-row'>
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
    )
}

export default CustomerList