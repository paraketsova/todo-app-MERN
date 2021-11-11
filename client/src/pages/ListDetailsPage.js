import React, {useEffect, useState} from 'react';

export default function ListDetailsPage(props) {
  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [lastModifiedAt, setLastModifiedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  const todoId = props.match.params.id;

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const url = `http://localhost:3000/api/${todoId}`;
      const res = await fetch(url);
      const item = await res.json();
      setTitle(item.title);
      setTasks(item.tasks);
      setLastModifiedAt(item.updatedAt);
      setLoading(false);
    };

    fetchList().then();
  }, [todoId])

  /* UPDATE edited data on submit */

    const handleOnChangeTitle = (event) => {
      event.preventDefault();
      setTitle(event.target.value);
    };

    const handleOnChangeTask = (i) => (event) => {
      event.preventDefault();
      const newTasks = [...tasks];
      newTasks[i].text = event.target.value;
      setTasks(newTasks);
    };

    async function handleOnSubmitTitle(event) {
      event.preventDefault();
      setLoading(true);
      const url = `http://localhost:3000/api/lists/update/${todoId}`;
      await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      setLoading(false);
    }

    const handleOnSubmitTask = (i) => async (event) => {
      event.preventDefault();
      setLoading(true);
      const url = `http://localhost:3000/api/tasks/update/${todoId}`;
      const newTaskText = tasks[i].text;
      const response =  await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTaskText, i })
      });
      const updateTaskTextList = await response.json();
      setLoading(false);

      console.log(updateTaskTextList);
      setLastModifiedAt(updateTaskTextList.updatedAt);
    };

    return (
      <>
        <header>
          <h1>Your TODOlist</h1>
        </header>
        {loading && (
          <p className="load">Loading...</p>
        )}
        {title && (
          <div className="wrapper">
            <div className="list-container">
              <form className="form-title" onSubmit={handleOnSubmitTitle}>
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
