const URL = "http://localhost:4000/customers"
const headersUniversal = {headers: {"Content-Type": "application/json"}, "mode": "cors"}
let items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2
    }
  ]


export async function getAll(setCustomers){
    const data = await fetch(URL, {...headersUniversal, method: "GET"})
    if (!data.ok) {
      throw new Error('Error getting customers');
    }
    const customers = await data.json()
    items = customers
    setCustomers(customers)
    return customers
}

export async function get(id, setCustomers) {
    await getAll(setCustomers)
    const custs = items;
    let result = null;
    for( let item of custs){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

export async function deleteById(id, setCustomers) {
  const data = await fetch(URL + `/${id}`, {...headersUniversal, method: "DELETE"})
  if (!data.ok) {
    throw new Error("Error deleting customer")
  }
  getAll(setCustomers)
}

export async function post(item, setCustomers) {
  const id = getNextId()
  item.id = id
  const data = await fetch(URL, {...headersUniversal, method: "POST", body: JSON.stringify(item)})
  if (!data.ok) {
    throw new Error('Error adding customer');
  }
  getAll(setCustomers)
}

export async function put(id, item, setCustomers) {
  const data = await fetch(URL + `/${id}`, {...headersUniversal, method: "PUT",
    body: JSON.stringify(item)})
  if (!data.ok) {
    throw new Error("Error updating customer")
  }
  getAll(setCustomers)
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


