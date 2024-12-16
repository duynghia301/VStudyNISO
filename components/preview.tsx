"use client";

import { ContentState, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';

interface PreviewProps {
  value: string;
}

const Preview = ({
  value,
}: PreviewProps) => {
  const contentBlock = htmlToDraft(value);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarHidden
        readOnly
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
      />
    </div>
  );
};

export default Preview;
