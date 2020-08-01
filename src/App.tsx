import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import MapEditorCyto from './components/MapEditorCyto';
import FlowEditorCyto from './components/FlowEditorCyto';

import ResonanceAudioSandbox from './components/ResonanceAudioSandbox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Button = styled.div`
  cursor: pointer;
`;
const CyWrapper = styled.div`
  height: 500px;
`;
const App: React.FC = (props) => {
  return (
    <Router>
      <Wrapper>
        <h1>CytoScape Demo</h1>
        <Link to='/maps'>Map Editor</Link>
        <Link to='/audio'>resonance-audio</Link>
        <Link to='/flow'>Flow Editor</Link>

        <Switch>
          <Route exact path='/maps' render={(props) => <MapEditorCyto />} />
          <Route exact path='/flow' render={(props) => <FlowEditorCyto />} />

          <Route
            exact
            path='/audio'
            render={(props) => <ResonanceAudioSandbox />}
          />
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default App;
