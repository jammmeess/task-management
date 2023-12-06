import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import Header from "./components/Header";



export default async function Home() {
  const task = await  getAllTodos();
  console.log(task);
  return (
  <main className="max-w-4xl mx-auto mt-4">

    {/* < LogIn />
       */}
      <Header />

      <div className="mb-5">
        <AddTask />
      </div>
      
      <TodoList task={task} />

    </main>
  )
}
