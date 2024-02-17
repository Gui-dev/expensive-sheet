// import { StatusBar } from 'expo-status-bar'
// import { ActivityIndicator, ImageBackground, View } from 'react-native'
import { Stack } from 'expo-router'

const Layout = () => {
  // const [isLoadedFonts] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_700Bold,
  //   BaiJamjuree_700Bold,
  // })

  // if (!isLoadedFonts) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-gray-900">
  //       <ActivityIndicator size="large" color={colors.green[700]} />
  //     </View>
  //   )
  // }

  return (
    <>
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
    </>
  )
}

export default Layout
