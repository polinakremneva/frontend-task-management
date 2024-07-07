import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import api from "@/services/api.service";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const { loggedInUser } = useAuth();
  const [details, setDetails] = useState({});
  const currentUserId = loggedInUser ? loggedInUser._id : null;

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        if (currentUserId && taskId) {
          const response = await api.get(`/task/${taskId}`); // Обновленный путь запроса
          setDetails(response.data); // Установка данных задачи в состояние details
        }
      } catch (error) {
        console.error("Error while fetching task details", error);
      }
    };

    fetchTaskDetails();
  }, [currentUserId, taskId]); // Зависимости: currentUserId и taskId

  return (
    <div>
      <h2>{details.title}</h2>
      <p>{details.description}</p>
      <p>{details.body}</p>
      <ul>
        {details.todoList &&
          details.todoList.map((todo) => <li key={todo._id}>{todo.title}</li>)}
      </ul>
    </div>
  );
};

export default TaskDetailsPage;
