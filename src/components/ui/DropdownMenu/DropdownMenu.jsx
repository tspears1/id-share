"use client"

import React, { forwardRef } from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Icon } from "../../atoms/Icon/Icon.jsx"
import cn from 'classnames'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef(({ inset, className, children, ...props }, ref) => (
   <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
         'dropdown-menu__sub-trigger',
         { 'dropdown-menu__sub-trigger--inset' : inset },
         className
      )}
      {...props}
   >
      {children}
      <Icon icon='caret-right' className="dropdown-menu__sub-trigger-icon" />
   </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef(({ className,...props }, ref) => (
   <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn('dropdown-menu__sub-content', className)}
      {...props}
   />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = forwardRef(({ sideOffset = 4, className, ...props }, ref) => (
   <DropdownMenuPrimitive.Portal className='dropdown-menu__portal'>
      <DropdownMenuPrimitive.Content
         ref={ref}
         sideOffset={sideOffset}
         className={cn('dropdown-menu__content', className)}
         {...props}
      />
   </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = forwardRef(({ inset, className, ...props }, ref) => (
   <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
         'dropdown-menu__item',
         { 'dropdown-menu__item--inset' : inset },
         className
      )}
      {...props}
   />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = forwardRef(({ children, checked, className, ...props }, ref) => (
   <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn('dropdown-menu__checkbox-item', className)}
      checked={checked}
      {...props}
   >
      <span className={cn('dropdown-menu__checkbox-item-span')}>
         <DropdownMenuPrimitive.ItemIndicator>
            <Icon icon='check' size='1rem' />
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef(({ children, className, ...props }, ref) => (
   <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn('dropdown-menu__radio-item', className)}
      {...props}
   >
      <span className={cn('dropdown-menu__radio-item-span')}>
         <DropdownMenuPrimitive.ItemIndicator>
            <Icon
               icon='circle'
               color="currentColor"
               size='0.5rem'
            />
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = forwardRef(({ inset, className, ...props }, ref) => (
   <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
         'dropdown-menu__label',
         { 'dropdown-menu__label--inset' : inset },
         className
      )}
      {...props}
   />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => (
   <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('dropdown-menu__separator', className)}
      {...props}
   />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }) => {
   return (
      <span
         className={cn('dropdown-menu__shortcut', className)}
         {...props}
      />
   )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuCheckboxItem,
   DropdownMenuRadioItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuGroup,
   DropdownMenuPortal,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuRadioGroup
}
