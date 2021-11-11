import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [newTaskTexts, setNewTaskTexts] = useState({});
  const [errorMessage, setErrorMessage] = useState();

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

  /* UPDATE task status */
  const onChangeStatus = (_id, i) => async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = `http://localhost:3000/api/tasks/complete/${_id}`;
    const todoList = data.find((item) => item._id === _id);
    const newStatus = !todoList.tasks[i].completed;
    todoList.tasks[i].completed = newStatus;
    await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newStatus, i })
    });
    setLoading(false);
  };

  /* ADD new task  */
  const handleOnChangeNewTask = (_id) => (event) => {
    event.preventDefault();
    console.log(_id);
    setNewTaskTexts(newTaskTexts => {
      const newText = { ...newTaskTexts };
      newText[_id] = {[_id]:  event.target.value};
      return newText;
    });
    // setNewTaskTexts({});
    console.log(newTaskTexts);
  };

  const handleOnSubmitNewTask  = (_id) => async (event) => {
    event.preventDefault();
    console.log(newTaskTexts);
    const newText = newTaskTexts[_id].[_id];
    console.log(newText);
    setLoading(true);
    const url = `http://localhost:3000/api/tasks/add/${_id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newText, _id })
      });
    const newList = await response.json();
    setLoading(false);
      setData(data => {
        const newData = [ ... data];
        const index = newData.findIndex(list => list._id === _id);
        console.log(index);
        newData[index] = newList;
        return newData;
      })

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
                            />
                            <span className="checkmark"></span>
                            {task.text}
                          </label>
                        </td>
                      </tr>
                    ))}

                    <tr key={"newTask" + todoList.id}>
                      <td className="td-newTask">
                        <form className="newTask" onSubmit={handleOnSubmitNewTask(todoList._id)}>
                          <input
                            type="text"
                            name="newTask"
                            size={50}
                            placeholder="Add new task"
                            value={newTaskTexts._id}
                            onChange={handleOnChangeNewTask(todoList._id)}
                            className="inputField"
                          />
                          <button
                            type="submit"
                            onClick={handleOnSubmitNewTask}
                            className="btn-orange">
                              add
                          </button>
                        </form>
                      </td>
                    </tr>

                  </tbody>
                </table>
                {/*<p className="errorMessage">*/}
                {/*  {errorMessage}*/}
                {/*</p>*/}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
