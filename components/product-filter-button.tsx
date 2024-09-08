import { cn } from "@/utils/cn"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity, View } from "react-native"
import { ThemedText } from "./ThemedText"
import { useGlobalContext } from "@/context/global-provider"

const FilterButton = ({ setSheetActive, handlePresentModalPress }: { setSheetActive: (value: "product" | "sortby" | "filter") => void, handlePresentModalPress: () => void }) => {
  const { theme } = useGlobalContext();

  return (<View className={cn("relative flex flex-row items-center justify-center bottom-8 ")}>
    <View className="absolute flex flex-row gap-4 px-4 py-1 rounded-full bg-muted  border shadow-xl items-center ">
      <TouchableOpacity onPress={() => {
        setSheetActive("sortby")
        handlePresentModalPress()
      }}>
        <View className="flex flex-row gap-2 items-center">
          <MaterialCommunityIcons name="sort" size={18} color={theme.colors.foreground} />
          <ThemedText type="subtitle">Sort By</ThemedText>
        </View>
      </TouchableOpacity>
      <View className="w-1 border-r border-border h-full" />
      <TouchableOpacity onPress={() => {
        setSheetActive("filter")
        handlePresentModalPress()
      }}>
        <View className="flex flex-row gap-2 items-center">
          <MaterialCommunityIcons name="filter-outline" size={18} color={theme.colors.foreground} />
          <ThemedText type="subtitle">Filter</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default FilterButton
