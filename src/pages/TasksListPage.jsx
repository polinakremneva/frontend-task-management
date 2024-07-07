import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "react-modal";
import api from "@/services/api.service";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { CheckCircle, Circle } from "react-feather"; // Example icons for checkboxes and pinning
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import TaskDetailsPage from "./TaskDetailsPage"; // Adjust path as needed

Modal.setAppElement("#root");

const TasksListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskColors, setTaskColors] = useState({});
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
  });

  const { loggedInUser } = useAuth();
  const currentUserId = loggedInUser ? loggedInUser._id : null;

  const lightBackgrounds = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-indigo-200",
    "bg-red-200",
    "bg-teal-200",
    "bg-cyan-200",
  ];

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        if (currentUserId) {
          const response = await api.get(`/task`);
          setTasks(response.data);
          const colors = {};
          response.data.forEach((task) => {
            if (!taskColors[task._id]) {
              colors[task._id] = getRandomBackground();
            }
          });
          setTaskColors((prevColors) => ({ ...prevColors, ...colors }));
        }
      } catch (error) {
        console.error("Error while fetching tasks", error);
      }
    };

    fetchUserTasks();
  }, [currentUserId]);

  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * lightBackgrounds.length);
    return lightBackgrounds[randomIndex];
  };

  const inputRef = useRef(null);

  const handleTodoToggle = async (taskId, todoIndex) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          const updatedTodoList = task.todoList.map((todo, index) => {
            if (index === todoIndex) {
              return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
          });
          return { ...task, todoList: updatedTodoList };
        }
        return task;
      });

      setTasks(updatedTasks);

      // Prepare the updated todoList to send to the server
      const updatedTodoList = updatedTasks.find(
        (task) => task._id === taskId
      ).todoList;

      // Update the server with the new todoList
      await api.post(`/task/${taskId}`, { todoList: updatedTodoList });
    } catch (error) {
      console.error("Error while toggling todo", error);
    }
  };

  const handlePinToggle = async (taskId) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, isPinned: !task.isPinned };
        }
        return task;
      });

      setTasks(updatedTasks);

      // Update the server with the new pinned status
      await api.post(`/task/${taskId}`, {
        isPinned: updatedTasks.find((task) => task._id === taskId).isPinned,
      });
    } catch (error) {
      console.error("Error while toggling pin", error);
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await api.post(`/task/${taskId}`, {
        title: editTaskData.title,
        description: editTaskData.description,
      });

      // Update local state after successful API call
      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              title: editTaskData.title,
              description: editTaskData.description,
            }
          : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskData({ title: "", description: "" });
    } catch (error) {
      console.error("Error while updating task", error);
    }
  };

  const handleEditMode = (taskId, title, description) => {
    setEditTaskId(taskId);
    setEditTaskData({ title, description });
  };

  const handleBlur = async (taskId) => {
    try {
      await handleUpdateTask(taskId);
    } catch (error) {
      console.error("Error while handling blur", error);
    }
  };

  const handleKeyPress = async (event, taskId) => {
    if (event.key === "Enter" || event.key === "Escape") {
      try {
        await handleUpdateTask(taskId);
      } catch (error) {
        console.error("Error while handling key press", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error while deleting task", error);
    }
  };

  // Separate pinned and other tasks
  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const otherTasks = tasks.filter((task) => !task.isPinned);

  return (
    <div className="px-[5.5em] py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pinned Tasks</h2>
        <Carousel>
          <CarouselContent>
            {pinnedTasks.map((task) => (
              <CarouselItem key={task._id} className="max-w-[20em]">
                <Card // Open modal on card click
                  className={`bg-white shadow-md transition duration-300 transform hover:scale-100 hover:shadow-lg ${
                    taskColors[task._id]
                  } max-w-sm cursor-pointer `}
                >
                  <CardHeader className="bg-purple-100 p-3 flex-row justify-between shadow-md items-center">
                    {editTaskId === task._id ? (
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
                        onBlur={() => handleBlur(task._id)}
                        onKeyDown={(e) => handleKeyPress(e, task._id)}
                        className="w-full bg-transparent border-none outline-none"
                      />
                    ) : (
                      <CardTitle className="text-lg font-bold text-gray-800">
                        <Link to={`/task/${task._id}`}>
                          <h2 className="text-lg font-bold text-gray-800">
                            {task.title}
                          </h2>
                        </Link>
                      </CardTitle>
                    )}
                    <div className=" flex flex-row gap-2">
                      <button>
                        <AiFillEdit
                          size={20}
                          onClick={() =>
                            handleEditMode(
                              task._id,
                              task.title,
                              task.description
                            )
                          }
                        />
                      </button>
                      <button
                        onClick={() => handlePinToggle(task._id)}
                        className={`focus:outline-none ${
                          task.isPinned ? "text-black" : "text-white"
                        }`}
                      >
                        <TbPinnedFilled size={20} />
                      </button>
                      <button onClick={() => handleDeleteTask(task._id)}>
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 text-wrap">
                    {editTaskId === task._id ? (
                      <textarea
                        type="text"
                        value={editTaskData.description}
                        onChange={(e) =>
                          setEditTaskData((prevData) => ({
                            ...prevData,
                            description: e.target.value,
                          }))
                        }
                        onBlur={() => handleBlur(task._id)}
                        onKeyDown={(e) => handleKeyPress(e, task._id)}
                        className="w-full bg-transparent border-none outline-none"
                        onFocus={(e) => e.target.select()}
                      />
                    ) : (
                      <CardDescription className="text-gray-600 font-semibold">
                        {task.description}
                      </CardDescription>
                    )}
                  </CardContent>
                  <CardContent className="p-4">
                    <p className="text-gray-700 font-medium mb-2">Todos:</p>
                    {task.todoList.map((todo, index) => (
                      <div
                        key={`${task._id}-${index}`}
                        className={`flex items-center mb-2 ${
                          index !== task.todoList.length - 1
                            ? "border-b border-b-slate-400 pb-2"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={todo.isComplete}
                          onChange={() => handleTodoToggle(task._id, index)}
                          id={`${task._id}-${index}`}
                          className="hidden"
                        />
                        <label
                          htmlFor={`${task._id}-${index}`}
                          className="flex items-center cursor-pointer select-none"
                        >
                          <span
                            className={`rounded-full p-1 mr-2 ${
                              todo.isComplete
                                ? "bg-purple-500 text-white"
                                : "bg-purple-50"
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
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {todo.title}
                          </span>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-purple-900 left-[-2.5em]" />
          <CarouselNext className="text-purple-900 right-[-2.5em]" />
        </Carousel>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unpinned Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {otherTasks.map((task) => (
            <Card
              key={task._id}
              className={`bg-white shadow-md transition duration-300 transform hover:scale-100 hover:shadow-lg ${
                taskColors[task._id]
              } max-w-sm `}
            >
              <CardHeader className="bg-purple-100 p-3 flex-row justify-between items-center">
                {editTaskId === task._id ? (
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
                    onBlur={() => handleBlur(task._id)}
                    onKeyDown={(e) => handleKeyPress(e, task._id)}
                    className="w-full bg-transparent border-none outline-none"
                  />
                ) : (
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {task.title}
                  </CardTitle>
                )}
                <div className=" flex flex-row gap-2">
                  <button>
                    <AiFillEdit
                      size={20}
                      onClick={() =>
                        handleEditMode(task._id, task.title, task.description)
                      }
                    />
                  </button>
                  <button onClick={() => handlePinToggle(task._id)}>
                    <TbPinned size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {editTaskId === task._id ? (
                  <textarea
                    type="text"
                    value={editTaskData.description}
                    onChange={(e) =>
                      setEditTaskData((prevData) => ({
                        ...prevData,
                        description: e.target.value,
                      }))
                    }
                    onBlur={() => handleBlur(task._id)}
                    onKeyDown={(e) => handleKeyPress(e, task._id)}
                    className="w-full bg-transparent border-none outline-none"
                    onFocus={(e) => e.target.select()}
                  />
                ) : (
                  <CardDescription className="text-gray-600 font-semibold">
                    {task.description}
                  </CardDescription>
                )}
              </CardContent>
              <CardContent className="p-4">
                <p className="text-gray-700 font-medium mb-2">Todos:</p>
                {task.todoList.map((todo, index) => (
                  <div
                    key={`${task._id}-${index}`}
                    className={`flex items-center mb-2 ${
                      index !== task.todoList.length - 1
                        ? "border-b border-b-slate-400 pb-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={() => handleTodoToggle(task._id, index)}
                      id={`${task._id}-${index}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`${task._id}-${index}`}
                      className="flex items-center cursor-pointer select-none"
                    >
                      <span
                        className={`rounded-full p-1 mr-2 ${
                          todo.isComplete
                            ? "bg-purple-500 text-white"
                            : "bg-purple-50"
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
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </span>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksListPage;
