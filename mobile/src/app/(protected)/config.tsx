import { Text, TouchableOpacity, View } from 'react-native'
import { DrawerToggleButton } from '@react-navigation/drawer'

import { useAuth } from '../../hooks/useAuth'
import colors from 'tailwindcss/colors'

const Config = () => {
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <View className="relative flex-1 bg-gray-900">
      <View className="absolute right-4 top-3 mt-8">
        <DrawerToggleButton tintColor={colors.gray[100]} />
      </View>
      <View className="mt-16 flex flex-1 items-center gap-8">
        <Text className="text-2xl text-xs-green">Config</Text>
        <View className="flex h-32 w-full items-center justify-center bg-teal-900 p-3">
          <Text className="text-lg font-bold text-gray-200">{user?.name}</Text>
          <Text className="text-base text-gray-200">{user?.email}</Text>
        </View>
        <TouchableOpacity
          className="flex h-12 w-[40%] items-center justify-center rounded-md bg-xs-red"
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <Text className="text-lg font-bold text-white">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Config
