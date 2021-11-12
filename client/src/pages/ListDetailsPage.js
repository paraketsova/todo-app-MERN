import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";

export default function ListDetailsPage(props) {
  const history = useHistory();
  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [lastModifiedAt, setLastModifiedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  const todoId = props.match.params.id;

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const url = `/api/${todoId}`;
      const res = await fetch(url);
      const item = await res.json();
      setTitle(item.title);
      setTasks(item.tasks);
      setLastModifiedAt(item.updatedAt);
      setLoading(false);
    };

    fetchList().then();
  }, [todoId])

  /*  UPDATE edited data on submit  */
    const handleOnChangeTitle = (event) => {
      event.preventDefault();
      setTitle(event.target.value);
    };

    async function handleOnSubmitTitle(event) {
      event.preventDefault();
      setLoading(true);
      const url = `/api/lists/update/${todoId}`;
      await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      setLoading(false);
    }

    const handleOnChangeTask = (i) => (event) => {
      event.preventDefault();
      const newTasks = [...tasks];
      newTasks[i].text = event.target.value;
      setTasks(newTasks);
    };

    const handleOnSubmitTask = (i) => async (event) => {
      event.preventDefault();
      setLoading(true);
      const url = `/api/tasks/update/${todoId}`;
      const newTaskText = tasks[i].text;
      const response =  await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTaskText, i })
      });
      const updateTaskTextList = await response.json();
      setLoading(false);

      setLastModifiedAt(updateTaskTextList.updatedAt);
    };

    /*  DELETE a list on submit  */
    async function handleDeleteList(event) {
      event.preventDefault();
      setLoading(true);
      const url = `/api/lists/delete/${todoId}`;
      await fetch(url, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
      })
      history.push("/");
    }

    /*  DELETE one TASK on submit  */
    const handleDeleteTask = (i) => async (event) => {
      event.preventDefault();

      setLoading(true);
      const url = `/api/tasks/delete/${todoId}`;
      await fetch(url, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ i })
      });
      tasks.splice(i, 1);
      setTasks(tasks);
      setLoading(false);
    }

    return (
      <>
        <header>
          <h1>
            <Link className="h1-title" to={`/`}>Your TODOlists</Link>
          </h1>
        </header>
        {loading && (
          <p className="load">Loading...</p>
        )}
        {title && (
          <div className="wrapper">
            <div className="list-container">
              <form className="form" onSubmit={handleOnSubmitTitle}>
                <div className="tr-title">
                  <div className="th-title">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      placeholder={title}
                      value={title}
                      size={50}
                      onChange={handleOnChangeTitle}
                    />
                  </div>
                  <div className="btn-clmn">
                    <button
                      type="submit"
                      onClick={handleOnSubmitTitle}
                      className="btn-orange">
                        edit
                    </button>
                  </div>
                  <div className="btn-clmn">
                    <button
                      onClick={handleDeleteList}
                      className="btn-red">
                        delete
                    </button>
                  </div>
                </div>
              </form>


              {tasks && tasks.map((task, i) => (
                <form key={"submit" + i} onSubmit={handleOnSubmitTask(i)}>
                  <div key={i} className="tr-task">
                    <div className="td-task">
                      <input
                        type="text"
                        className="input"
                        name="task"
                        size={50}
                        placeholder={tasks[i].text}
                        value={tasks[i].text}
                        onChange={handleOnChangeTask(i)}
                      />
                    </div>
                    <div className="btn-task-clmn">
                      <button
                        type="submit"
                        onClick={handleOnSubmitTask[i]}
                        className="btn-orange">
                          edit
                      </button>
                    </div>
                    <div className="btn-clmn">
                      <button
                        onClick={handleDeleteTask(i)}
                        className="btn-red">
                          delete
                      </button>
                    </div>
                  </div>
                </form>
              ))}
            </div>

            <div className="lastModifiedAt">
              Edited: {lastModifiedAt}
            </div>
        </div>
      )}
    </>
  )
}
