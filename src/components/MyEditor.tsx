import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"; // ✅ v2는 이렇게 import!

const MyEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>환영합니다! 여기에 글을 작성하세요.</p>",
    });

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default MyEditor;
