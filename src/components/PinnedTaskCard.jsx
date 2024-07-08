import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { TbPinnedFilled } from "react-icons/tb";
import { CheckCircle, Circle } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

const PinnedTaskCard = ({
  task,
  taskColors,
  handlePinToggle,
  handleDeleteTask,
  handleTodoToggle,
  handleUpdateTask,
}) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
  });

  const inputRef = useRef(null);

  const handleEditMode = (taskId, title, description) => {
    setEditTaskId(taskId);
    setEditTaskData({ title, description });
  };

  const handleBlur = async (taskId) => {
    try {
      await handleUpdateTask(taskId, editTaskData);
      setEditTaskId(null);
    } catch (error) {
      console.error("Error while handling blur", error);
    }
  };

  const handleKeyPress = async (event, taskId) => {
    if (event.key === "Enter" || event.key === "Escape") {
      try {
        await handleUpdateTask(taskId, editTaskData);
        setEditTaskId(null);
      } catch (error) {
        console.error("Error while handling key press", error);
      }
    }
  };

  return (
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
              <h2 className="text-lg font-bold text-gray-800">{task.title}</h2>
            </Link>
          </CardTitle>
        )}
        <div className="flex flex-row gap-2">
          <button>
            <AiFillEdit
              size={20}
              onClick={() =>
                handleEditMode(task._id, task.title, task.description)
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
                  todo.isComplete ? "bg-purple-500 text-white" : "bg-purple-50"
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
  );
};

export default PinnedTaskCard;
