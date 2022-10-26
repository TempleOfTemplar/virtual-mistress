/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';
import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import * as React from 'react';
import {useRef, useState} from 'react';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import ToolbarPlugin from '@lexical/react/LExical'
const skipCollaborationInit =
    // @ts-ignore
    window.parent != null && window.parent.frames.right === window;

export default function Editor(): JSX.Element {
        const placeholder = <Placeholder>{text}</Placeholder>;
    const scrollRef = useRef(null);
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    // const cellEditorConfig = {
    //     namespace: 'Playground',
    //     nodes: [...TableCellNodes],
    //     onError: (error: Error) => {
    //         throw error;
    //     },
    //     theme: PlaygroundEditorTheme,
    // };

    return (
        <>
            <ToolbarPlugin />
            <div
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
                <CommentPlugin
                    providerFactory={undefined}
                />

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
                        <CheckListPlugin />
                        <ListMaxIndentLevelPlugin maxDepth={7} />
                        <TablePlugin />
                        <TableCellResizer />
                        <ImagesPlugin />
                        <LinkPlugin />
                        <PollPlugin />
                        <TwitterPlugin />
                        <YouTubePlugin />
                        <FigmaPlugin />
                        <ClickableLinkPlugin />
                        <HorizontalRulePlugin />
                        <EquationsPlugin />
                        <ExcalidrawPlugin />
                        <TabFocusPlugin />
                        <CollapsiblePlugin />

        </>
    );
}
