import React, {useState, useEffect} from 'react';

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

  //UPDATE edited data on submit

  const handleOnChange = (event) => {
    console.log("bububu");
    event.preventDefault();
    setTitle(event.target.value);
    // setData(event.target.value);
    // setTask(event.target.value);
  };


  async function handleOnSubmit(event) {
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

          <form onSubmit={handleOnSubmit}>
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
                      onChange={handleOnChange}
                    />
                  </th>
                  <td className="btn-clmn">
                    <button type="submit" onClick={handleOnSubmit} className="btn-orange">edit title</button>
                  </td>
                </tr>
                {tasks && tasks.map((task, i) => (
                  <tr key={i} className="tr-task">
                    <td className="td-task">
                        <input
                          type="text"
                          className="input"
                          name="task"
                          // placeholder={tasks[i].task}
                          value={tasks[i].task}
                          size={50}
                          onChange={() => null}
                        />
                    </td>
                    {/*<td className="btn-clmn">*/}
                    {/*  <button type="submit" onClick={handleOnSubmit} className="btn-orange">edit task</button>*/}
                    {/*</td>*/}
                  </tr>
                ))}

              </tbody>
            </table>
            <div className="lastModifiedAt">
              Edited: {lastModifiedAt}
            </div>
          </form>
        </div>
      )}
    </>
  )
}


// import React, {useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
//
//
// export default function ListDetailsPage(props) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [task, setTask] = useState("");
//   const history = useHistory();
//
//
//   const todoId = props.match.params.id;
//
//   const fetchData = async () => {
//     setLoading(true);
//     const url = 'http://localhost:3000/api/todo/lists/';
//     const res = await fetch(url);
//     const data = await res.json();
//     const [item] = data.filter((item) => item._id === todoId);
//     console.log({ item });
//     // console.log({item.tasks[0].task});
//     setData(item);
//     setLoading(false);
//   };
//
//   useEffect(() => {
//     fetchData().then();
//   }, [])
//
//   //Update edited data on submit
//   function handleOnSubmit(e) {
//     e.preventDefault();
//
//     const updatedTodoList = { title, task }
//     console.log(updatedTodoList) ;
//
//     fetch(`http://localhost:3000/api/todo/lists/${todoId}`,
//       {
//         method: "PUT",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(updatedTodoList)
//       })
//       .then(() => alert("item saved"))
//       .then(() => history.push("/"))
//   }
//
//   return (
//     <>
//       <header>
//         <h1>Your TODOlist</h1>
//       </header>
//       { loading ? (
//         <p className="load">Loading...</p>
//       ) : !data ? (
//         <p>Something went wrong</p>
//       ) : (
//         <div className="list-container">
//           <p>{ todoId }</p>       {/*TODO - delete test log*/}
//
//           {/*<form onSubmit={ handleOnSubmit }>*/}
//           <table>
//             <tbody>
//             <tr>
//               <td className="td-title">
//                 <input
//                   className="input"
//                   type="text"
//                   name="title"
//                   value={data.title}
//                   size={50}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <button >edit title</button>
//               </td>
//             </tr>
//             { data.tasks && data.tasks.map((task, i) => (
//               <tr>
//                 <td className="td-textarea">
//                         <textarea
//                           className="input"
//                           name="task"
//                           cols={40}
//                           rows={2}
//                           onChange={(e) => setTask(e.target.value)}
//                         >
//                           {data.tasks[i].task}
//                         </textarea>
//                 </td>
//                 <td>
//                   <button>edit task</button>
//                 </td>
//               </tr>
//             ))}
//
//             </tbody>
//           </table>
//           <div className="lastModifiedAt">
//             Edited: {data.lastModifiedAt}
//           </div>
//           {/*</form>*/}
//         </div>
//       )}
//     </>
//   )
// }
