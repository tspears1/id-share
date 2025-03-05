import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Icon } from "../../atoms/Icon/Icon.jsx";

const Breadcrumb = forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={`breadcrumb ${className}`}
    {...props}
  />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={`breadcrumb__list ${className}`}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={`breadcrumb__item ${className}`}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={`breadcrumb__link ${className}`}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={`breadcrumb__page ${className}`}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={`breadcrumb__separator ${className}`}
    {...props}
  >
    {children ?? <Icon icon="caret-right" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={`breadcrumb__ellipsis ${className}`}
    {...props}
  >
    <Icon icon='dots-three' size="1rem" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
