import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Editor from './components/Editor';

const App: React.FC = (props) => {
  return (
    <Router>
      <Editor />
    </Router>
  );
};

export default App;
