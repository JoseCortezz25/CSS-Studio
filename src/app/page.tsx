"use client";
import Timeline from "@/components/common/timeline";
import { Input } from "@/components/ui/input";
import { Keyframe } from "@/lib/types";
import { Eye, Settings } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);

  const updateKeyframes = (keyframe: Keyframe) => {
    setKeyframes(prev => [...prev, keyframe]);
    // console.log("keyframes", keyframes);
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

        <div className="container mx-auto w-full flex justify-center gap-2  min-h-screen pb-20">
          <div className="w-[30%] h-full">
            <h2 className="flex gap-2 mb-7">
              <Settings className="size-[24px]" />
              Establecer Propiedades
            </h2>

            {/* Translate */}
            <div className="flex flex-col w-[75%]">


              <div className="px-4 py-4 border border-neutral-200 rounded-md mb-9">
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Duración de la animación"
                  />

                  <Input
                    type="text"
                    placeholder="Nombre de la animación"
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
                  value={0}
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
                  value={0}
                />
              </div>

              {/*  Opacity  */}
              <div className="group-field">
                <label htmlFor="opacity">Opacidad</label>
                <input type="range" id="opacity" name="opacity" min="0" max="100" value={0} />
              </div>

              {/* Height and width */}
              <div className="group-field">
                <label htmlFor="width">Ancho</label>
                <input type="range" id="width" name="width" min="0" max="100" />

                <label htmlFor="height">Alto</label>
                <input type="range" id="height" name="height" min="0" max="100" />
              </div>

              <div className="group-field">
                <label htmlFor="background">Fondo</label>
                <input type="color" id="background" name="background" />
              </div>

              <div className="group-field">
                <label htmlFor="color">Color</label>
                <input type="color" id="color" name="color" />
              </div>
            </div>

            {/* Background and color*/}
          </div>

          <div className="w-[60%] min-h-screen relative bg-neutral-300/30 rounded-xl">
            <span className="flex gap-2 absolute top-2 right-2 bg-neutral-800 backdrop-blur-sm rounded-full px-3 py-1 text-white">
              <Eye className="size-[24px]" />
              Vista Previa
            </span>
            {/* <iframe className="w-full h-full" srcDoc={exampleCard}></iframe> */}
          </div>

        </div>

      </div>
    </main>
  );
}
