import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/todo/lists';
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <header>
        <h1>Your TODOlist</h1>
      </header>
      {loading ? (
        <p className="load">Loading...</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th className="col1">Title</th>
            <th className="col2">Contents</th>
            <th className="col3">Edit task</th>
          </tr>
          </thead>
          <tbody>
          {/*{console.log(data)}*/}
          { data && data.map((todoList) => {
            // {console.log(todoList)}
            // {Object.entries(todoList).forEach((prop)=> console.log(prop))}
            // {console.log(JSON.stringify(todoList, null, 4))}
            // {console.log(todoList.title)}

            return (
              <tr key={todoList._id}>
                <td className="col1">
                  <label className="checkbox" htmlFor={todoList.title}>
                    <input type="checkbox" id={todoList.title} name={todoList.title}/>
                    {todoList.title}
                  </label>
                </td>
                <td className="col2">{todoList.contents}</td>
                <td className="col3">
                  <button className="btn">
                    <Link className="link" to={`/` + todoList._id}>edit</Link>
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
      )}
    </>
  )
}
