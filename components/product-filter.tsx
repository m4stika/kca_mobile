import { ScrollView, View } from "react-native"
import { RadioButton } from "./atoms"

type GroupProduct = {
  groupProduct: string
}
const ProductFilter = ({ groupProducts, groupProduct, setGroupProduct, dismiss }: { groupProducts: GroupProduct[], groupProduct: string, setGroupProduct: (value: string) => void, dismiss: () => void }) => {
  if (!groupProducts) return null

  const radioGroups = groupProducts.map((item, index) => ({ key: item.groupProduct, value: item.groupProduct }))
  radioGroups.unshift({ key: "TAMPILKAN-SEMUA", value: "TAMPILKAN-SEMUA" })

  return (
    <ScrollView>
      <View className="py-2 px-4">
        <RadioButton
          defaultSelection={groupProduct}
          options={radioGroups}
          onSelection={(index, value) => {
            // setState((oldValue) => ({ ...oldValue, paymentMethod: value.key as PaymentMethod }));
            dismiss();
            setGroupProduct(value.value)
          }}
        />
      </View>
    </ScrollView>
  )
}

export default ProductFilter
