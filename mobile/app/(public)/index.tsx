import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const Signin = () => {
  return (
    <View className="flex h-screen flex-1 items-center justify-center">
      <Text className="text-2xl text-xs-green">SignIn</Text>
      <Link href="/signup" className="text-2xl text-white">
        Sign Up
      </Link>
    </View>
  )
}

export default Signin
