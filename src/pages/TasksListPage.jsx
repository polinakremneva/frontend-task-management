import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthProvider";

const TasksListPage = () => {
  const [tasks, setTasks] = useState([]);
  const { loggedInUser } = useAuth();
  const currentUserId = loggedInUser ? loggedInUser._id : null;

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        if (currentUserId) {
          const response = await axios.get(`/api/task`);
          setTasks(response.data);
        }
      } catch (error) {
        console.error("Error while fetching tasks", error);
      }
    };

    fetchUserTasks();
  }, [currentUserId]);

  return (
    <div>
      <h1>Задачи пользователя</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksListPage;
