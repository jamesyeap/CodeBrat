import { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";

import files from "./files";
import './App.css';

function App() {  
  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    // get reference to editor instance
    editorRef.current = editor;
  }
  
  function handleSubmit() {
    alert(editorRef.current.getValue());    
  }

  const [fileName, setFileName] = useState("Main.java");
  const file = files[fileName];

  return (
    <div className="App">      
      <Editor
        height="80vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
}

export default App;
