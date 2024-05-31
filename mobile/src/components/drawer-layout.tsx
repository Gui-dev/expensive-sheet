import { Text, View } from 'react-native'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import Feather from '@expo/vector-icons/Feather'
import colors from 'tailwindcss/colors'
import { useRouter } from 'expo-router'
import { useAuth } from '../hooks/useAuth'

export const DrawerCustom = (props: DrawerContentComponentProps) => {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <View className="flex-1 flex-col items-center justify-around py-8">
      <View className="mt-8 w-full items-center bg-red-300">
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
        <DrawerItem
          {...props}
          label=""
          style={{
            marginLeft: 70,
          }}
          icon={({ color, size }) => (
            <Feather name="settings" color={colors.gray[400]} size={size} />
          )}
          onPress={() => router.navigate('/(protected)/config')}
          activeTintColor={colors.gray[200]}
          inactiveTintColor={colors.gray[400]}
          activeBackgroundColor="transparent"
          inactiveBackgroundColor="transparent"
          pressColor="transparent"
        />

        <DrawerItem
          {...props}
          label=""
          style={{
            marginLeft: 70,
          }}
          icon={({ color, size }) => (
            <Feather name="log-out" color={colors.red[400]} size={size} />
          )}
          onPress={() => handleLogout()}
          activeTintColor={colors.gray[200]}
          inactiveTintColor={colors.gray[400]}
          activeBackgroundColor="transparent"
          inactiveBackgroundColor="transparent"
          pressColor="transparent"
        />

        <Text className="text-white">FOOTER</Text>
      </View>
    </View>
  )
}
