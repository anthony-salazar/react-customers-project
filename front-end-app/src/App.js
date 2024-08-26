import logo from './logo.svg';
import './App.css';

function App() {
  const customers = [{name: "Jack Windsor", email: "jwin@gmail.com", password:"jwinrocks"},
                      {name: "Eliza Santiago", email: "sainte@hotmail.com", password: "go_santia"},
                      {name: "Robert Tobias Bunion", email: "rtb@icloud.com", password: "bobunion3"}]
  return ( 
    <div>
      <h1>Customer List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer ,i) => {
            return (
              <tr onClick={() => console.log(customer.name + "'s row was clicked")} id={i}>
                <td id={"name" + i}>{customer.name}</td>
                <td id={"email" + i}>{customer.email}</td>
                <td id={"password" + i}>{customer.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <h2>Add</h2>
          <div>
            <label>Name</label>
            <input type='text'></input>
          </div>
          <div>
            <label>Email</label>
            <input type='text'></input>
          </div>
          <div>
            <label>Password</label>
            <input type='text'></input>
          </div>
          <div>
            <button onClick={() => console.log("Delete clicked")}>Delete</button>
            <button onClick={() => console.log("Save clicked")}>Save</button>
            <button onClick={() => console.log("Cancel clicked")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
