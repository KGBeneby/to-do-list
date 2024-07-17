import "./styles.css";
import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isTearing, setIsTearing] = useState(false);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, isCompleted: false }]);
      setInput("");
    }
  };

  const toggleCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const deleteAllTasks = () => {
    setIsTearing(true);
    setTimeout(() => {
      setTasks([]);
      setIsTearing(false);
    }, 800);
  };

  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="ToDoList" style={{ position: "relative" }}>
      {" "}
      <h2>To-Do List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={deleteAllTasks}>Delete All Tasks</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`${task.isCompleted ? "completed" : ""} ${
              isTearing ? "tearingAway" : ""
            }`}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.text}
            <button onClick={() => toggleCompletion(index)}>
              {task.isCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="counter">
        Total Tasks: {tasks.length} | Completed: {completedTasksCount}
      </div>
    </div>
  );
}

export default ToDoList;
