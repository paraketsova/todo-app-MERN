import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

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
    <>
      <h1>Your TODOlist</h1>
      <table>
        <thead>
          <tr>
            <th className="col1">Title</th>
            <th className="col2">Contents</th>
            <th className="col3">Edit task</th>
          </tr>
        </thead>
        <tbody>
        {console.log(data)}
          { data && data.map((todoList, index) => {
            {console.log(todoList)}
            {Object.entries(todoList).forEach((prop)=> console.log(prop))}
            // {console.log(JSON.stringify(todoList, null, 4))}
            // {console.log(todoList.title)}

            return (
              <tr key={todoList._id}>
                <td className="col1">{todoList.title}</td>
                <td className="col2">{todoList.contents}</td>
                <td className="col3">
                  <button>
                    <Link to={`/` + todoList._id}>Go to</Link>
                  </button>
                </td>
              </tr>
              // <div key={todoList._id}>
              //   <List key={index} {...todoList}/>
              // </div>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
