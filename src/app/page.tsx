"use client";

import React, { useState, useRef, useEffect } from "react";
import Timeline from "@/components/common/timeline";
import { Input } from "@/components/ui/input";
import { example } from "@/libs/example";
import { Keyframe } from "@/libs/types";
import { Eye, Settings } from "lucide-react";

export default function Home() {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  const [codeToPreview, setCodeToPreview] = useState<string>(example);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [keyframeSingle, setKeyframe] = useState<Keyframe>({
    time: "0",
    position: 0,
    properties: {
      translateX: "0",
      translateY: "0",
      opacity: "0",
      width: "0",
      height: "0",
      background: "#000",
      color: "#000"
    }
  });

  const updateKeyframes = (keyframe: Keyframe) => {
    setKeyframes(prev => [...prev, keyframeSingle]);
    // console.log("Current keyframes", keyframeSingle);
  };

  const insertScript = (iframeDocument: Document) => {
    const script = document.createElement("script");
    script.textContent = /*javascript*/`
        let currentHightline = null;
        let selectedElement = {
          selected: false,
          element: null
        };
  
        document.body.addEventListener("mouseover", (event) => {
          const element = event.target;
          if (selectedElement.element !== element) {
            if (currentHightline && currentHightline !== selectedElement.element) {
              currentHightline.style.outline = "";
            }
            element.style.outline = "2px solid red";
            currentHightline = element;
  
            element.addEventListener("mouseout", () => {
              if (selectedElement.element !== element) {
                element.style.outline = "";
              }
            });
          }
        });
  
        document.body.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const element = event.target;
  
          if (selectedElement.element) {
            selectedElement.element.style.outline = "";
          }
          element.style.outline = "2px solid red";
          selectedElement = {
            selected: true,
            element
          };
  
          if (element.textContent.trim()) {
            element.setAttribute("contenteditable", "true");
            element.focus();
  
            element.addEventListener("blur", () => {
              element.removeAttribute("contenteditable");
            });
          }
  
          const elementInfo = {
            tagName: element.tagName,
            id: element.id,
            classList: element.classList,
            textContent: element.textContent.trim().substring(0, 50) + '...'
          }
  
          if (elementInfo.tagName === "IMG") {
            element.addEventListener("click", () => {
              try {
                window.parent.postMessage(JSON.stringify({ type: 'contextmenu', value: true }), "*");
              } catch (error) {
                console.error("Error", error);
              }
            });
          }
  
          window.parent.postMessage(JSON.stringify({ type: 'send-element', data: JSON.stringify(elementInfo) }), "*");
        });
      `;

    console.log("script", script);

    iframeDocument.body.appendChild(script);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument;
      if (!iframeDocument) return;

      console.log("iframeRef.current", iframeRef.current);

      insertScript(iframeDocument);
    };
  }, [iframeRef.current]);

  const addKeyframe = () => {
    updateKeyframes(keyframe);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        <div className="container mx-auto">
          <Timeline
            totalTime="5000"
            addKeyframe={updateKeyframes}
            keyframes={keyframes}
          />
        </div>

        <div className="container mx-auto w-full flex justify-center gap-2 pb-20">
          <div className="w-[30%] h-full">
            <h2 className="flex gap-2 mb-7">
              <Settings className="size-[24px]" />
              Establecer Propiedades
            </h2>

            {/* Configuracion */}
            <div className="flex flex-col w-[75%]">
              <div className="px-4 py-4 border border-neutral-200 rounded-md mb-9">
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Duración de la animación"
                  // onChange={() => }
                  />

                  <Input
                    type="text"
                    placeholder="Nombre de la animación"
                  // onChange={(e) => console.log(e.target.value)}
                  />
                </div>
              </div>

              <div className="group-field">
                <label htmlFor="translateX">Translate X</label>
                <input
                  type="range"
                  id="translateX"
                  name="translateX"
                  min="-100"
                  max="100"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        translateX: e.target.value
                      }
                    }))
                  }
                />
              </div>

              <div className="group-field">
                <label htmlFor="translateY">Translate Y</label>
                <input
                  type="range"
                  id="translateY"
                  name="translateY"
                  min="-100"
                  max="100"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        translateY: e.target.value
                      }
                    }))
                  }
                />
              </div>

              {/*  Opacity  */}
              <div className="group-field">
                <label htmlFor="opacity">Opacidad</label>
                <input
                  type="range"
                  id="opacity"
                  name="opacity"
                  min="0"
                  max="100"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        opacity: e.target.value
                      }
                    }))
                  }
                />
              </div>

              {/* Height and width */}
              <div className="group-field">
                <label htmlFor="width">Ancho</label>
                <input
                  type="range"
                  id="width"
                  name="width"
                  min="0"
                  max="100"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        width: e.target.value
                      }
                    }))
                  }
                />

                <label htmlFor="height">Alto</label>
                <input
                  type="range"
                  id="height"
                  name="height"
                  min="0"
                  max="100"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        height: e.target.value
                      }
                    }))
                  }
                />
              </div>

              <div className="group-field">
                <label htmlFor="background">Fondo</label>
                <input
                  type="color"
                  id="background"
                  name="background"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        background: e.target.value
                      }
                    }))
                  }
                />
              </div>

              <div className="group-field">
                <label htmlFor="color">Color</label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  onChange={(e) =>
                    setKeyframe(prev => ({
                      ...prev,
                      properties: {
                        ...prev?.properties,
                        color: e.target.value
                      }
                    })
                    )
                  }
                />
              </div>

              <button onClick={addKeyframe}>Añadir Keyframe</button>
            </div>
          </div>

          <div className="w-[60%]">
            Data:
            {keyframes.map((keyframe, index) => (
              <div key={index} className="flex gap-4">
                <span>Time: {keyframe.time}</span>
                <span>Position: {keyframe.position}</span>
                <span>Translate X: {keyframe.properties?.translateX}</span>
                <span>Translate Y: {keyframe.properties?.translateY}</span>
                <span>Opacity: {keyframe.properties?.opacity}</span>
                <span>Width: {keyframe.properties?.width}</span>
                <span>Height: {keyframe.properties?.height}</span>
                <span>Background: {keyframe.properties?.background}</span>
                <span>Color: {keyframe.properties?.color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}