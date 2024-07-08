import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import api from "@/services/api.service";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { CheckCircle, Circle } from "react-feather";
import { PiExclamationMarkBold } from "react-icons/pi";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const { loggedInUser } = useAuth();
  const [details, setDetails] = useState({});
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
  });
  const currentUserId = loggedInUser ? loggedInUser._id : null;

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        if (currentUserId && taskId) {
          const response = await api.get(`/task/${taskId}`);
          setDetails(response.data);
        }
      } catch (error) {
        console.error("Error while fetching task details", error);
      }
    };

    fetchTaskDetails();
  }, [currentUserId, taskId]);

  const inputRef = useRef(null);

  const handleUpdateTask = async () => {
    try {
      await api.post(`/task/${taskId}`, {
        title: editTaskData.title,
        description: editTaskData.description,
      });

      setDetails((prevDetails) => ({
        ...prevDetails,
        title: editTaskData.title,
        description: editTaskData.description,
      }));

      setEditTaskId(null);
      setEditTaskData({ title: "", description: "" });
    } catch (error) {
      console.error("Error while updating task", error);
    }
  };

  const handleEditMode = () => {
    setEditTaskId(taskId);
    setEditTaskData({ title: details.title, description: details.description });
  };

  const handleBlur = async () => {
    try {
      await handleUpdateTask();
    } catch (error) {
      console.error("Error while handling blur", error);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      try {
        await handleUpdateTask();
      } catch (error) {
        console.error("Error while handling key press", error);
      }
    }
  };

  const handleTodoToggle = async (todoIndex) => {
    try {
      const updatedTodoList = details.todoList.map((todo, index) =>
        index === todoIndex ? { ...todo, isComplete: !todo.isComplete } : todo
      );

      await api.post(`/task/${taskId}`, {
        todoList: updatedTodoList,
      });

      setDetails((prevDetails) => ({
        ...prevDetails,
        todoList: updatedTodoList,
      }));
    } catch (error) {
      console.error("Error while toggling todo", error);
    }
  };

  return (
    <div className="p-6">
      <Card className="bg-white shadow-md max-w-2xl mx-auto transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
        <CardHeader className="bg-purple-200 p-4 rounded-t-lg flex flex-row justify-between items-center">
          {editTaskId === taskId ? (
            <textarea
              ref={inputRef}
              type="text"
              value={editTaskData.title}
              onChange={(e) =>
                setEditTaskData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent border-none outline-none"
            />
          ) : (
            <CardTitle className="text-2xl font-bold text-purple-800">
              {details.title}
            </CardTitle>
          )}
          <button>
            <AiFillEdit
              size={20}
              onClick={handleEditMode}
              className=" dark:text-black"
            />
          </button>
        </CardHeader>
        <CardContent className="p-6 bg-purple-50">
          {editTaskId === taskId ? (
            <textarea
              type="text"
              value={editTaskData.description}
              onChange={(e) =>
                setEditTaskData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent border-none outline-none"
            />
          ) : (
            <CardDescription className="text-lg flex items-center text-purple-700 mb-4">
              <PiExclamationMarkBold className="text-red-700 w-10" size={30} />
              <span className="ml-2">{details.description}</span>
            </CardDescription>
          )}
          <CardDescription className="text-base text-purple-600 mb-4">
            <span className="font-semibold">Main:</span> {details.body}
          </CardDescription>
          <p className="text-lg text-purple-700 font-semibold mb-2">Todos:</p>
          <ul>
            {details.todoList &&
              details.todoList.map((todo, index) => (
                <li
                  key={`${details._id}-${index}`}
                  className={`flex items-center mb-2 ${
                    index !== details.todoList.length - 1
                      ? "border-b border-purple-300 pb-2"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => handleTodoToggle(index)}
                    id={`${details._id}-${index}`}
                    className="hidden"
                  />
                  <label
                    htmlFor={`${details._id}-${index}`}
                    className="flex items-center cursor-pointer select-none w-full"
                  >
                    <span
                      className={`rounded-full p-1 mr-2 ${
                        todo.isComplete
                          ? "bg-purple-500 text-white"
                          : "bg-purple-50 text-purple-500"
                      }`}
                    >
                      {todo.isComplete ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Circle size={18} />
                      )}
                    </span>
                    <span
                      className={`text-lg ${
                        todo.isComplete
                          ? "line-through text-purple-500"
                          : "text-purple-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;
