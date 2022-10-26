import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from './ui/ContentEditable';
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import PlaygroundEditorTheme from "@/Components/Editor/themes/PlaygroundEditorTheme";
import * as React from 'react';
// import './themes/PlaygroundEditorTheme.css';
import './themes/StickyEditorTheme.css';
import './index.css';
import StickyEditorTheme from "@/Components/Editor/themes/StickyEditorTheme";
import {useRef, useState} from "react";
import {SharedHistoryContext, useSharedHistoryContext} from "@/Components/Editor/context/SharedHistoryContext";
import {TableContext} from "@/Components/Editor/plugins/TablePlugin";
import {SharedAutocompleteContext} from "@/Components/Editor/context/SharedAutocompleteContext";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {MaxLengthPlugin} from "@/Components/Editor/plugins/MaxLengthPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import {HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import CommentPlugin from "@/Components/Editor/plugins/CommentPlugin";
import ErrorBoundary from "@/Components/Editor/ui/ErrorBoundary";
import TableCellResizer from "./plugins/TableCellResizer";
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import ImagesPlugin from "./plugins/ImagesPlugin";
import PollPlugin from "./plugins/PollPlugin";
import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import ClickableLinkPlugin from "./plugins/ClickableLinkPlugin";
import HorizontalRulePlugin from "./plugins/HorizontalRulePlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import FloatingLinkEditorPlugin from "@/Components/Editor/plugins/FloatingLinkEditorPlugin";
import CodeActionMenuPlugin from "@/Components/Editor/plugins/CodeActionMenuPlugin";
import FloatingTextFormatToolbarPlugin from "@/Components/Editor/plugins/FloatingTextFormatToolbarPlugin";
import TableOfContentsPlugin from "@/Components/Editor/plugins/TableOfContentsPlugin";
import AutocompletePlugin from "@/Components/Editor/plugins/AutocompletePlugin";
import ActionsPlugin from "@/Components/Editor/plugins/ActionsPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import ExcalidrawPlugin from "./plugins/ExcalidrawPlugin";
import PlaygroundNodes from "@/Components/Editor/nodes/PlaygroundNodes";

function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}
const initialConfig = {
    editorState: null,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
        throw error;
    },
    theme: PlaygroundEditorTheme,
};


export default function LexicalEditor() {
    const {historyState} = useSharedHistoryContext();
    const scrollRef = useRef(null);
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };
    const placeholder = <Placeholder/>;


    return (
        <LexicalComposer initialConfig={initialConfig}>
            <SharedHistoryContext>
                <TableContext>
                    <SharedAutocompleteContext>
                        <div className="editor-shell">
                            <ToolbarPlugin />
                            <div
                                className={`editor-container tree-view`}
                                ref={scrollRef}>
                                <MaxLengthPlugin maxLength={30} />
                                <AutoFocusPlugin />
                                <ClearEditorPlugin />
                                <ComponentPickerPlugin />
                                <EmojiPickerPlugin />
                                <AutoEmbedPlugin />
                                <MentionsPlugin />
                                <EmojisPlugin />
                                <HashtagPlugin />
                                <KeywordsPlugin />
                                <SpeechToTextPlugin />
                                <AutoLinkPlugin />
                                <AutoScrollPlugin scrollRef={scrollRef} />
                                {/*<CommentPlugin*/}
                                {/*    providerFactory={isCollab ? createWebsocketProvider : undefined}*/}
                                {/*/>*/}
                                            <HistoryPlugin externalHistoryState={historyState} />
                                        <RichTextPlugin
                                            contentEditable={
                                                <div className="editor-scroller">
                                                    <div className="editor" ref={onRef}>
                                                        <ContentEditable />
                                                    </div>
                                                </div>
                                            }
                                            placeholder={placeholder}
                                            ErrorBoundary={ErrorBoundary}
                                        />
                                        <MarkdownShortcutPlugin />
                                        <CodeHighlightPlugin />
                                        <ListPlugin />
                                        {/*<CheckListPlugin />*/}
                                        <ListMaxIndentLevelPlugin maxDepth={7} />
                                        <TablePlugin />
                                        <TableCellResizer />
                                        {/*<NewTablePlugin cellEditorConfig={cellEditorConfig}>*/}
                                        {/*    <AutoFocusPlugin />*/}
                                        {/*    <RichTextPlugin*/}
                                        {/*        contentEditable={*/}
                                        {/*            <ContentEditable className="TableNode__contentEditable" />*/}
                                        {/*        }*/}
                                        {/*        placeholder={''}*/}
                                        {/*        ErrorBoundary={ErrorBoundary}*/}
                                        {/*    />*/}
                                        {/*    <MentionsPlugin />*/}
                                        {/*    <HistoryPlugin />*/}
                                        {/*    <ImagesPlugin captionsEnabled={false} />*/}
                                        {/*    <LinkPlugin />*/}
                                        {/*    <ClickableLinkPlugin />*/}
                                        {/*    <FloatingTextFormatToolbarPlugin />*/}
                                        {/*</NewTablePlugin>*/}
                                        <ImagesPlugin />
                                        <LinkPlugin />
                                        <PollPlugin />
                                        <TwitterPlugin />
                                        <YouTubePlugin />
                                        <FigmaPlugin />
                                        <ClickableLinkPlugin />
                                        <HorizontalRulePlugin />
                                        {/*<EquationsPlugin />*/}
                                        <ExcalidrawPlugin />
                                        <TabFocusPlugin />
                                        <CollapsiblePlugin />
                                                    {/*<DraggableBlockPlugin anchorElem={floatingAnchorElem} />*/}
                                                    {/*<CodeActionMenuPlugin anchorElem={floatingAnchorElem} />*/}
                                                    {/*<FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />*/}
                                                    {/*<TableCellActionMenuPlugin anchorElem={floatingAnchorElem} />*/}
                                                    {/*<FloatingTextFormatToolbarPlugin*/}
                                                    {/*    anchorElem={floatingAnchorElem}*/}
                                                    {/*/>*/}

                                {/*{(isCharLimit || isCharLimitUtf8) && (*/}
                                {/*    <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} />*/}
                                {/*)}*/}
                                <AutocompletePlugin />
                                <div><TableOfContentsPlugin /></div>
                                <ActionsPlugin isRichText={true} />
                            </div>
                           <TreeViewPlugin />

                        </div>
                    </SharedAutocompleteContext>
                </TableContext>
            </SharedHistoryContext>
        </LexicalComposer>


        //
        //
        // <div className="editor-shell">
        //     <div
        //         className={`editor-container tree-view`}
        //         ref={scrollRef}>
        // <LexicalComposer initialConfig={editorConfig}>
        //     <div className="editor-container">
        //         <div className="editor-inner">
        //             <RichTextPlugin
        //                 contentEditable={
        //                     <div className="editor-scroller">
        //                         <div className="editor" ref={onRef}>
        //                             <ContentEditable className="ContentEditable__root" />
        //                         </div>
        //                     </div>}
        //                 placeholder={<Placeholder />}
        //             />
        //             <HistoryPlugin />
        //             <TreeViewPlugin />
        //             <AutoFocusPlugin />
        //             <CodeHighlightPlugin />
        //             <ListPlugin />
        //             <LinkPlugin />
        //             <AutoLinkPlugin />
        //             <ListMaxIndentLevelPlugin maxDepth={7} />
        //             <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        //         </div>
        //     </div>
        // </LexicalComposer>
        //     </div>
        // </div>
    );
}
