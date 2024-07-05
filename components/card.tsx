import { cn } from "@/utils/cn";
import React from "react";
import { Text, View, type TextProps, type ViewProps } from "react-native";

// type CardProps = Omit<ComponentProps<typeof View>, 'href'> & {  };
// interface CardProps extends ComponentProps<typeof View> {}
// interface TextProps extends ComponentProps<typeof Text> {}

// const Ref = ViewComponent;
const Card = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("bg-paper rounded-lg border shadow-lg", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("flex space-y-1.5 p-2", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-foreground text-lg font-psemibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm font-normal text-muted-foreground mt-1 ml-2", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("py-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(" flex items-end p-2", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
