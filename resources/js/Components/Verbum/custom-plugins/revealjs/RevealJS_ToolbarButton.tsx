import {ReactNode} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {INSERT_REVEALJS_COMMAND} from "@/Components/Verbum/custom-plugins/revealjs/RevealJS_Plugin";

function ToolbarRevealJSButton(): ReactNode {
    const [editor] = useLexicalComposerContext();
    const insertRevealJS = () => {
        // Executing command defined in a plugin
        editor.dispatchCommand(INSERT_REVEALJS_COMMAND, '');
    };

    // const showDialog = useVideoDialog({onSubmit: insertVideo});
    return <button onClick={insertRevealJS}>Add RevealJS</button>;
}
