import { Pane } from "tweakpane";
import { animate, createScope, stagger, eases } from "animejs";
import { useEffect, useRef, useState } from "react";

const CARDS = 3;

const MODES = [
   { value: "individual", text: "Individual" },
   { value: "group", text: "Group" },
];

const DURATIONS = [
   { value: 150, text: "Quick (150ms)" },
   { value: 300, text: "Fast (300ms)" },
   { value: 500, text: "Moderate (500ms)" },
   { value: 750, text: "Slow (750ms)" },
   { value: 1200, text: "Gentle (1200ms)" },
   { value: 1600, text: "Adagio (1600ms)" },
   { value: 2000, text: "Largo (2000ms)" },
   { value: 2500, text: "Grave (2500ms)" },
];

const PROPERTIES = [
   { value: "y", text: "Translate Y" },
   { value: "x", text: "Translate X" },
   { value: "opacity", text: "Opacity" },
   { value: "scale", text: "Scale" },
   { value: "rotate", text: "Rotate" },
];

const PROPERTY_DEFAULTS = {
   y: { start: "30vb", end: '0px' },
   x: { start: "-5vi", end: '0px' },
   opacity: { start: '0', end: '1' },
   scale: { start: '0.8', end: '1' },
   rotate: { start: "15deg", end: "0deg" },
}

const EASINGS = [
   { value: "linear", text: "Linear" },
   { value: "inQuad", text: "easeInQuad" },
   { value: "outQuad", text: "easeOutQuad" },
   { value: "inOutQuad", text: "easeInOutQuad" },
   { value: "inCubic", text: "easeInCubic" },
   { value: "outCubic", text: "easeOutCubic" },
   { value: "inOutCubic", text: "easeInOutCubic" },
   { value: "inQuart", text: "easeInQuart" },
   { value: "outQuart", text: "easeOutQuart" },
   { value: "inOutQuart", text: "easeInOutQuart" },
   { value: "inQuint", text: "easeInQuint" },
   { value: "outQuint", text: "easeOutQuint" },
   { value: "inOutQuint", text: "easeInOutQuint" },
   { value: "inSine", text: "easeInSine" },
   { value: "outSine", text: "easeOutSine" },
   { value: "inOutSine", text: "easeInOutSine" },
   { value: "inExpo", text: "easeInExpo" },
   { value: "outExpo", text: "easeOutExpo" },
   { value: "inOutExpo", text: "easeInOutExpo" },
   { value: "inCirc", text: "easeInCirc" },
   { value: "outCirc", text: "easeOutCirc" },
   { value: "inOutCirc", text: "easeInOutCirc" },
   { value: 'inBack', text: 'easeInBack' },
   { value: 'outBack', text: 'easeOutBack' },
   { value: 'inOutBack', text: 'easeInOutBack' },
   { value: 'inBounce', text: 'easeInBounce' },
   { value: 'outBounce', text: 'easeOutBounce' },
   { value: 'inOutBounce', text: 'easeInOutBounce' },
   { value: 'inElastic', text: 'easeInElastic' },
   { value: 'outElastic', text: 'easeOutElastic' },
   { value: 'inOutElastic', text: 'easeInOutElastic' },
];

/**
 * Converts [{text, value}] into Tweakpane options object {Text: value}
 * @param {Array<{text: string, value: string|number}>} arr
 * @returns {Record<string, string|number>}
 */
const toOptionsObject = (arr) =>
   arr.reduce((acc, { text, value }) => {
      acc[text] = value;
      return acc;
   }, {});

