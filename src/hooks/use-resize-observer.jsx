import React, { useEffect, useMemo, useRef, useState } from "react";

const defaultState = {
   x: 0,
   y: 0,
   width: 0,
   offsetWidth: 0,
   height: 0,
   offsetHeight: 0,
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
};

const useResizeObserver = (options) => {
   const frameID = useRef(0);
   const ref = useRef(null);

   const [rect, setRect] = useState(defaultState);

   const observer = useMemo(() =>
      typeof window !== 'undefined'
         ? new ResizeObserver((entries) => {
            const entry = entries[0];

            if (entry) {
               cancelAnimationFrame(frameID.current);

               frameID.current = requestAnimationFrame(() => {
                  if (ref.current) {
                     const { contentRect: { x, y, width, height, top, left, bottom, right } } = entry;
                     setRect(() => {
                        return {
                           x,
                           y,
                           width,
                           height,
                           top,
                           left,
                           bottom,
                           right,
                           offsetHeight: entry?.borderBoxSize[0]?.blockSize,
                           offsetWidth: entry?.borderBoxSize[0]?.inlineSize,
                        };
                     });
                  }
               });
            }
         })
      : null,
   []);

   useEffect(() => {
      if (ref.current) {
         observer?.observe(ref.current, options);
      }

      return () => {
         observer?.disconnect();

         if (frameID.current) {
         cancelAnimationFrame(frameID.current);
         }
      };
   }, [ref.current]);

   return [ref, rect];
}

const useElementSize = (options) => {
   const [ref, { width, height, offsetHeight, offsetWidth }] = useResizeObserver(options);
   return { ref, width, height, offsetHeight, offsetWidth };
}

export { useElementSize, useResizeObserver };