"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ButtonActions, Keyframe } from "@/lib/types";

interface TimelineProps {
  totalTime: string;
  addKeyframe: (keyframe: Keyframe) => void;
  keyframes: Keyframe[];
};

const Timeline = ({
  totalTime, // in ms
  addKeyframe,
  keyframes
}: TimelineProps) => {
  const timelineItemRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(0);
  const startRef = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [animation, setAnimation] = useState({
    elapsedTime: 0,
    currentPosition: 0
  });

  const animate = (timestamp: number) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsedTime = parseFloat(totalTime) ? startTime.current : 0;
    const elapsed = timestamp - startRef.current + elapsedTime;
    lastTime.current = elapsed;
    setAnimation(prev => ({ ...prev, elapsedTime: elapsed }));

    if (timelineItemRef.current && timelineContainerRef.current) {
      const containerWidth = timelineContainerRef.current.offsetWidth;
      const duration = parseFloat(totalTime);
      const progress = Math.min(elapsed / duration, 1);
      const translateX = progress * containerWidth;

      setAnimation(prev => ({ ...prev, currentPosition: translateX }));
      timelineItemRef.current.style.transform = `translateX(${translateX}px)`;
      setCurrentTime(progress * (duration / 1000));
    }

    if (elapsed < parseFloat(totalTime)) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  const redirectToPositionKeyframe = (keyframe: Keyframe) => {
    if (timelineItemRef.current && timelineContainerRef.current) {
      timelineItemRef.current.style.transform = `translateX(${keyframe.position}px)`;
    }

    setCurrentTime(parseFloat(keyframe.time));
  };

  useEffect(() => {
    // if (animationFrameRef.current) {
    // startRef.current = 0; // Reset start time
    requestAnimationFrame(animate);
    // } else if (animationFrameRef.current) {
    //   cancelAnimationFrame(animationFrameRef.current);
    // }

    return () => {
      // cancelAnimationFrame(animationFrameRef.current);
    };
  }, [totalTime]);

  // Controls Timeline 
  // const pause = () => {
  //   cancelAnimationFrame(animationFrameRef.current);
  // };
  // const play = () => { };
  // const rewind = () => { };

  const toggleAction = (action: string) => {
    if (action === ButtonActions.PAUSE) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (action === ButtonActions.REWIND) {
      startRef.current = 0;
      requestAnimationFrame(animate);
    }

    if (action === ButtonActions.PLAY) {
      startRef.current = lastTime.current;
      requestAnimationFrame(animate);
    }
  };

  const setKeyframe = () => {
    addKeyframe({
      position: animation.currentPosition,
      time: currentTime.toFixed(2),
      properties: {
        translateX: "0",
        translateY: "0",
        opacity: "100",
        width: "100",
        height: "100",
        background: "red",
        color: "white"
      }
    });
  };

  return (
    <section className="timeline">
      <div className="timeline-labels">
        <span>
          Current: {currentTime.toFixed(2)}s
        </span>
        <span>
          End: {totalTime} ms
        </span>
      </div>
      <div className="timeline-container" ref={timelineContainerRef}>
        <div className="timeline-item--moving" ref={timelineItemRef}></div>
        {keyframes && keyframes.map((keyframe, index) => (
          <div
            key={index}
            className="timeline-item--keyframe"
            style={{
              transform: `translateX(${keyframe.position}px)`
            }}
            onClick={() => redirectToPositionKeyframe(keyframe)}
          />
        ))}
      </div>
      <button onClick={() => toggleAction(ButtonActions.PAUSE)}>Pause</button>
      <button onClick={() => toggleAction(ButtonActions.PLAY)}>Play</button>
      <button onClick={() => toggleAction(ButtonActions.REWIND)}>Rewind</button>
      <Button onClick={setKeyframe}>
        Add Keyframe
      </Button>
    </section>
  );
};

export default Timeline;