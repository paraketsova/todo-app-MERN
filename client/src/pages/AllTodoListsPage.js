import React, {useEffect, useState} from 'react';
//import List from '../components/List';
import {Link} from 'react-router-dom';

export default function AllTodoListsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTaskTexts, setNewTaskTexts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/';
    const res = await fetch(url);
    const data = await res.json();

    if (res.statusCode ===404) {
      setLoading(false);
      setErrorMessage(res.statusMessage);
    } else {
      setData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  /*  UPDATE task status  */
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

  /*  ADD new TASK  */
  const handleOnChangeNewTask = (_id) => (event) => {
    event.preventDefault();
    setNewTaskTexts(newTaskTexts => {
      const newTexts = { ...newTaskTexts };
      newTexts[_id] = event.target.value;
      return newTexts;
    });
  };

  const handleOnSubmitNewTask = (_id) => async (event) => {
    event.preventDefault();

    setLoading(true);

    const url = `http://localhost:3000/api/tasks/add/${_id}`;
    const newText = newTaskTexts[_id];
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newText })
    });
    const newList = await response.json();

    setLoading(false);

    setData(data => {
      const newData = [...data];
      const listIndex = newData.findIndex(list => list._id === _id);
      newData[listIndex] = newList;
      return newData;
    });

    setNewTaskTexts(newTaskTexts => {
      const updatedNewTaskTexts = { ...newTaskTexts };
      updatedNewTaskTexts[_id] = '';
      return updatedNewTaskTexts;
    });
  };

  /*  ADD new LIST  */
  const handleOnChangeNewTitle = (event) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  async function handleOnSubmitNewTitle(event) {
    event.preventDefault();

    const url = `http://localhost:3000/api/lists/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTitle })
    });
    const newList = await response.json();

    setData(data => {
      const newData = [...data];
      newData.push(newList);
      return newData;
    });

    setNewTitle('');
  }

  /*  RENDERING  */
  return (
    <div>
      <header>
        <h1>Your TODOlists</h1>
      </header>
      <div>
        {errorMessage}
      </div>
      {loading && (
        <p className="load">Loading...</p>
      )}
      {data && (
        <div className="all-lists">
          <div>
            <form className="newList" onSubmit={handleOnSubmitNewTitle}>
              <div className="tr-newTitle">
                <div className="th-newTitle">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    placeholder="Add new todo list"
                    value={newTitle}
                    size={50}
                    onChange={handleOnChangeNewTitle}
                  />
                  <button type="submit" className="btn-newTitle">add</button>
                </div>
              </div>
            </form>
          </div>

          {data.map((todoList, i) => {
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

                    {todoList.tasks && todoList.tasks.map((task, i) => (
                      <tr key={todoList._id + i}>
                        <td>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={onChangeStatus(todoList._id, i)}
                            />
                            <span className="checkmark"/>
                            {task.text}
                          </label>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td className="td-newTask">
                        <form className="newTask" onSubmit={handleOnSubmitNewTask(todoList._id)}>
                          <input
                            type="text"
                            name="newTask"
                            size={50}
                            placeholder="Add new task"
                            value={newTaskTexts[todoList._id] ?? ""}
                            onChange={handleOnChangeNewTask(todoList._id)}
                            className="inputField"
                          />
                          <button type="submit" className="btn-orange">add</button>
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
