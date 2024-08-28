import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {get, getAll, deleteById, post, put} from './restdb'
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

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
  const getCustomers = function(setCustomers) {
    getAll(setCustomers);
  }
  const handleRefresh = () => {setRefresh(!refreshCustomers)}
  
  useEffect(() => getCustomers(setCustomers), [refreshCustomers]);
  return ( 
    <div>
    <div className='Card'>
      <CustomerList customers={customers} selected={selected} handleClick={handleRowClicked} setCustomers={setCustomers} setSelected={setSelected} refresh={refreshCustomers}/>
      <CustomerAddUpdateForm setCustomers={setCustomers} selected={selected} setSelected={setSelected} handleRefresh={handleRefresh}/>
    </div>
    </div>
  );
}

export default App;
/*[{name: "Jack Windsor", email: "jwin@gmail.com", password:"jwinrocks"},
                      {name: "Eliza Santiago", email: "sainte@hotmail.com", password: "go_santia"},
                      {name: "Robert Tobias Bunion", email: "rtb@icloud.com", password: "bobunion3"}]*/