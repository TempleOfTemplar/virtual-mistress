import {DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread} from "lexical";
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown';
import RevealJsMarkdownParserComponent
    from "@/Components/Verbum/custom-plugins/revealjs/RevealJSMarkdownParserComponent";
import {uuid} from "@/Components/Editor/plugins/AutocompletePlugin";

export type SerializedRevealJSNode = Spread<
    {
        type: 'revealjs';
        version: 1;
        uuid: string;
    },
    SerializedLexicalNode
    >;

export class RevealJSNode extends DecoratorNode<JSX.Element | null>  {
    deck = new Reveal({
        plugins: [ Markdown ],
    })
    static getType(): string {
        return 'revealjs';
    }

    static clone(node: RevealJSNode): RevealJSNode {
        return new RevealJSNode(node.__key);
    }

    static importJSON(
        serializedNode: SerializedRevealJSNode,
    ): RevealJSNode {
        return $createRevealJSNode(serializedNode.uuid);
    }

    constructor(uuid: string, key?: NodeKey) {
        super(key);
        this.__uuid = uuid;
        this.deck.initialize();
    }

    createDOM(config: EditorConfig): HTMLElement {
        const div = document.createElement('div');
        div.style.display = 'contents';
        div.style.backgroundColor = "red";
        div.style.width = "100px";
        div.style.height = "100px";

        return div;
    }

    updateDOM(
        prevNode: unknown,
        dom: HTMLElement,
        config: EditorConfig,
    ): boolean {
        return false;
    }

    decorate(editor: LexicalEditor): JSX.Element | null {
        console.log("DECORATE", editor);
        if (this.__uuid !== uuid) {
            return null;
        }
        return (<RevealJsMarkdownParserComponent sections={[]}/>);
    }
}

export function $createRevealJSNode(uuid: string): RevealJSNode {
    return new RevealJSNode(uuid);
}

export function $isRevealJSNode(node: LexicalNode): boolean {
    return node instanceof RevealJSNode;
}
