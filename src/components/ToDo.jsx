import React, { useEffect, useRef, useState } from 'react';
import './ToDo.css';
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";


const ToDo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0)


    const inputRef = useRef('null');
    useEffect(() => {
        inputRef.current.focus();
    });

    const addToDo = () => {
        if (todo) {
            if (editId) {
                setTodos(todos.map((item) =>
                    item.id === editId ? { ...item, list: todo } : item
                ));
                setEditId(0);
            } else {
                setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
            }
            setTodo('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addToDo();
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    };

    const handleCompletion = (id) => {
        let updatedTodos = todos.map((item) => {
            if (item.id === id) {
                return { ...item, status: !item.status };
            }
            return item;
        });
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
            <form className='form-group' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo}
                    ref={inputRef}
                    placeholder='Enter your task'
                    onChange={(event) => setTodo(event.target.value)}
                />
                <button type="submit">{editId? 'Update' : 'Add'}</button>
            </form>
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
        </div>
    );
};

export default ToDo;