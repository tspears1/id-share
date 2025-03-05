
/**
 * @component Badge - Main application component.
 *
 * @param {BadgeProps} props - Component props.
 *
 * @returns {JSX.Element}
 */
function Badge({ variant, className, ...props }) {
   return (
      <div
         data-variant={variant}
         className={`badge ${className}`}
         {...props}
      />
   )
}

export { Badge }

// Types ====================================

/**
 * @typedef {Object} BadgeProps - Badge component props.
 * @property {'destructive' | 'outline' | 'secondary'} variant - Badge variant.
 * @property {'sm' | 'lg' | 'icon'} size - Badge size.
 */
