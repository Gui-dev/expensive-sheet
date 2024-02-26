import { Link } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native'

import logo from './../../src/assets/logo.png'
import { FormSignin } from './../../src/components/form-signin'

const Signin = () => {
  return (
    <KeyboardAvoidingView
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      behavior="padding"
    >
      <View className="w-full">
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 16,
            paddingBottom: 16,
            gap: 16,
          }}
        >
          <Image source={logo} alt="Image Logo" className="h-20 w-20" />
          <Text className="text-2xl text-xs-green">Login</Text>
          <FormSignin />
          <Link href="/signup" className="mt-4 text-sm text-white">
            Não tem cadastro?{' '}
            <Text className="mt-2 text-base font-bold text-xs-green">
              Cadastre agora
            </Text>
          </Link>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signin
