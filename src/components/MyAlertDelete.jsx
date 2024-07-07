// MyAlertDelete.jsx

import React, { useState } from "react";
import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
} from "./ui/alert-dialog";

const MyAlertDelete = ({ task, onClose, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClose(); // Close the alert dialog
  };

  const handleConfirm = () => {
    onDelete(); // Call onDelete to delete the task
    setIsOpen(false); // Close the alert dialog
  };

  return (
    <ShadcnAlertDialog isOpen={isOpen} onClose={handleCancel}>
      <AlertDialogHeader>Delete Task</AlertDialogHeader>
      <AlertDialogContent>
        <p>Are you sure you want to delete this task?</p>
      </AlertDialogContent>
      <AlertDialogFooter>
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button onClick={handleConfirm} className="btn btn-danger ml-2">
          Delete
        </button>
      </AlertDialogFooter>
    </ShadcnAlertDialog>
  );
};

export default MyAlertDelete;
