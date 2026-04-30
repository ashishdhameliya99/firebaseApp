import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import auth, {
  AppleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import InputField from '../components/InputText';

import { color } from '../utils/color';
import { icon } from '../assets/icons/icon';
import { hp, wp } from '../constants/responsiveUI';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please enter both email and password',
      });
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: 'Logged in successfully',
      });

      setEmail('');
      setPassword('');
      navigation.navigate('StackNavigation', { screen: 'Home' });
    } catch (err: any) {
      let errorMsg = 'Invalid email or password';

      if (err.code === 'auth/user-not-found') {
        errorMsg = 'No user found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMsg = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Email address is badly formatted';
      }

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMsg,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,

      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

    return signInWithCredential(getAuth(), appleCredential);
  }

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={email}
        onChange={setEmail}
        leftIconSource={icon.email}
        autoCapital="none"
      />

      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChange={setPassword}
        leftIconSource={icon.lock}
        contextmenu={true}
      />

      {Loading ? (
        <ActivityIndicator size="large" color="#cacbccff" />
      ) : (
        <CustomButton title="Login" onPress={handleLogin} />
      )}

      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.CONTINUE}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: 50,
          marginVertical: 10,
        }}
        onPress={() => onAppleButtonPress()}
      />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: color.white,
    paddingTop: hp(20),
    paddingHorizontal: wp(20),
  },
});
