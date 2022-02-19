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
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { taskId: 1, check: true, taskName: "First Item" },
    { taskId: 2, check: false, taskName: "Second Item" },
    { taskId: 3, check: false, taskName: "Third Item" },
  ]);

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
