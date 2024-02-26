import { StatusBar } from 'expo-status-bar'
// import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'

import './../src/styles/global.css'
import { AuthProvider } from './../src/contexts/auth'

export const unstable_settings = {
  initialRouteName: '(public)',
}

const Layout = () => {
  // const [isLoadedFonts] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_700Bold,
  //   BaiJamjuree_700Bold,
  // })

  // if (!isLoadedFonts) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-gray-900">
  //       <ActivityIndicator size="large" color="text-xs-green" />
  //     </View>
  //   )
  // }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-900">
      <StatusBar style="light" translucent />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="(public)" />
        </Stack>
      </AuthProvider>
    </SafeAreaView>
  )
}

export default Layout
