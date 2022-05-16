import { Stack } from '@mui/material';
import CodeEditor from './components/CodeEditor';
import ProblemViewer from './components/ProblemViewer';

function App() {  
  return (
    <div className="App">
      <Stack direction='row'>        
        <ProblemViewer />
        <CodeEditor />
      </Stack>
    </div>
  );
}

export default App;
