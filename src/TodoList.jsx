import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

// Add the icons to the library
library.add(faTrash, faArrowUp, faArrowDown);

function TodoList() {
  const [Task, setTask] = useState(["Do Home Work", "Go to bed", "Watch Film"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }
  function addTask() {
    if (newTask !== "") {
      setTask([...Task, newTask]);
      setNewTask(""); // Clear the input field after adding the task
    }
  }

  function deleteTask(index) {
    setTask(Task.filter((_, i) => i !== index));
    // lọc và xoá phần tử tại vị trí index
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updateTask = [...Task];
      [updateTask[index], updateTask[index - 1]] = [
        updateTask[index - 1],
        updateTask[index],
      ];
      setTask(updateTask); // Update the state with the new task order
    }
  }

  function moveTaskDown(index) {
    if (index < Task.length - 1) {
      const updateTask = [...Task];
      [updateTask[index], updateTask[index + 1]] = [
        updateTask[index + 1],
        updateTask[index],
      ];
      setTask(updateTask); // Update the state with the new task order
    }
  }

  return (
    <>
      <h1>To Do List</h1>
      <div className="TodoList">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="add-button" type="submit" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ol>
        {Task.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <div className="btn-group">
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                <FontAwesomeIcon icon="arrow-up" />
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                <FontAwesomeIcon icon="arrow-down" />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default TodoList;
