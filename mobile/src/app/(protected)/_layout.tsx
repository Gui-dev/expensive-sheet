// import { ActivityIndicator, View } from 'react-native'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../../hooks/useAuth'

const ProtectedLayout = () => {
  const { isUserLoading, user } = useAuth()

  if (isUserLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="text-xs-green" />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/(public)" />
  }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="home" />
      </Stack>
    </SafeAreaView>
  )
}

export default ProtectedLayout
