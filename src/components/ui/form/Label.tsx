import * as React from "react";
import { Text, TextProps } from "@/components/ui/typography/Text";
import { cn } from "@/lib/utils";

// Use TextProps directly for the label element
export type LabelProps = TextProps<"label">

const Label = React.forwardRef<
  HTMLLabelElement, // The type of the element the ref points to (a label)
  LabelProps // The props the component accepts
>(({ className, children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      as="label" // Render as a <label> element
      variant="heading" // Use the heading style variant from Text
      className={cn(
        "block mb-2", // Add some default spacing below the label
        className // Allow overriding/adding classes
      )}
      {...props} // Pass down other props like htmlFor, etc.
    >
      {children}
    </Text>
  );
});

Label.displayName = "Label";

export { Label };
