/* src/App.js */
import React from 'react';

import Amplify from 'aws-amplify';

import awsExports from './aws-exports';

import Heading from './components/Heading';
import Card from './components/Card'


Amplify.configure(awsExports);


const App = () => {
  return (
    <div>
      <Heading />
      <Card />
      
    </div>
  );
};



export default App;
