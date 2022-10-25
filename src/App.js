import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Planets from './components/Planets';
import Provider from './context/myProvider';

function App() {
  return (
    <Provider>
      <Filters />
      <Planets />
    </Provider>
  );
}

export default App;
