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
    id: null,
    check: false,
    taskName: "",
  });

  const getTask = (id) => {
    let url =
      "https://my-json-server.typicode.com/ihsansunman/React-ToDo-List/tasks";
    if (id) {
      url += "?id=" + id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const postTask = (task) => {
    let url =
      "https://my-json-server.typicode.com/ihsansunman/React-ToDo-List/tasks";
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
        setTasks(data);
        setNewTask({
          id: null,
          check: false,
          taskName: "",
        });
      });
  };

  const changeTask = () => {
    let newId = tasks[tasks.length - 1].id + 1;
    setNewTask({ ...newTask, id: newId });
    postTask(newTask);
  };
  return (
    <Container>
      <Box>
        <h1>ToDo List</h1>
        <TextField
          sx={{ width: "90%" }}
          id="newTask"
          label="New Task"
          variant="outlined"
          value={newTask.taskName}
          onChange={(event) =>
            setNewTask({ ...newTask, taskName: event.target.value })
          }
        />
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            changeTask();
          }}
        >
          Add
        </Button>

        <List>
          {tasks.map((task) => (
            <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
              <Checkbox checked={task.check} />
              <ListItemText
                key={task.id}
                sx={{ textDecoration: task.check ? "line-through" : "unset" }}
              >
                {task.taskName}
              </ListItemText>
              <DeleteIcon sx={{ color: pink[500] }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
