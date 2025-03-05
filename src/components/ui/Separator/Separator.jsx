"use client"

import React, { forwardRef } from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import cn from 'classnames'

const Separator = forwardRef(({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}, ref ) => {
  if (orientation !== "horizontal" && orientation !== "vertical") {
    orientation = "horizontal"
  }

  return (
    <div
      ref={ref}
      data-decorative={decorative}
      data-orientation={orientation}
      className={cn(
        "separator",
        className,
        { 'separator--horizontal' : orientation === 'horizontal' },
        { 'separator--vertical' : orientation === 'vertical' },
        { 'separator--decorative' : decorative }
      )}
      {...props}
    />
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }