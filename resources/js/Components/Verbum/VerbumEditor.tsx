import {FC} from 'react';
import React from 'react';
import {
    EditorComposer,
    Editor,
    ToolbarPlugin,
    AlignDropdown,
    BackgroundColorPicker,
    BoldButton,
    CodeFormatButton,
    FloatingLinkEditor,
    FontFamilyDropdown,
    FontSizeDropdown,
    InsertDropdown,
    InsertLinkButton,
    ItalicButton,
    TextColorPicker,
    TextFormatDropdown,
    UnderlineButton,
    Divider,
} from 'verbum';
import './VerbumEditor.css';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {RevealJS_MarkdownTransformer} from "@/Components/Verbum/custom-plugins/revealjs/RevealJS_MarkdownTransformer";
import {PLAYGROUND_TRANSFORMERS} from "@/Components/Editor/plugins/MarkdownTransformers";
import {LexicalEditor} from "lexical";

const VerbumEditor: FC<{initialEditorState?: string, onChange: (editorState: string, editorInstance?: LexicalEditor) => void }> = ({initialEditorState,onChange}) => {
    return (
        <EditorComposer>
            <Editor hashtagsEnabled={true} actionsEnabled={true} onChange={onChange}>
                <ToolbarPlugin defaultFontSize="20px">
                    <FontFamilyDropdown/>
                    <FontSizeDropdown/>
                    <Divider/>
                    <BoldButton/>
                    <ItalicButton/>
                    <UnderlineButton/>
                    <CodeFormatButton/>
                    <InsertLinkButton/>
                    <TextColorPicker/>
                    <BackgroundColorPicker/>
                    <MarkdownShortcutPlugin transformers={[...PLAYGROUND_TRANSFORMERS, RevealJS_MarkdownTransformer]}/>
                    <TextFormatDropdown/>
                    <Divider/>
                    <InsertDropdown enablePoll={true} enableExcalidraw={true} enableStickyNote={true}/>
                    <Divider/>
                    <AlignDropdown/>
                </ToolbarPlugin>
            </Editor>
        </EditorComposer>
    );
};

export default VerbumEditor;
