import { useGlobalContext } from "@/context/global-provider";
import { cn } from "@/utils/cn";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TabBarIcon } from "./navigation/TabBarIcon";
import NumberWithCurrency from "./number-with-currency";
import { formatCurrency2 } from "@/utils/format-currency";
import { Member } from "@/schema/member.schema";

interface CardProps extends ViewProps {
  data: Member;
  title: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "default";
  contentClassName?: string;
  optionDetail?:
  | { showDetail: false }
  | {
    showDetail: true;
    onPress: () => void;
  };
}
const HomeCard = ({
  data,
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
    <Card className="bg-info -mt-24 mx-2 border-0 rounded-xl">
      <CardHeader className="flex flex-row gap-1 justify-center">
        {/* <Card className={cn("", defaultColor, className)}> */}
        {/*   <CardHeader */}
        {/*     className={cn("pt-4 flex-row items-center justify-between ", defaultColor)} */}
        {/*   > */}
        {/*     <CardTitle className={defaultColor}>{"Voucher"}</CardTitle> */}
        {/*     {optionDetail && optionDetail.showDetail && ( */}
        {/*       <TouchableOpacity onPress={optionDetail.onPress} activeOpacity={0.7}> */}
        {/*         <View className="flex flex-row gap-2 font-pmedium -mt-1"> */}
        {/*           <ThemedText className={cn(`text-sm font-pmedium`, defaultColor)}>Detail</ThemedText> */}
        {/*           <TabBarIcon */}
        {/*             name="chevron-forward" */}
        {/*             size={18} */}
        {/*             color={color === "default" ? theme.colors.text : theme.colors.background} */}
        {/*           /> */}
        {/*         </View> */}
        {/*       </TouchableOpacity> */}
        {/*     )} */}
        {/*   </CardHeader> */}
        {/*   <CardContent className={cn("items-start py-2", contentClassName)}> */}
        {/*     <NumberWithCurrency */}
        {/*       value={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })} */}
        {/*       valueClassName="text-xl text-left -ml-2" */}
        {/*       currencyClassName="mr-0" */}
        {/*     /> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        <View className="w-full relative flex flex-row justify-between items-center rounded-lg py-2 shadow-md bg-slate-100 text-slate-900 ">
          <View className="flex-1 gap-1 basis-1/2 items-center ">
            <View className="flex flex-row items-center justify-start gap-2">
              <TabBarIcon name="ticket-outline" size={20} color={theme.colors.info} />
              <ThemedText type="default" className="text-slate-900">Voucher</ThemedText>
            </View>
            <ThemedText className="text-sm font-psemibold text-slate-900">Rp.{formatCurrency2(data?.saldoVoucher, { precision: 0 })}</ThemedText>
          </View>
          <View className="flex-1 gap-1 basis-1/2 items-center">
            <View className="flex flex-row items-center justify-start gap-2">
              <TabBarIcon name="wallet" size={20} color={theme.colors.info} />
              <ThemedText type="default" className="text-slate-900">Tabungan</ThemedText>
            </View>
            <ThemedText className="text-sm font-psemibold text-slate-900">Rp.{formatCurrency2(data?.saldoSimpanan, { precision: 0 })}</ThemedText>
          </View>
          <View className="absolute inset-y-0 left-1/2  -translate-x-['50'] w-2 bg-slate-100">
            <View className="h-[80%] border-r-2 border-dashed border-info"></View>
          </View>
          <View className="absolute left-1/2 -bottom-2  -translate-x-['50'] -translate-y-['50'] w-4 h-4 rounded-xl bg-info "></View>
          <View className="absolute left-1/2 -top-2  -translate-x-['50'] -translate-y-['50'] w-4 h-4 rounded-xl bg-info "></View>
        </View>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between py-4 ">
        <View className="flex gap-2 px-2 items-center basis-1/4 ">
          <View className="size-14 rounded-full bg-stone-100 items-center justify-center p-2">
            <TabBarIcon name="briefcase" color={theme.colors.info} />
          </View>
          <ThemedText className="px-1 text-slate-900">Pinjaman</ThemedText>
        </View>
        <View className="flex gap-2 px-2 items-center basis-1/4 ">
          <View className="size-14 rounded-full bg-stone-100 items-center justify-center p-2">
            <TabBarIcon name="basket" color={theme.colors.info} />
          </View>
          <ThemedText className="px-1 text-slate-900">Belanja</ThemedText>
        </View>
        <View className="flex gap-2 px-2 items-center basis-1/4 ">
          <View className="size-14 rounded-full bg-stone-100 items-center justify-center p-2">
            <TabBarIcon name="download" color={theme.colors.info} />
          </View>
          <ThemedText className="px-1 text-slate-900">Penarikan</ThemedText>
        </View>
        <View className="flex gap-2 px-2 items-center basis-1/4 ">
          <View className="size-14 rounded-full bg-stone-100 items-center justify-center p-2">
            <TabBarIcon name="push" color={theme.colors.info} />
          </View>
          <ThemedText className="px-1 text-slate-900">Topup</ThemedText>
        </View>
      </CardContent>

    </Card >
  );
};

export default HomeCard;
