import React, { useCallback, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { errorToast, successToast } from '../../components/Toast';

const Register = () => {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const sendPhoneOtp = useCallback(async (phoneNumber: string) => {
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        phoneNumber,
      );

      setConfirm(confirmationResult);
      successToast('Success', 'OTP send success');
    } catch {
      errorToast('Error', 'OTP not send');
    }
  }, []);

  const signInWithPhoneNumber = async () => {
    auth().settings.appVerificationDisabledForTesting = true;
    await sendPhoneOtp(phone);
  };

  const confirmCode = async () => {
    try {
      if (!confirm) return;

      await confirm.confirm(code);

      // Alert.alert('Success', 'User signed in!');
      successToast('Success', 'User singing');
    } catch (error) {
      console.log('Invalid OTP:', error);
      errorToast('Error', 'OTP not send');
      error;
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {!confirm ? (
        <>
          <TextInput
            placeholder="Enter Phone Number (+91...)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
            }}
          />
          <Button title="Send OTP" onPress={signInWithPhoneNumber} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
            }}
          />
          <Button title="Verify OTP" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default Register;
