import React, {useState} from 'react';
import { FaCheck } from 'react-icons/fa';
import { API, graphqlOperation } from 'aws-amplify';
import { updateTodo, deleteTodo } from '../graphql/mutations';



const TaskItem = ({ todo, isComplete, ID, fetch}) => {
  const [toggleComplete, setToggleComplete] = useState(isComplete);

  const todoDetails = {
    id: ID,
    isComplete: toggleComplete,
  };

async function updateComplete() {
  try {
    setToggleComplete(!toggleComplete)
    await API.graphql(graphqlOperation(updateTodo, { input: todoDetails }))
    console.log('Updated Completed!');
    fetch()
  } catch (err) {
    console.log({ err });
  }
}

  // async function submitNewContact() {
  //   try {
  //     await API.graphql({
  //       query: createContact,
  //       variables: {
  //         input: {
  //           name: formState.name,
  //           phone: formState,
  //           phone,
  //         },
  //       },
  //     });
  //     console.log('New contact created!');
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // }




  return (
    <div className='p-2 border-b border-gray-100 flex items-center' onClick={updateComplete}>
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
