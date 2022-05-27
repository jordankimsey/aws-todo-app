import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo } from '../graphql/mutations';
import {
  listTodos,
  listCompletedTodos,
  listActiveTodos,
} from '../graphql/queries';
import TaskItem from './TaskItem';
import ItemsLeft from './ItemsLeft';
import { FaChevronDown } from 'react-icons/fa';
import {
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
} from '../graphql/subscriptions';

const initialState = { task: '', isComplete: '' };

const Card = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
    fetchActiveCount();
    subscribeToUpdate();
    subscribeToCreate();
    subscribeToDelete();
  }, []);

  function subscribeToUpdate() {
    API.graphql({
      query: onUpdateTodo,
    }).subscribe({
      next: (messageData) => {
        fetchActiveCount();
      },
    });
  }

  function subscribeToCreate() {
    API.graphql({
      query: onCreateTodo,
    }).subscribe({
      next: (messageData) => {
        fetchTodos();
        fetchActiveCount();
      },
    });
  }

  function subscribeToDelete() {
    API.graphql({
      query: onDeleteTodo,
    }).subscribe({
      next: (messageData) => {
        fetchTodos();
        fetchActiveCount();
      },
    });
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  //fetch completed todos works
  async function fetchCompleted() {
    try {
      const todoData = await API.graphql(graphqlOperation(listCompletedTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      setCompletedTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  //fetch active todos
  async function fetchActive() {
    try {
      const todoData = await API.graphql(graphqlOperation(listActiveTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      setActiveTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  //active count
  async function fetchActiveCount() {
    try {
      const todoData = await API.graphql(graphqlOperation(listActiveTodos));
      const todos = todoData.data.listTodos.items;
      setActiveTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    try {
      if (!formState.task) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }


  //fecth all completed todos, map through get the ID's and delete
  async function clearCompleted() {
    //fetch all active and place them in array to be deleted
    const clearCompleted = await API.graphql(graphqlOperation(listCompletedTodos));
    setCompletedTodos(clearCompleted.data.listTodos.items)  
      
      completedTodos.map((todo) => {
        const deleteSingle = {
          id: todo.id,
        };
        API.graphql(graphqlOperation(deleteTodo, { input: deleteSingle }));
        return console.log(todo.id, 'Successfully Deleted');
      })
  }

  return (
    <div className='container-sm mx-auto relative h-3/6 bg-white border rounded-sm border-gray-300 shadow-md w-5/6 md:w-3/5 lg:w-2/6 text-left'>
      <div className='relative flex items-center text-gray-300 focus-within:text-gray-500'>
        <FaChevronDown className='absolute ml-2' />
        <input
          onChange={(event) => setInput('task', event.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          value={formState.task}
          placeholder='What needs to be done?'
          className='w-full cursor-pointer p-3 border-b-2 pl-8 focus:outline-none'
        />
      </div>
      <div className='flex flex-col'>
        {todos.map((todo, index) => (
          // <div className='flex flex-col' key={todo.id ? todo.id : index}>
          <TaskItem
            ID={todo.id}
            todo={todo.task}
            key={todo.id ? todo.id : index}
            isComplete={todo.isComplete}
            fetch={fetchTodos}
          />
          // </div>
        ))}
      </div>
      <div className='text-gray-300 flex justify-between border-t absolute bottom-0 left-0 right-0 border-gray-100 p-3'>
        <ItemsLeft numberofitems={activeTodos.length} />
        <div className='flex'>
          <button
            onClick={fetchTodos}
            className='pr-2 pl-2 hover:text-slate-400 active:border'
          >
            All
          </button>
          <button
            onClick={fetchActive}
            className='pr-2 pl-2 hover:text-slate-400 active:border'
          >
            Active
          </button>
          <button
            onClick={fetchCompleted}
            className='pr-2 pl-2 hover:text-slate-400 active:border'
          >
            Completed
          </button>
        </div>
        <div>
          <button onClick={clearCompleted} className='hover:text-slate-400'>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
