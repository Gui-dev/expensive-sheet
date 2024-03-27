import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Redirect } from 'expo-router'
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="home"
            options={{
              drawerLabel: 'Dashboard',
              title: 'overview',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default ProtectedLayout
