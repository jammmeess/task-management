"use client"

import { FaPlusCircle } from "react-icons/fa";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";


const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
      date: newTaskDate,
      isImportant: isImportant,
      isCompleted: false
    });
    setNewTaskValue("");
    setNewTaskDate("");
    setIsImportant(false);
    setModalOpen(false);
    router.refresh();
  };

  const handleDateChange = (selectedDate: string) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setNewTaskDate(selectedDate < currentDate ? currentDate : selectedDate);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn bg-sky-500 outline">
      Add a new task<FaPlusCircle />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo} className="p-4">
          <h3 className="font-bold text-lg mb-4">Add New Task</h3>
          <div className="modal-action block">
            <div className="mb-4">
              <label className="text-gray-700 text-sm font-bold mb-2">
                Task:
              </label>
              <input
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mb-3"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date:
              </label>
              <input
                value={newTaskDate}
                onChange={(e) => handleDateChange(e.target.value)}
                type="date"
                className="input input-bordered mb-3"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Important:
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isImportant}
                  onChange={() => setIsImportant(!isImportant)}
                  className="mb-2"
                />
                <span className="ml-2 mb-2">Urgent!</span>
              </label>

              <button className="btn bg-sky-300" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;