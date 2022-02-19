import "./App.scss";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Container,
  Box,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    getTask();
  }, []);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    check: false,
    taskName: "",
  });

  const url =
    "https://my-json-server.typicode.com/ihsansunman/React-ToDo-List/tasks/";

  const getTask = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const postTask = (task) => {
   fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask({
          id: null,
          check: false,
          taskName: "",
        });
      });
  };

  const deleteTask = (id) => {
    fetch(url + id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  const putTask = (id, task) => {
    fetch(url + id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(
          tasks.map((task) => {
            return task.id === id ? data : task;
          })
        );
      });
  };

  return (
    <Container>
      <Box>
        <h1 className="title">ToDo List</h1>
        <div className="new-task">
        <TextField
        className="new-input"
          id="newTask"
          label="New Task"
          variant="outlined"
          value={newTask.taskName}
          onChange={(event) =>
            setNewTask({ ...newTask, taskName: event.target.value })
          }
        />
        <Button
        className="new-button"
          size="large"
          variant="contained"
          onClick={() => {
            postTask(newTask);
          }}
        >
          Add
        </Button>
        </div>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} className="list-item">
              <Checkbox
                checked={task.check}
                onChange={() =>
                  putTask(task.id, { ...task, check: !task.check })
                }
              />
              <ListItemText
                sx={{ textDecoration: task.check ? "line-through" : "unset" }}
              >
                {task.taskName}
              </ListItemText>
              <DeleteIcon
              className="delete-icon"
                onClick={() => deleteTask(task.id)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
