import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { Text, View } from 'react-native'

export const DrawerCustom = (props: DrawerContentComponentProps) => {
  return (
    <View className="flex-1 flex-col items-center justify-around py-8">
      <View className="mt-8">
        <Text className="text-2xl text-white">Menu</Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginLeft: 30,
        }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="items-center justify-center">
        {/* <DrawerItem
          label=""
          style={{
            marginLeft: 65,
          }}
          icon={({ color, size }) => (
            <Feather name="alert-circle" color="#FFF" size={size} />
          )}
          onPress={() => {}}
        /> */}
        <Text className="text-white">FOOTER</Text>
      </View>
    </View>
  )
}
