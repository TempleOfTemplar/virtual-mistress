import {ReactNode, useEffect} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$insertNodes, createCommand, LexicalCommand} from "lexical";
import {$createRevealJSNode} from "@/Components/Verbum/custom-plugins/revealjs/RevealJS_Node";
import Reveal from "reveal.js";
import * as Markdown from "reveal.js/plugin/markdown/markdown.esm";

type CommandPayload = string;
export const INSERT_REVEALJS_COMMAND: LexicalCommand<CommandPayload> =
    createCommand('INSERT_REVEALJS_COMMAND');

function RevealJSPlugin(): ReactNode {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        // Similar with command listener, which returns unlisten callback
        const removeListener = editor.registerCommand(
            INSERT_REVEALJS_COMMAND,
            (payload) => {
                // Adding custom command that will be handled by this plugin
                editor.update(() => {
                    $insertNodes([$createRevealJSNode()]);
                });

                // Returning true indicates that command is handled and no further propagation is required
                return true;
            },
            0,
        );

        return () => {
            removeListener();
        };
    }, [editor]);

    return null;
}
