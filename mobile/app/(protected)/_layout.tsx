// import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'

const ProtectedLayout = () => {
  const { user } = useAuth()

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
