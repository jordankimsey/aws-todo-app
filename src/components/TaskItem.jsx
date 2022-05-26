import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { API, graphqlOperation } from 'aws-amplify';
import { updateTodo, deleteTodo } from '../graphql/mutations';

const TaskItem = ({ todo, isComplete, ID, fetch }) => {
  async function updateComplete() {
    try {
      const todoDetails = {
        id: ID,
        isComplete: !isComplete,
      };
      await API.graphql(graphqlOperation(updateTodo, { input: todoDetails }));
      fetch();
      console.log('Updated Completed!');
    } catch (err) {
      console.log({ err });
    }
  }

  async function deleteSingleTodo() {
    try {
      const deleteSingle = {
        id: ID,
      };
      console.log(deleteSingle.id);
      await API.graphql(graphqlOperation(deleteTodo, { input: deleteSingle }));
      fetch();
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className='p-2 border-b border-gray-100 flex justify-center items-center'>
      <div className='flex flex-1' onClick={updateComplete}>
        <button
          className={`border rounded-full p-2 ${
            isComplete ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          {isComplete && <FaCheck className='text-green-500' />}
        </button>
        <p
          className={`flex-1 pl-2 ${
            isComplete && 'line-through text-gray-300'
          }`}
        >
          {todo}
        </p>
      </div>

      <div className='cursor-pointer' onClick={deleteSingleTodo}>
        <FaTrash className='text-red-600' />
      </div>
    </div>
  );
};

export default TaskItem;
