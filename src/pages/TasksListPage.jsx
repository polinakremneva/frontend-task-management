import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "react-modal";
import api from "@/services/api.service";
import { Link } from "react-router-dom";
import { MdTipsAndUpdates } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { MdPostAdd } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { LuListTodo } from "react-icons/lu";

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
import { useToast } from "@/components/ui/use-toast";

Modal.setAppElement("#root");

const TasksListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskColors, setTaskColors] = useState({});
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    todoList: [{ title: "", isComplete: false }],
  });

  const { toast } = useToast();

  const { loggedInUser } = useAuth();
  const currentUserId = loggedInUser ? loggedInUser._id : null;

  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    main: "",
    todoList: "",
  });

  const handleNewTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      const response = await api.post("/task", {
        ...newTaskData,
      });

      setTasks([...tasks, response.data]);
      toast({
        title: "The item was added successfuly!",
        className: " bg-purple-100",
      });
    } catch (error) {
      console.error("Error creating new task", error);
    }
  };

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
        todoList: editTaskData.todoList,
      });

      // Update local state after successful API call
      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              title: editTaskData.title,
              description: editTaskData.description,
              todoList: editTaskData.todoList,
            }
          : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskData({
        title: "",
        description: "",
        todoList: [{ title: "", isComplete: false }],
      });
      toast({
        title: "The item was updated successfuly!",
        className: " bg-purple-100",
      });
    } catch (error) {
      console.error("Error while updating task", error);
    }
  };

  const handleTodoTextChange = (taskId, todoIndex, value) => {
    // Update the editTaskData state directly
    setEditTaskData((prevData) => {
      const updatedTodoList = prevData.todoList.map((todo, index) => {
        if (index === todoIndex) {
          return { ...todo, title: value };
        }
        return todo;
      });
      return { ...prevData, todoList: updatedTodoList };
    });

    // Update the tasks state for the corresponding task
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        const updatedTodoList = task.todoList.map((todo, index) => {
          if (index === todoIndex) {
            return { ...todo, title: value };
          }
          return todo;
        });
        return { ...task, todoList: updatedTodoList };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleEditMode = (taskId, title, description, todoList) => {
    setEditTaskId(taskId);
    setEditTaskData({ title, description, todoList });
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
      toast({
        title: "The item was deleted successfuly!",
        className: " bg-purple-100",
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error while deleting task", error);
    }
  };

  // Separate pinned and other tasks
  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const otherTasks = tasks.filter((task) => !task.isPinned);

  return (
    <div className="px-[5.5em] py-10 pb-[5em]">
      <div className="mb-8">
        <div className="flex justify-center items-center bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg p-6 mb-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500">
            <MdTipsAndUpdates size={35} className=" ml-2" />
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Discover Something New!
            </h3>
            <p className="text-gray-600">
              Explore our latest tips and tricks for staying organized and
              productive.
            </p>
          </div>
        </div>
        <h2 className="text-2xl mt-[3em] tracking-wider dark:text-slate-300 font-bold text-purple-950 mb-4">
          Your pinned tasks:
        </h2>
        <div className="flex justify-end mb-4">
          <Popover>
            <PopoverTrigger className="btn my-2 btn-primary font-semibold text-xl uppercase italic flex items-center ">
              <>
                Create New Task
                <MdPostAdd
                  size={33}
                  className=" text-purple-800 animate-bounce font-extrabold mx-3"
                />
              </>
            </PopoverTrigger>
            <PopoverContent align="start" className="mt-2">
              <div className="p-8 space-y-4 bg-purple-200">
                <div className=" flex flex-row items-center gap-8">
                  <h2 className="text-xl font-semibold">Your new task</h2>
                  <LuListTodo size={25} />
                </div>
                <input
                  type="text"
                  name="title"
                  value={newTaskData.title}
                  onChange={handleNewTaskInputChange}
                  placeholder="Title"
                  className="input rounded-md p-2"
                />
                <textarea
                  name="description"
                  value={newTaskData.description}
                  onChange={handleNewTaskInputChange}
                  placeholder="Description"
                  className="textarea rounded-md p-2"
                />
                <textarea
                  name="body"
                  value={newTaskData.body}
                  onChange={handleNewTaskInputChange}
                  placeholder="Body"
                  className="textarea rounded-md p-2"
                />
                <textarea
                  name="todoList"
                  value={newTaskData.todoList}
                  onChange={handleNewTaskInputChange}
                  placeholder="Todos"
                  className="textarea rounded-md p-2"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddTask}
                    className="btn btn-primary text-xl font-medium"
                  >
                    Create task
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Carousel>
          <CarouselContent>
            {pinnedTasks.map((task) => (
              <CarouselItem key={task._id} className="max-w-[20em]">
                <Card
                  className={`bg-white shadow-md transition duration-300 transform hover:scale-100 hover:shadow-lg ${
                    taskColors[task._id]
                  } max-w-sm cursor-pointer`}
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
                    <div className="flex flex-row gap-2">
                      <button>
                        <AiFillEdit
                          size={20}
                          onClick={() =>
                            handleEditMode(
                              task._id,
                              task.title,
                              task.description,
                              task.todoList
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
                            {editTaskId === task._id ? (
                              <textarea
                                type="text"
                                value={todo.title}
                                onChange={(e) =>
                                  handleTodoTextChange(
                                    task._id,
                                    index,
                                    e.target.value
                                  )
                                }
                                onBlur={() => handleBlur(task._id)}
                                onKeyDown={(e) => handleKeyPress(e, task._id)}
                                className="w-full bg-transparent border-none outline-none"
                                onFocus={(e) => e.target.select()}
                              />
                            ) : (
                              todo.title
                            )}
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
              key={task._id} // Add the key prop here
              className={`bg-white shadow-md transition duration-300 transform hover:scale-100 hover:shadow-lg ${
                taskColors[task._id]
              } max-w-sm cursor-pointer`}
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
                <div className="flex flex-row gap-2">
                  <button>
                    <AiFillEdit
                      size={20}
                      onClick={() =>
                        handleEditMode(
                          task._id,
                          task.title,
                          task.description,
                          task.todoList
                        )
                      }
                    />
                  </button>
                  <button onClick={() => handlePinToggle(task._id)}>
                    <TbPinned size={20} />
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
                        {editTaskId === task._id ? (
                          <textarea
                            type="text"
                            value={todo.title}
                            onChange={(e) =>
                              handleTodoTextChange(
                                task._id,
                                index,
                                e.target.value
                              )
                            }
                            onBlur={() => handleBlur(task._id)}
                            onKeyDown={(e) => handleKeyPress(e, task._id)}
                            className="w-full bg-transparent border-none outline-none"
                            onFocus={(e) => e.target.select()}
                          />
                        ) : (
                          todo.title
                        )}
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
