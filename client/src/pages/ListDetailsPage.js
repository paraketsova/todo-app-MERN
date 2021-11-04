import React, {useState, useEffect} from 'react';

export default function ListDetailsPage(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const todoId = props.match.params.id;

  const fetchData = async () => {
    setLoading(true);
    const url = 'http://localhost:3000/api/todo/lists';
    const res = await fetch(url);
    const data = await res.json();
    const [item] = data.filter((item) => item._id === todoId);
    console.log({ item });
    setData(item);
    setLoading(false);
  };

  useEffect(() => {
    fetchData().then();
  }, [])

  return (
    <>
      <header>
        <h1>Your TODOlist</h1>
      </header>
      {loading ? (
        <p className="load">Loading...</p>
      ) : !data ? (
        <p>Something went wrong</p>
      ) : (
        <>
          <p>{todoId}</p>
          <table>
            <tbody>
              <tr>
                <th className="col1">Title</th>
                <td className="col2-title">{data.title}</td>
                <td className="col3">
                  <button className="btn">edit task</button>
                </td>
              </tr>
              <tr>
                <th className="col1">Contents</th>
                <td className="col2">{data.contents}</td>
                <td className="col3">
                  <button className="btn">edit task</button>
                </td>
              </tr>
              <tr>
                <th className="col1">Latest updated</th>
                <td className="col2">{data.lastModifiedAt}</td>
                <td className="col3">
                <button className="btn">edit task</button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  )
}
