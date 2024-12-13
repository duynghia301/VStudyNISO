"use client";

import { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface RichTextEditorProps {
  onChange: (value: string) => void;
  value: string;
}

const RichTextEditor = ({
  onChange,
  value,
}: RichTextEditorProps) => {
  const contentBlock = htmlToDraft(value);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorStateInit = EditorState.createWithContent(contentState);

  const [editorState, setEditorState] = useState(editorStateInit);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <div className="bg-white">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

// Export component
export default RichTextEditor;
