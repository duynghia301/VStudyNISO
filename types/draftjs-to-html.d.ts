declare module 'draftjs-to-html' {
    import { RawDraftContentState } from 'draft-js';
  
    function draftToHtml(contentState: RawDraftContentState): string;
  
    export default draftToHtml;
  }
  