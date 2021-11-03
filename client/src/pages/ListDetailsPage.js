import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function ListDetailsPage(props) {
  const [data, setData] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  //const todoId = match.url.split("/")[3];
  const todoId = props.match.params.id;

  useEffect(() => {
    const url = 'http://localhost:3000/api/todo/lists';
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
  });

  useEffect(() => {
    if (data) {
      const [item] = data.filter((item) => item._id === todoId);
      if (!item) {
        setErrorMessage("No task with that id was found in the database");
        return;
      }
      setTodoList(item);
    }
  }, [data, todoId]);


  return (
    <>
      <p>bebebe</p>
      <p>{todoId}</p>
    </>

  )
}
