import React from 'react';
import {Todo} from '../model';
import SingleTodo from './SingleTodo';
import {Droppable} from "react-beautiful-dnd";
import './styles.css'

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className={'container'}>
            <Droppable droppableId='TodosList'>
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="todos__title">Active Tasks</span>
                        {todos.map((todo, index) => (
                            <SingleTodo index={index}
                                        todo={todo}
                                        todos={todos}
                                        setTodos={setTodos}
                                        key={todo.id}/>))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemoveList'>
                {(provided, snapshot) => (
                    <div
                        className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <span className="todos__title">Completed Tasks</span>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo index={index}
                                        todo={todo}
                                        todos={completedTodos}
                                        setTodos={setCompletedTodos}
                                        key={todo.id}/>))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList;