import { ActivityIndicator, View } from 'react-native'
import { Redirect, Stack } from 'expo-router'

import { useAuth } from '../../src/hooks/useAuth'

const AuthLayout = () => {
  const { isUserLoading, user } = useAuth()

  if (isUserLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="text-xs-green" />
      </View>
    )
  }

  if (user) {
    return <Redirect href="/home" />
  }

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
