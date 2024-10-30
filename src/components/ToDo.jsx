import React, { useEffect, useRef, useState } from 'react';
import './ToDo.css';
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form';

const ToDo = () => {
    const [todo, setTodo] = useState('');
    const [editId, setEditId] = useState(0);

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addToDo = () => {
        const trimmedTodo = todo.trim();
        const isDuplicate = todos.some(item => item.list.toLowerCase() === trimmedTodo.toLowerCase());

        if (!trimmedTodo || isDuplicate) {
            if (isDuplicate) toast.error('Task already exist');
            return;
        }
        if (editId) {
            setTodos(todos.map(item =>
                item.id === editId ? { ...item, list: trimmedTodo } : item
            ));
            setEditId(0);
        } else {
            setTodos([...todos, { list: trimmedTodo, id: Date.now(), status: false }]);
        }
        setTodo('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addToDo();
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
        if (editId === id) {
            setTodo('')
            setEditId(0)
        }
        toast.success('Task has been deleted');
    };

    const handleCompletion = (id) => {
        const updatedTodos = todos.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
        setTodos(updatedTodos);
    };

    const onEdit = (id) => {
        const editTodo = todos.find((item) => item.id === id);
        setTodo(editTodo.list);
        setEditId(editTodo.id);
    };

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <Form todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} editId={editId} inputRef={inputRef} />
            <div className='list'>
                <ul>
                    {todos.map((item, index) => (
                        <li key={index} className='list-items'>
                            <div className={`list-items-list ${item.status ? 'task-completed' : ''}`}>{item.list}</div>
                            <span>
                                <IoMdDoneAll className='list-item-icons' id='complete' onClick={() => handleCompletion(item.id)} />
                                <FiEdit className='list-item-icons' id='edit' onClick={() => onEdit(item.id)} />
                                <MdDelete className='list-item-icons' id='delete' onClick={() => handleDelete(item.id)} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <Toaster position="top-right" reverseOrder={false}/>
        </div>
    );
};

export default ToDo;