import clsx from "clsx";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const HomeCard = ({
  title,
  caption,
  detailCaption = "Lihat detail",
  captionPrefix,
  showDetail = true,
  color = "default",
  containerClassName,
  titleClassName,
  captionClassName,
  onPress,
}: {
  title: string;
  caption: string | React.ReactElement;
  detailCaption?: string;
  captionPrefix?: string;
  showDetail?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "default";
  containerClassName?: string;
  titleClassName?: string;
  captionClassName?: string;
  onPress?: () => void;
}) => {
  const classColor =
    color === "default"
      ? "border border-border"
      : color === "primary"
      ? `bg-primary`
      : color === "secondary"
      ? `bg-secondary`
      : color === "success"
      ? `bg-success`
      : color === "error"
      ? `bg-error`
      : "bg-warning";
  return (
    <View
      className={`h-32 w-full px-4 flex justify-center rounded-lg ${classColor} ${containerClassName}`}
    >
      {/* <Image source={card} className="w-full h-full rounded-xl" resizeMode="cover" /> */}
      <View className="flex justify-between size-full gap-3">
        <View className="flex-row justify-between items-center ">
          <ThemedText
            type="subtitle"
            className={clsx(
              `mt-2 opacity-50 font-pregular`,
              color === "default" ? "" : "text-slate-100 dark:text-background",
              titleClassName
            )}
          >
            {title}
          </ThemedText>

          {showDetail && (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
              <View className="flex flex-row gap-2 mt-2 h-8 items-center justify-center font-pmedium">
                <ThemedText
                  className={clsx(
                    `text-sm`,
                    color === "default" ? "text-primary" : "text-slate-100 dark:text-background"
                  )}
                >
                  {detailCaption}
                </ThemedText>
                <TabBarIcon
                  name="chevron-forward"
                  size={16}
                  className={clsx(
                    `mt-0`,
                    color === "default" ? "text-primary" : "text-slate-100 dark:text-background"
                  )}
                  color={color === "default" ? "black" : "white"}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-1 flex flex-row">
          {captionPrefix && (
            <ThemedText
              className={clsx(
                "font-pmedium",
                color === "default" ? "" : "text-slate-100 dark:text-background"
              )}
            >
              {captionPrefix}
            </ThemedText>
          )}
          {typeof caption === "string" ? (
            <ThemedText
              type="title"
              className={clsx(
                `px-0`,
                color === "default" ? "" : "text-slate-100 dark:text-background",
                captionClassName
              )}
            >
              {caption}
            </ThemedText>
          ) : (
            caption && caption
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeCard;
