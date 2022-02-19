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
  
  }, [])
  

  const [tasks, setTasks] = useState([
  ]);

  const getTask = (taskId) => {
    let url = "https://my-json-server.typicode.com/ihsansunman/React-ToDo-List/tasks";
    if (taskId) {
      url += "?taskId=" + taskId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTasks(data));
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
        />
        <Button size="large" variant="contained">
          Add
        </Button>

        <List>
          {tasks.map((task) => (
            <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
              <Checkbox checked={task.check}/>
              <ListItemText key={task.taskId} sx={{textDecoration: task.check ? "line-through" : "unset"}}>{task.taskName}</ListItemText>
              <DeleteIcon sx={{ color: pink[500] }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
