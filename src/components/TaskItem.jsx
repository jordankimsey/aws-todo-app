import React from 'react';
import {FaCheck} from 'react-icons/fa'

const TaskItem = ({todo}) => {
  return (
    <div className='p-2 border-b border-gray-100 flex items-center'>
      <div>
        <button className='border border-gray-300 rounded-full p-2 text-green-500'>
          <FaCheck />{' '}
        </button>
          </div>
          <p className='pl-2'>{ todo}</p>
    </div>
  );
};

export default TaskItem;
