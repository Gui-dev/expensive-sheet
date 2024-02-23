// import { ActivityIndicator, View } from 'react-native'
import { View } from 'react-native'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  // const user = true

  // if (user) {
  //   return <Redirect href="/home" />
  // }

  return (
    <View className="flex flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
  )
}

export default AuthLayout
