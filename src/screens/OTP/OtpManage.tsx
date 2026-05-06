import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const OtpManage = () => {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      console.log('OTP Sent!');
    } catch (error) {
      console.log('Error sending OTP:', error);
    }
  };

  const confirmCode = async () => {
    try {
      if (confirm) {
        await confirm.confirm(code);
        console.log('User signed in!');
      }
    } catch (error) {
      console.log('Invalid OTP:', error);
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
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <Button title="Send OTP" onPress={signInWithPhoneNumber} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={code}
            onChangeText={setCode}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <Button title="Verify OTP" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default OtpManage;
