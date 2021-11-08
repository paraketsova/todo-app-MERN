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
      setLastModifiedAt(item.lastModifiedAt);
      setLoading(false);
    };

    fetchList().then();
  }, [todoId])

  /* UPDATE edited data on submit */

    const handleOnChangeTitle = (event) => {
      console.log("test change title");
      event.preventDefault();
      setTitle(event.target.value);
    };

    const handleOnChangeTask = (i) => (event) => {
      event.preventDefault();
      const newTasks = [...tasks];
      newTasks[i].task = event.target.value;
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
      console.log('!!!!!!!!!!');
      event.preventDefault();
      setLoading(true);
      const url = `http://localhost:3000/api/tasks/update/${todoId}`;
      const newTaskText = tasks[i].task;
      console.log(newTaskText);
      await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTaskText, i })
      });
      setLoading(false);
    };

    return (
      <>
        <header>
          <h1>Your TODOlist</h1>
        </header>
        {loading ? (
          <p className="load">Loading...</p>
        ) : !title ? (
          <p>Something went wrong</p>
        ) : (
          <div className="list-container">
            <p>{ todoId }</p>       {/*TODO - delete test log*/}

          <form onSubmit={handleOnSubmitTitle}>
            <table>
              <tbody>
                <tr className="tr-title">
                  <th className="th-title">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      placeholder={title}
                      value={title}
                      size={50}
                      onChange={handleOnChangeTitle}
                    />
                  </th>
                  <td className="btn-clmn">
                    <button type="submit" onClick={handleOnSubmitTitle} className="btn-orange">edit title</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

            {tasks && tasks.map((task, i) => (
              <form key={"submit" + i} onSubmit={handleOnSubmitTask(i)}>
                  <div key={i}>
                    <input
                      type="text"
                      className="input"
                      name="task"
                      placeholder={tasks[i].task}
                      value={tasks[i].task}
                      size={50}
                      onChange={handleOnChangeTask(i)}
                    />
                    <button type="submit" onClick={handleOnSubmitTask[i]} className="btn-orange">edit task</button>
                  </div>

              </form>
            ))}


          <div className="lastModifiedAt">
            Edited: {lastModifiedAt}
          </div>
        </div>
      )}
    </>
  )
}
