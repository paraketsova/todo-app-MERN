import React, {useEffect, useState} from 'react';
import List from '../components/List';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    const url = 'http://localhost:3000/api/todo/lists';
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      { data && data.map((todoList, index) => {
        {console.log(todoList)}
        {Object.entries(todoList).forEach((prop)=> console.log(prop))}
        {console.log(JSON.stringify(todoList, null, 4))}
        {console.log(todoList.title)}

        return (
          <div>
            <h3> TodoList:</h3>
            <List key={index} {...todoList}/>
          </div>
        )
      })}
    </div>
  )
}
