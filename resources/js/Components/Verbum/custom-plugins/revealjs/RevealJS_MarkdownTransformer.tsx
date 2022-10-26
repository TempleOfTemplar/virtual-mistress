import {ElementTransformer} from "@lexical/markdown";
import {LexicalNode} from "lexical";
import {$isRevealJSNode, RevealJSNode} from "@/Components/Verbum/custom-plugins/revealjs/RevealJS_Node";
import * as Markdown from 'reveal.js/plugin/markdown/markdown';

export const RevealJS_MarkdownTransformer: ElementTransformer = {
    dependencies: [],
    export: (node: LexicalNode) => {
        console.log("EXPORT", node);
        return $isRevealJSNode(node) ? '\n---\n': null;
    },
    regExp: /'\r?\n---\r?\n'/,
    replace: (parentNode, _1, _2, isImport) => {
        console.log("parentNode", parentNode);
        const slidified = Markdown.default().slidify(parentNode)
        console.log("slidified", slidified);
        //
        // const line = ;
        //
        // // TODO: Get rid of isImport flag
        // if (isImport || parentNode.getNextSibling() != null) {
        //     parentNode.replace(line);
        // } else {
        //     parentNode.insertBefore(line);
        // }

        // line.selectNext();
    },
    type: 'element',
};
