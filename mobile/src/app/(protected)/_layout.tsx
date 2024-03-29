import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { ActivityIndicator, View } from 'react-native'
import { Redirect } from 'expo-router'
import { useAuth } from '../../hooks/useAuth'
import colors from 'tailwindcss/colors'
import Feather from '@expo/vector-icons/Feather'

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
    <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
      <Drawer
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.gray[200],
          drawerInactiveTintColor: colors.gray[400],
          drawerActiveBackgroundColor: colors.gray[700],
          drawerStyle: {
            width: 100,
            backgroundColor: colors.gray[800],
          },
          drawerContentContainerStyle: {
            marginTop: 40,
            marginHorizontal: 20,
          },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: '',
            drawerIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
            drawerActiveBackgroundColor: 'transparent',
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
        <Drawer.Screen
          name="config"
          options={{
            title: '',
            drawerIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
            drawerActiveBackgroundColor: 'transparent',
            drawerLabelStyle: {
              fontSize: 16,
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default ProtectedLayout
