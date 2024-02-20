import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const Signup = () => {
  return (
    <View className="flex h-screen flex-1 items-center justify-center">
      <Text className="text-2xl text-xs-green">SignUp</Text>
      <Link href="/(public)" className="text-2xl text-white">
        Sign In
      </Link>
    </View>
  )
}

export default Signup
