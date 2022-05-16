import { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

import files from "./files";
import { AWS_API_BASE_URL } from "../../constants";

function CodeEditor() {
	const editorRef = useRef(null);
	const [fileName, setFileName] = useState("Main.java");
  
	function handleEditorDidMount(editor, monaco) {
		// get reference to editor instance
		editorRef.current = editor;
	}

	function handleSaveFile() {
		const saveEndpoint = '/kattis/saveattempt';
		const editorCode = getCodeFromEditor();
		
		const HARDCODED_USERNAME_FOR_TESTING = 'jamesyeap';
		const HARDCODED_PROBLEM_ID_FOR_TESTING = 'grasshopper';
		const HARDCODED_LANGUAGE_FOR_TESTING = 'java';

		axios.post(AWS_API_BASE_URL.concat(saveEndpoint), {
				'username': HARDCODED_USERNAME_FOR_TESTING,
				'problem_id': HARDCODED_PROBLEM_ID_FOR_TESTING,
				'language': HARDCODED_LANGUAGE_FOR_TESTING,
				'code': editorCode
			}
		)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	function handleSubmit() {				
		const submitEndpoint = '/kattis/submit';
		
		const HARDCODED_USERNAME_FOR_TESTING = 'jamesyeap';
		const HARDCODED_PROBLEM_ID_FOR_TESTING = 'akcija';
	
		axios.post(AWS_API_BASE_URL.concat(submitEndpoint), {
				'username': HARDCODED_USERNAME_FOR_TESTING,
				'problem_id': HARDCODED_PROBLEM_ID_FOR_TESTING
			}
		)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	function getCodeFromEditor() {
		return editorRef.current.getValue();
	}
  
	const file = files[fileName];
  
	return (
	  <Stack direction="column" spacing={1}>
		<Editor
		  height="80vh"
		  width="75vw"
		  theme="vs-dark"
		  path={file.name}
		  defaultLanguage={file.language}
		  defaultValue={file.value}
		  onMount={handleEditorDidMount}
		/>
		
		<Stack direction="row" justifyContent="flex-end" spacing={1}>
			<Button  disabled onClick={handleSaveFile}>Save Attempt</Button>
			<Button variant="contained" disabled onClick={handleSubmit}>Submit</Button>
		</Stack>	
	  </Stack>
	);
}

export default CodeEditor;