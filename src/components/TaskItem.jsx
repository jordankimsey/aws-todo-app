import React from 'react';
import {FaCheck} from 'react-icons/fa'

const TaskItem = ({ todo, isComplete }) => {
  

  return (
    <div className='p-2 border-b border-gray-100 flex items-center' >
      <div>
        <button className={`border rounded-full p-2 ${isComplete ? 'border-green-500' : 'border-gray-300'}`}>
          {isComplete && <FaCheck className='text-green-500' />}
        </button>
      </div>
      <p className={`pl-2 ${isComplete && 'line-through text-gray-300'}`}>
        {todo}
      </p>
    </div>
  );
};

export default TaskItem;
