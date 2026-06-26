import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);

const [showUpdateModal, setShowUpdateModal] = useState(false);
const [updateId, setUpdateId] = useState(null);
const [updateText, setUpdateText] = useState("");
  const getTodos = async () => {
    const response = await axios.get("https://todo-backend-q73v.onrender.com/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post("https://todo-backend-q73v.onrender.com/todos", {
      desc: todo,
      completed: false,
    });

    setTodo("");
    getTodos();
  };

  const deleteTodo = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};
 

  
const updateTodo = (id, oldDesc) => {
  setUpdateId(id);
  setUpdateText(oldDesc);
  setShowUpdateModal(true);
};
   const markAsCompleted = async (id) => {
  console.log("Mark button clicked");

  await axios.put(`https://todo-backend-q73v.onrender.com/todos/${id}`, {
    completed: true,
  });

  getTodos();

  toast.success("Todo marked as completed");
};
const saveUpdatedTodo = async () => {
  await axios.put(`https://todo-backend-q73v.onrender.com/todos/${updateId}`, {
    desc: updateText,
  });

  getTodos();
  setShowUpdateModal(false);

  toast.success("Your todo is updated");
};

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300
    flex flex-col items-center p-5">

      <h1 className="text-5xl font-extrabold
       mb-5 text-black">
  
        Todo App
        </h1>

      <div>
        <input className="flex items-center bg bg-white p-3
        rounded-lg shadow-md"
  type="text"
  placeholder="Enter Todo"
  value={todo} 
  onChange={(e) => setTodo(e.target.value)}
  className="border border-gray-300 p-2 rounded w-50 focus:outline-none
  focus:ring-2 focus:ring-blue-500"
/>

        <button onClick={addTodo}
        className="ml-4 bg-blue-500 text-white
        px-5 py-2 rounded"
        >Add Todo</button>
        <ToastContainer />
      </div>

      {todos.map((item) => (
        <div
          key={item._id}
          className="bg-blue-50 rounded-1g p-2
          mt-2 w-96 text-center shadow-lg
          hover:scale-105 transition duration-300"
        >
    
          <h3 className="text-xl font-bold">
  {item.desc}
</h3>

<p className="mt-2 text-green-600 font-semibold">
  {item.completed ? "Completed" : "Pending"}
</p>

        <div className="flex
        justify-center gap-2 mt-4">

          <button
             onClick={() => deleteTodo(item._id)}
             className="bg-red-500 text-white px-2
             py-1 rounded m-5 "
           >
                Delete
               </button>


          <button
onClick={() => 
  updateTodo(item._id, item.desc)}
className="bg-green-600 text-white
px-2 py-1 rounded m-5"
>
Update
</button>
          <button
  onClick={() => markAsCompleted(item._id)}
  className="bg-yellow-500 text-white px-3
  py-2 rounded m-3"
>
  Mark as Completed
</button>
    </div>  
    </div>
  
))}
{showUpdateModal && (
  <div className="fixed inset-0  flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg shadow-lg ">
      <h2 className="text-xl font-bold mb-3">Update Todo</h2>

      <input
        type="text"
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <div className="mt-3">
        <button
          onClick={saveUpdatedTodo}
          className="bg-green-500 text-white px-3 py-2 rounded mr-2"
        >
          Save
        </button>

        <button
          onClick={() => setShowUpdateModal(false)}
          className="bg-gray-500 text-white px-3 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{showDeleteModal && (
  <div className="fixed inset-0  flex justify-center items-center">
    <div className="bg-white p-3 not-first:rounded-lg shadow-lg w-64">
      <h2 className="text-xl font-bold mb-3">
        Delete Todo?
      </h2>

      <p className="mb-3">
        Are you sure you want to delete this todo?
      </p>

      <button
        onClick={async () => {
          await axios.delete(`https://todo-backend-q73v.onrender.com/todos/${deleteId}`);
          getTodos();
          setShowDeleteModal(false);
          toast.success("Todo deleted");
        }}
        className="bg-red-500 text-white px-4 py-1 rounded "
      >
        Yes
      </button>

      <button
        onClick={() => setShowDeleteModal(false)}
        className="bg-gray-500 text-white px-4 py-1 rounded"
      >
        No
      </button>
    </div>
  </div>
)}
</div>
  );
}


export default App;