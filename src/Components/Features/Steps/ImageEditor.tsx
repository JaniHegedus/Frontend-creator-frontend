import React, {useEffect, useState} from "react";
import Button from "@/Components/Common/Button";
import dynamic from "next/dynamic";
import "@tldraw/tldraw/tldraw.css";
import { useEditor } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/Components/lib/getSvgAsImage";
import { blobToBase64 } from "@/Components/lib/blobToBase64";
import ReactDOM from "react-dom";
import { PreviewModal } from "@/Components/PreviewModal";

interface ImageEditorProps {
    nextStep: () => void;
    prevStep: () => void;
}
const Tldraw = dynamic(async () => (await import("@tldraw/tldraw")).Tldraw, {
    ssr: false,
});
const ImageEditor: React.FC<ImageEditorProps> = ({ nextStep, prevStep }) => {
    const [html, setHtml] = useState<null | string>(null);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setHtml(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    });
    return (
        <>
            <div className={`w-160vh h-70vh`}>
            <Tldraw persistenceKey="tldraw">
                <ExportButton setHtml={setHtml} />
            </Tldraw>
            </div>
            {html &&
                ReactDOM.createPortal(
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                        style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.5)" }}
                        onClick={() => setHtml(null)}
                    >
                        <PreviewModal html={html} setHtml={setHtml} />
                    </div>,
                    document.body
                )}
            <div className="flex flex-col items-center justify-center space-y-4">

                {/* Navigation Buttons */}
                <div className="grid grid-cols-16 items-center">
                    <Button onClick={prevStep} label="Previous" color="secondary"/>
                    <div className="col-span-7"></div>
                    <div className="col-span-7"></div>
                    <Button onClick={nextStep} label="Next" color="secondary"/>
                </div>
            </div>
        </>
    );
};

function ExportButton({setHtml}: { setHtml: (html: string) => void }) {
    const editor = useEditor();
    const [loading, setLoading] = useState(false);
    // A tailwind styled button that is pinned to the bottom right of the screen
    return (
        <button
            onClick={async (e) => {
                setLoading(true);
                try {
                    e.preventDefault();
                    const svg = await editor.getSvg(
                        Array.from(editor.currentPageShapeIds)
                    );
                    if (!svg) {
                        return;
                    }
                    const png = await getSvgAsImage(svg, {
                        type: "png",
                        quality: 1,
                        scale: 1,
                    });
                    const dataUrl = await blobToBase64(png!);
                    const resp = await fetch("/api/toHtml", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ image: dataUrl }),
                    });

                    const json = await resp.json();

                    if (json.error) {
                        alert("Error from open ai: " + JSON.stringify(json.error));
                        return;
                    }

                    const message = json.choices[0].message.content;
                    const start = message.indexOf("<!DOCTYPE html>");
                    const end = message.indexOf("</html>");
                    const html = message.slice(start, end + "</html>".length);
                    setHtml(html);
                } finally {
                    setLoading(false);
                }
            }}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ="
            style={{ zIndex: 1000 }}
            disabled={loading}
        >
            {loading ? (
                <div className="flex justify-center items-center ">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
            ) : (
                "Make Real"
            )}
        </button>
    );
}
export default ImageEditor;