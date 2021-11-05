import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';


export default function ListDetailsPage(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const history = useHistory();


  const todoId = props.match.params.id;

  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/todo/lists/';
    const res = await fetch(url);
    const data = await res.json();
    const [item] = data.filter((item) => item._id === todoId);
    console.log({ item });
    // console.log({item.tasks[0].task});
    setData(item);
    setLoading(false);
  };

  useEffect(() => {
    fetchData().then();
  }, [])

  //Update edited data on submit
  function handleOnSubmit(e) {
    e.preventDefault();

    const updatedTodoList = { title, task }
    console.log(updatedTodoList) ;

    fetch(`http://localhost:3000/api/todo/lists/${todoId}`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedTodoList)
      })
      .then(() => alert("item saved"))
      .then(() => history.push("/"))
  }


  return (
    <>
      <header>
        <h1>Your TODOlist</h1>
      </header>
      { loading ? (
        <p className="load">Loading...</p>
      ) : !data ? (
        <p>Something went wrong</p>
      ) : (
        <div className="list-container">
          <p>{ todoId }</p>       {/*TODO - delete test log*/}

          {/*<form onSubmit={ handleOnSubmit }>*/}
            <table>
              <tbody>
                <tr>
                  <td className="td-title">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      value={data.title}
                      size={50}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                  <td>
                    <button >edit title</button>
                  </td>
                </tr>
                { data.tasks && data.tasks.map((task, i) => (
                  <tr>
                    <td className="td-textarea">
                        <textarea
                          className="input"
                          name="task"
                          cols={40}
                          rows={2}
                          onChange={(e) => setTask(e.target.value)}
                        >
                          {data.tasks[i].task}
                        </textarea>
                    </td>
                    <td>
                      <button>edit task</button>
                    </td>
                  </tr>
                ))}

              </tbody>
              <tfoot>

              </tfoot>
            </table>
            <div className="lastModifiedAt">
              Edited: {data.lastModifiedAt}
            </div>
          {/*</form>*/}
        </div>
      )}
    </>
  )
}