const MotionPlayground = () => {
   const paneContainerRef = useRef(null);
   const paneRef = useRef(null); // holds Pane instance
   const controllersRef = useRef([]); // track controllers to dispose on rebuild
   const root = useRef(null);
   const scope = useRef(null);
   const cardsRef = useRef([]);

   const [params, setParams] = useState({
      mode: "individual",
      stagger: 150,
      motion: [
         {
            duration: 300,
            property: "y",
            start: "30vb",
            end: '0px',
            easing: "linear",
         },
         {
            duration: 300,
            property: "y",
            start: "30vb",
            end: '0px',
            easing: "linear",
         },
         {
            duration: 300,
            property: "y",
            start: "30vb",
            end: '0px',
            easing: "linear",
         },
      ],
   });

   /**
    * Disposes all controllers so we can rebuild the pane cleanly.
    */
   const clearControllers = () => {
      controllersRef.current.forEach((c) => {
         try {
            c.dispose?.();
         } catch {}
      });
      controllersRef.current = [];
      // Also remove all folders if needed
      paneRef.current?.children.forEach((child) => {
         try {
            child.dispose?.();
         } catch {}
      });
   };

   /**
    * Builds bindings for the current params.
    * Re-run when params.mode changes so the Stagger control appears/disappears.
    */
   const buildPane = () => {
      const pane = paneRef.current;
      if (!pane) return;

      clearControllers();

      // Mode select
      const modeController = pane.addBinding(params, "mode", {
         label: "Mode",
         options: toOptionsObject(MODES),
      });
      controllersRef.current.push(modeController);
      modeController.on("change", (ev) => {
         setParams((p) => ({ ...p, mode: ev.value }));
      });

      // Show Stagger only when mode === 'group'
      if (params.mode === "group") {
         const staggerController = pane.addBinding(params, "stagger", {
            label: "Stagger",
            options: toOptionsObject([{ text: "None (0ms)", value: 0 }, ...DURATIONS]),
         });
         controllersRef.current.push(staggerController);
         staggerController.on("change", (ev) => {
            setParams((p) => ({ ...p, stagger: ev.value }));
         });
      }

      // Motion folders
      // If individual mode, create a folder for each motion
      // If group mode, create one folder that edits all motions
      const motionsToBuild =
         params.mode === "individual" ? params.motion : [params.motion[0]];

      motionsToBuild.forEach((motion, index) => {
         const folder = pane.addFolder({
            title:
               params.mode === "individual"
                  ? `Card ${index + 1} Motion`
                  : `Motion Settings`,
         });
         controllersRef.current.push(folder);

         // Duration
         const durationController = folder.addBinding(motion, "duration", {
            label: "Duration",
            options: toOptionsObject(DURATIONS),
         });
         controllersRef.current.push(durationController);
         durationController.on("change", (ev) => {
            setParams((p) => ({ ...p, motion: p.motion.map((m, i) => (i === index ? { ...m, duration: ev.value } : m)) }));
         });

         // Property
         const propertyController = folder.addBinding(motion, "property", {
            label: "Property",
            options: toOptionsObject(PROPERTIES),
         });
         controllersRef.current.push(propertyController);
         propertyController.on("change", (ev) => {
            setParams((p) => ({ ...p, motion: p.motion.map((m, i) => (i === index ? { ...m, property: ev.value } : m)) }));
            // Update start and end defaults
            const defaults = PROPERTY_DEFAULTS[ev.value] ?? { start: motion.start, end: motion.end };
            setParams((p) => ({
               ...p,
               motion: p.motion.map((m, i) => (i === index
                  ? {
                     ...m,
                     property: ev.value,
                     start: defaults.start,
                     end: defaults.end,
                  }
                  : m)),
            }));
         });

         // Start
         const startController = folder.addBinding(motion, "start", {
            label: "Start",
         });
         controllersRef.current.push(startController);
         startController.on("change", (ev) => {
            setParams((p) => ({ ...p, motion: p.motion.map((m, i) => (i === index ? { ...m, start: ev.value } : m)) }));
         });

         // End
         const endController = folder.addBinding(motion, "end", {
            label: "End",
         });
         controllersRef.current.push(endController);
         endController.on("change", (ev) => {
            setParams((p) => ({ ...p, motion: p.motion.map((m, i) => (i === index ? { ...m, end: ev.value } : m)) }));
         });

         // Easing
         const easingController = folder.addBinding(motion, "easing", {
            label: "Easing",
            options: toOptionsObject(EASINGS),
         });
         controllersRef.current.push(easingController);
         easingController.on("change", (ev) => {
            setParams((p) => ({ ...p, motion: p.motion.map((m, i) => (i === index ? { ...m, easing: ev.value } : m)) }));
         });
      });

      const playBtn = pane.addButton({
         title: "Play Motion",
      });
      controllersRef.current.push(playBtn);
      playBtn.on("click", handlePlayClick);
   };

   const runMotion = () => {
      scope.current = createScope({ root }).add( self => {

         self.add('playIndividual', () => {
            params.motion.forEach((motion, index) => {
               const card = cardsRef.current[index];
               if (!card) return;

               const anim = animate(card, {
                  [motion.property]: [motion.start, motion.end],
                  duration: motion.duration,
                  ease: motion.easing,
                  autoplay: false,
               })
               anim.play();
            });
         });

         self.add('playGroup', () => {
            const anim = animate(cardsRef.current, {
               [params.motion[0].property]: [params.motion[0].start, params.motion[0].end],
               duration: params.motion[0].duration,
               ease: params.motion[0].easing,
               delay: stagger(params.stagger),
               autoplay: false,
            })
            anim.play();
         });
      });

      // Properly cleanup all anime.js instances declared inside the scope
      return () => scope.current.revert()
   }

   const handlePlayClick = () => {
      if (params.mode === 'individual') {
         scope.current.methods.playIndividual();
      } else {
         scope.current.methods.playGroup();
      }
   }

   // Create Pane once
   useEffect(() => {
      if (!paneRef.current && paneContainerRef.current) {
         paneRef.current = new Pane({
            container: paneContainerRef.current,
            title: "Motion Controls",
         });
         buildPane();
      }
      return () => {
         clearControllers();
         paneRef.current?.dispose?.();
         paneRef.current = null;
      };
   }, []);

   // Rebuild pane when mode changes so conditional bindings update
   useEffect(() => {
      buildPane();
   }, [params.mode, params.motion[0].property, params.motion[1]?.property, params.motion[2]?.property]);

   useEffect(() => {
      runMotion();
   }, [params]);

   return (
      <>
         <div className="tweakpane" id="tweakpane-container" ref={paneContainerRef} />
         <section className="motion-playground container__content--main" ref={root}>
            <div className="motion-playground__content">
               {Array.from({ length: CARDS }).map((_, i) => (
                  <article className="motion-playground__card" key={i} ref={(el) => (cardsRef.current[i] = el)}>
                  </article>
               ))}
            </div>
         </section>
      </>
   );
};

export { MotionPlayground };
