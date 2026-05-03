import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import InputField from '../../components/InputText';
import { icon } from '../../assets/icons/icon';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { routes } from '../../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import appleAuth from '@invertase/react-native-apple-authentication';
import { styles } from './registerStyle';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = async () => {
    console.log('EMAIL:', email);
    console.log('PASSWORD:', password);
    if (!email || !password || !RePassword) {
      Toast.show({
        type: 'error',
        text1: 'Not allow',
        text2: 'Please fill in all fields',
      });
      return;
    }

    if (password !== RePassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }

    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      Toast.show({
        type: 'success',
        text2: 'Account created successfully',
      });

      navigation.navigate('Login');
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Email invalid',
      });
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      console.log('Google Login Success');

      navigation.replace(routes.home);
    } catch (e: any) {
      console.log('Google Login Error:', e);

      Toast.show({
        type: 'error',
        text1: 'Google Login Failed',
        text2: e.message,
      });
    }
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, nonce } = appleAuthRequestResponse;

        if (identityToken) {
          const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
          );

          await auth().signInWithCredential(appleCredential);
          console.log('Apple Login Success');
          navigation.replace(routes.home);
        }
      }
    } catch (error: any) {
      console.log('Apple Auth Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <InputField
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        leftIconSource={icon.email}
        contextmenu={true}
      />

      <Text style={styles.label}>Password</Text>
      <InputField
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChange={setPassword}
        leftIconSource={icon.lock}
        contextmenu={true}
      />

      <Text style={styles.label}>Re Password</Text>
      <InputField
        placeholder="Confirm your password"
        secureTextEntry
        value={RePassword}
        onChange={setRePassword}
        leftIconSource={icon.lock}
        contextmenu={true}
      />

      {Loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        // <SwipeButton title="Swipe to Sign up" onSwipe={handleSignup} />
        // <View style={{ marginTop: 20 }}>
        //   <Button title="Register" onPress={handleSignup} />
        // </View>
        <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>Or continue with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={onGooglePress}>
          <Image source={icon.google} style={styles.icon} />
          <Text>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn} onPress={onAppleButtonPress}>
          <Image source={icon.apple} style={styles.icon} />
          <Text>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
