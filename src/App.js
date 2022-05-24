/* src/App.js */
import React from 'react';

import Amplify from 'aws-amplify';

import awsExports from './aws-exports';

import Heading from './components/Heading';
import Card from './components/Card'


Amplify.configure(awsExports);


const App = () => {
  return (
    <div className='h-screen bg-gray-100 text-center pt-8'>
      <Heading />
      <Card />
    </div>
  );
};



export default App;
