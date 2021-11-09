import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState([]);
  // const [status, setStatus] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/';
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [])

  /* UPDATE task status */
  const onChangeStatus = (_id, i) => async (event) => {
    event.preventDefault();
    console.log("PUT status!");
    setLoading(true);
    const url = `http://localhost:3000/api/tasks/complete/${_id}`;
    const todoList = data.find((item) => item._id === _id);
    console.log(todoList);
    console.log(todoList.tasks[i].completed);
    const newStatus = !todoList.tasks[i].completed;
    todoList.tasks[i].completed = newStatus;
    // setTasks(todoList.tasks);
    await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newStatus, i })
    });
    setLoading(false);
  };

  /* ADD new task  */
  const onSubmitNewTask = (event) => {
    console.log("lalala");
  };

  const handleOnSubmitNewTask  = (inputValue) => (event) =>{
    console.log(newTaskText);
  };

  /* RENDERING */
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
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={onChangeStatus(todoList._id, i)}
                              // onSubmit={handleOnSubmitStatus(todoList._id, i)}
                            />
                            <span className="checkmark"></span>
                            {task.text}
                          </label>
                        </td>
                      </tr>
                    ))}

                    <tr key={newTaskText._id}>
                      <td className="td-newTask">
                        <form className="newTask" onSubmit={onSubmitNewTask}>
                          <input placeholder="Add new task" value={newTaskText} onChange={handleOnSubmitNewTask}
                                 className="inputField"/>
                          <button className="btn-orange">add</button>
                        </form>
                      </td>
                    </tr>

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
