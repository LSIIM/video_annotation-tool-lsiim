import { useState, useEffect, useRef } from "react";
import { AnnotationModel } from "@/models/models";

interface Props {
    annotation: AnnotationModel;
    mode: string;
}

export default function CommentContainer({ annotation, mode }: Props) {
    const [comment, setComment] = useState<string>(annotation.comment || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setComment(annotation.comment || '');
        adjustTextareaHeight();
    }, [annotation]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="flex flex-col mt-2">
            <h2 className="text-xl font-bold mb-4">Comentário</h2>
            {mode === "edit" ? (
                <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={handleCommentChange}
                    className="p-2 rounded-lg bg-gray-700 text-white resize-none max-h-96 overflow-y-auto"
                    placeholder="Escreva seu comentário aqui"
                />
            ) : (
                comment !== "" && <p className="whitespace-pre-line">{comment}</p>
            )}
        </div>
    );
}
