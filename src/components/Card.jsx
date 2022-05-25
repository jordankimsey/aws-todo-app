import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import TaskItem from './TaskItem';
import ItemsLeft from './ItemsLeft';
import { FaChevronDown } from 'react-icons/fa';

const initialState = { task: '', isComplete: false };

const Card = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
console.log(todos)
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

      {todos.map((todo, index) => (
        <div className='flex flex-col' key={todo.id ? todo.id : index}>
          <TaskItem
            ID={todo.id}
            todo={todo.task}
            isComplete={todo.isComplete}
          />
        </div>
      ))}
      <div className='text-gray-300 flex justify-between border-t absolute bottom-0 left-0 right-0 border-gray-100 p-3'>
        <ItemsLeft numberofitems={3} />
        <div className='flex'>
          <button className='pr-2 pl-2 hover:text-slate-400 active:border'>
            All
          </button>
          <button className='pr-2 pl-2 hover:text-slate-400 active:border'>
            Active
          </button>
          <button className='pr-2 pl-2 hover:text-slate-400 active:border'>
            Completed
          </button>
        </div>
        <div>
          <button className='hover:text-slate-400'>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
