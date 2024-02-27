import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message'

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#0BD9B3', backgroundColor: '#020617' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: '#0BD9B3',
      }}
      text2Style={{
        fontSize: 15,
        color: '#e2e8f0',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF647C', backgroundColor: '#020617' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: '#FF647C',
      }}
      text2Style={{
        fontSize: 15,
        color: '#e2e8f0',
      }}
    />
  ),
}
