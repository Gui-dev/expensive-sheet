import { StatusBar } from 'expo-status-bar'
// import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'

const ProtectedLayout = () => {
  // const user = false

  // if (!user) {
  //   return <Redirect href="/(public)" />
  // }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-900">
      <StatusBar style="light" translucent />
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
