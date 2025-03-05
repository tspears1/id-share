/* eslint-disable react/no-unknown-property */
import { forwardRef } from "react";

const Alert = forwardRef(({ variant, ...props }, ref) => (
   <div
      ref={ref}
      role="alert"
      variant={variant}
      className='alert'
      {...props}
   />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef(({ ...props }, ref) => (
   <h5
      ref={ref}
      className='alert__title'
      {...props}
   />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef(({ ...props }, ref) => (
   <div
      ref={ref}
      className='alert__description'
      {...props}
   />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };

// Types ====================================

/**
 * @typedef {Object} AlertProps - Alert component props.
 * @property { 'default' | 'destructive' | 'warning' } variant - Alert variant.
 * @property {string} className - Alert className.
 */
