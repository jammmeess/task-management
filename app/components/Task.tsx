import React from "react";
import { ITask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { EditTodo, deleteTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [dateToEdit, setDateToEdit] = useState<string>(task.date || "");
  const [isImportantToEdit, setIsImportantToEdit] = useState<boolean>(
    task.isImportant || false
  );
  const [isCompletedToEdit, setIsCompletedToEdit] = useState<boolean>(
    task.isCompleted || false
  ); 

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await EditTodo({
      id: task.id,
      text: taskToEdit,
      date: dateToEdit,
      isImportant: isImportantToEdit,
      isCompleted: isCompletedToEdit, 
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const rowClassName = isImportantToEdit ? "important-task" : ""; 
  const completedClassName = isCompletedToEdit ? "completed-task" : ""; 

  return (
    <tr key={task.id} className={`${rowClassName} ${completedClassName}`}>
      <td >{task.text}</td>
      <td >{task.date}</td>
      <td className="flex gap-5">
        
        <FaEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={18}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo} className="p-4">
            <h3 className="font-bold text-lg text-black mb-4">Edit Task</h3>
            <div className="modal-action block">
              <label className="text-gray-700 text-sm font-bold mb-2">
                Task:
              </label>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-3 text-black"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date:
              </label>
              <input
                value={dateToEdit}
                onChange={(e) => setDateToEdit(e.target.value)}
                type="date"
                className="input input-bordered mb-3 text-black"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2 text-black mb-1">
                Important:
              </label>
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  checked={isImportantToEdit}
                  onChange={() =>
                    setIsImportantToEdit(!isImportantToEdit)
                  }
                  className="mb-3"
                />
                <span className="ml-2 mb-3">Mark as important</span>
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-1 text-black">
                Completed:
              </label>
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  checked={isCompletedToEdit}
                  onChange={() =>
                    setIsCompletedToEdit(!isCompletedToEdit)
                  }
                />
                <span className="ml-2">Mark as completed</span>
              </label>
              <button className="btn bg-sky-300 mt-4 outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FaRegTrashCan
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={18}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg text-black">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn bg-red-500 outline">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;