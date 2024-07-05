import { useGlobalContext } from "@/context/global-provider";
import { cn } from "@/utils/cn";
import { TouchableOpacity, View, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TabBarIcon } from "./navigation/TabBarIcon";

type CardProps = ViewProps & {
  title: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "default";
  contentClassName?: string;
  optionDetail?:
    | { showDetail: false }
    | {
        showDetail: true;
        onPress: () => void;
      };
};
const HomeCard = ({
  children,
  title,
  className,
  contentClassName,
  optionDetail,
  color = "default",
  ...props
}: CardProps) => {
  const { theme } = useGlobalContext();
  const classColor =
    color === "default"
      ? "text-foreground"
      : color === "primary"
      ? `bg-primary`
      : color === "secondary"
      ? `bg-secondary`
      : color === "success"
      ? `bg-success`
      : color === "error"
      ? `bg-error`
      : "bg-warning";
  const defaultColor = cn("text-background border-slate-400", classColor);

  return (
    <Card className={cn("p-2", defaultColor, className)}>
      <CardHeader
        className={cn("border-b py-4 flex-row items-center justify-between", defaultColor)}
      >
        <CardTitle className={defaultColor}>{title}</CardTitle>
        {optionDetail && optionDetail.showDetail && (
          <TouchableOpacity onPress={optionDetail.onPress} activeOpacity={0.7}>
            <View className="flex flex-row gap-2 font-pmedium -mt-1">
              <ThemedText className={cn(`text-sm font-pmedium`, defaultColor)}>Detail</ThemedText>
              <TabBarIcon
                name="chevron-forward"
                size={18}
                color={color === "default" ? theme.colors.text : theme.colors.background}
              />
            </View>
          </TouchableOpacity>
        )}
      </CardHeader>
      <CardContent className={cn("items-start", contentClassName)}>{children}</CardContent>
    </Card>
  );
};

export default HomeCard;
