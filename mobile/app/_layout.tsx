import { StatusBar } from 'expo-status-bar'
// import { ActivityIndicator, View } from 'react-native'
import { View } from 'react-native'
import { Stack } from 'expo-router'

import './../src/styles/global.css'

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
    <View className="flex flex-1 bg-gray-900">
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
        <Stack.Screen name="index" />
      </Stack>
    </View>
  )
}

export default Layout
