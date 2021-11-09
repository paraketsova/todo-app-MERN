import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/';
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <header>
        <h1>Your TODOlists</h1>
      </header>
      {loading ? (
        <p className="load">Loading...</p>
      ) : (
        <div className="all-lists">
          { data && data.map((todoList, i) => {
            // {console.log(todoList)}
            // {Object.entries(todoList).forEach((prop)=> console.log(prop))}
            // {console.log(JSON.stringify(todoList, null, 4))}
            // {console.log(todoList.tasks[0].task)}

            return (
              <div className="list" key={i}>
                <table className="table-all-lists">
                  <tbody>
                    <tr>
                      <th className="list-col">{todoList.title}
                        <button className="btn">
                          <Link className="link" to={`/` + todoList._id}>edit</Link>
                        </button>
                      </th>
                    </tr>

                    { todoList.tasks && todoList.tasks.map((task, i) => (
                      <tr key={todoList._id + i}>
                        <td>
                          <label className="checkbox" htmlFor={todoList._id + task + i}>
                            <input type="checkbox" id={todoList._id + task + i} name={todoList._id + task + i}/>
                            {task.text}
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
