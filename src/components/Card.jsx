import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import TaskItem from './TaskItem';
import ItemsLeft from './ItemsLeft';

const initialState = { task: '', isComplete: false };

const Card = () => {
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);

      useEffect(() => {
        // fetchTodos();
      }, []);
    
      function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
      }
    
    //   async function fetchTodos() {
    //     try {
    //       const todoData = await API.graphql(graphqlOperation(listTodos));
    //       const todos = todoData.data.listTodos.items;
    //       setTodos(todos);
    //     } catch (err) {
    //       console.log('error fetching todos');
    //     }
    //   }
    
    // async function addTodo() {
    //   try {
    //     if (!formState.task) return;
    //     const todo = { ...formState };
    //     setTodos([...todos, todo]);
    //     setFormState(initialState);
    //     await API.graphql(graphqlOperation(createTodo, { input: todo }));
    //   } catch (err) {
    //     console.log('error creating todo:', err);
    //   }
    // }
    
    return (
      <div>
        <input
          onChange={(event) => setInput('task', event.target.value)}
          value={formState.task}
          placeholder='What needs to be done?'
        />
        <button>Create Todo</button>
        {/* <button onClick={addTodo}>Create Todo</button> */}
        <TaskItem />
        {todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index}>
            <p>{todo.task}</p>
            <p>{todo.isComplete}</p>
          </div>
        ))}
            <ItemsLeft numberofitems={ 0}/>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>
                <button>Clear Completed</button>
            </div>
      </div>
    );
};

export default Card;
