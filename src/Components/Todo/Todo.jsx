// Importing important things..
import React, { useState } from "react";

// Todo component, export default means it can be used in other files
export default function Todo() {
  // Variables.. todo is the variable and setTodos is the way that I deal with this value
  const [todos, setTodos] = useState([
    // Array of objects, completed is the completion status of the todo
    { id: 1, text: "Item 1", completed: false },
    { id: 2, text: "Item 2", completed: false },
    { id: 3, text: "Item 3", completed: false },
    { id: 4, text: "Item 4", completed: false },
  ]);

  // Variables... useState("") default value is nothing
  const [newTodo, setNewTodo] = useState(""); // For adding a new item
  const [editingId, setEditingId] = useState(null); // For tracking the editing item
  const [editedText, setEditedText] = useState(""); // For editing item text

  // Change the completion status of the todo
  function handleClick(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Delete the todo item
  function deleteItem(id) {
    // Filter out the todo item with the given id
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function addItem() {
    if (newTodo.trim() === "") return; // Prevent adding empty items
    const newItem = {
      // Unique id for each todo item to prevent editing duplicate items
      id: Date.now(),
      // Actual text from the input field
      text: newTodo,
      completed: false,
    };
    //
    setTodos((prevTodos) => [...prevTodos, newItem]);
    setNewTodo(""); // Clear input field
  }

  function startEditing(id, text) {
    setEditingId(id);
    setEditedText(text);
  }

  function saveEdit(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      )
    );
    setEditingId(null); // Exit edit mode
    setEditedText(""); // Clear edit field
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="border-2 border-gray-600 rounded-md bg-white p-8 w-96">
        <h3 className="font-bold text-2xl mb-4">Things to do</h3>
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow border border-gray-300 px-2 py-1 rounded-md"
          />
          <button
            className="ml-2 bg-blue-500 px-4 py-1 text-white rounded-md"
            onClick={addItem}
          >
            Add
          </button>
        </div>
        <ul className="text-semibold text-lg space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              {editingId === todo.id ? (
                <div className="flex items-center w-full space-x-2">
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="flex-grow border border-gray-300 px-2 py-1 rounded-md"
                  />
                  <button
                    className="bg-green-500 px-3 py-1 text-white rounded-md"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span
                    onClick={() => handleClick(todo.id)}
                    className={`cursor-pointer ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.completed ? "✅" : "⬜"} {todo.text}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 text-white rounded-md"
                      onClick={() => startEditing(todo.id, todo.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 px-2 py-1 text-white rounded-md"
                      onClick={() => deleteItem(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
