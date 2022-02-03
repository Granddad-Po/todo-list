import React, {useEffect, useRef, useState} from 'react';
import {Todo} from '../model';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import './styles.css';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo));
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )));
        setEdit(false);
    }
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit]);

    return (
        <form className={'todos-single'} onSubmit={(e) => handleEdit(e, todo.id)}>
            { edit ? <input ref={inputRef}
                            value={editTodo}
                            className={'todos-single__text'}
                            onChange={(e) => setEditTodo(e.target.value)} /> : (todo.isDone ?
                    <s className="todos-single__text">{todo.todo}</s>
                    : <span className="todos-single__text">{todo.todo}</span>
            )}

            <div>
                <span className="todo-single__icon"
                      onClick={() => {
                          if (!edit && !todo.isDone) {
                              setEdit(!edit)
                          }
                      }}>
                    <AiFillEdit/>
                </span>
                <span className="todo-single__icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete/>
                </span>
                <span className="todo-single__icon" onClick={() => handleDone(todo.id)}>
                    <MdDone/>
                </span>
            </div>
        </form>
    )
}

export default SingleTodo;