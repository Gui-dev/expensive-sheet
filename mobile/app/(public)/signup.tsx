import { Link } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native'

import logo from './../../src/assets/logo.png'
import { FormSignup } from '../../src/components/form-signup'

const Signup = () => {
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
          <Text className="text-2xl text-xs-green">Cadastro</Text>
          <FormSignup />
          <Link href="/(public)" className="mt-4 text-sm text-white">
            Já tem cadastro?{' '}
            <Text className="text-base font-bold text-xs-green">
              faça login
            </Text>
          </Link>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup
