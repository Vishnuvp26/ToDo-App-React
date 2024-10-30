import React from 'react'

const Form = ({ todo, setTodo, handleSubmit, editId, inputRef }) => {
    return (
        <>
            <form className='form-group' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo}
                    ref={inputRef}
                    placeholder='Enter your task'
                    onChange={(event) => setTodo(event.target.value)}
                />
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
            </form>
        </>
    );
};

export default Form;