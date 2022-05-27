/* src/App.js */
import React from 'react';

//import components
import Heading from './components/Heading';
import Card from './components/Card';

//AWS Amplify Configure
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
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
