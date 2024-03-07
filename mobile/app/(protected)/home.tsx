import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../src/hooks/useAuth'

const Home = () => {
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <View className="flex h-screen flex-1 items-center justify-center gap-8">
      <Text className="text-2xl text-xs-green">Home</Text>
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
  )
}

export default Home
