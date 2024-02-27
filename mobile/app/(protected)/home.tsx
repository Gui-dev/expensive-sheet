import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../src/hooks/useAuth'

const Home = () => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <View className="flex h-screen flex-1 items-center justify-center">
      <Text className="text-2xl text-xs-green">Home</Text>
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
