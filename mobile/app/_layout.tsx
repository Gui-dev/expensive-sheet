import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Stack } from 'expo-router'
import Toast from 'react-native-toast-message'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import './../src/styles/global.css'
import { AuthProvider } from './../src/contexts/auth'
import { toastConfig } from '../src/config/toast'

export const unstable_settings = {
  initialRouteName: '(public)',
}

const Layout = () => {
  const [isLoadedFonts] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  if (!isLoadedFonts) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="text-xs-green" />
      </View>
    )
  }

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
        <Toast position="top" config={toastConfig} />
      </AuthProvider>
    </SafeAreaView>
  )
}

export default Layout
