"use client";

// Radix UI ==================================================
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React, { forwardRef } from "react";

// Components ================================================
const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef(({ sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className="tooltip__content"
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
