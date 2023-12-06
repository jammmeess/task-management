"use client"

import { ITask } from "@/types/task";
import Task from "./Task";
import React from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoListProps {
    task: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({task}) => {
  const router = useRouter();
 
const sortedTasks = [...task].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return  <div className="class">
  <table className="table table-bordered">
    <thead className="bg-sky-300 outline">
      <tr>
        <th className="text-black text-lg">Task</th>
        <th className="text-black text-lg">Date to be accomplished</th>
        <th className="text-black text-lg">Actions</th>
      </tr>
    </thead>

    <tbody >
        {sortedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
    </tbody>

  </table>
</div>;
};

export default TodoList;