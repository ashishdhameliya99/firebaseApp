import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';

import InputField from '../../components/InputText';
import { color } from '../../utils/color';
import { icon } from '../../assets/icons/icon';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { routes } from '../../constants/routes';
// import SwipeButton from '../components/SwipButton';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import appleAuth from '@invertase/react-native-apple-authentication';
// import { AppleAuthProvider } from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import appleAuth from '@invertase/react-native-apple-authentication';
import { string } from '../../constants/string';
import { styles } from './loginStyle';
import fontFamilies from '../../assets/fonts/font';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogin = async () => {
    console.log('LOGIN FUNCTION CALLED', email, password);

    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please enter email & password',
      });
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
      });

      navigation.replace(routes.home);
    } catch (e: any) {
      console.log('Login Error:', e);

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // const onGooglePress = async () => {
  //   try {
  //     const currentUser = auth().currentUser;

  //     if (currentUser) {
  //       console.log('Already logged in (Firebase)');
  //       navigation.replace(routes.home);
  //       return;
  //     }

  //     try {
  //       const silentUser = await GoogleSignin.signInSilently();

  //       const idToken = silentUser?.idToken || silentUser.data?.idToken;

  //       if (idToken) {
  //         const credential = GoogleAuthProvider.credential(idToken);
  //         await auth().signInWithCredential(credential);

  //         console.log('Silent Google Login Success');
  //         navigation.replace(routes.home);
  //         return;
  //       }
  //     } catch {
  //       console.log('No previous Google session');
  //     }

  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });

  //     const userInfo = await GoogleSignin.signIn();

  //     const idToken = userInfo.idToken || userInfo.data?.idToken;

  //     if (!idToken) throw new Error('No ID token found');

  //     const credential = GoogleAuthProvider.credential(idToken);

  //     await auth().signInWithCredential(credential);

  //     console.log('Manual Google Login Success');

  //     navigation.replace(routes.home);
  //   } catch (e: any) {
  //     console.log('Google Error:', e);

  //     Toast.show({
  //       type: 'error',
  //       text1: 'Google Login Failed',
  //       text2: e.message,
  //     });
  //   }
  // };

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

  const onGooglePress = async () => {
    try {
      if (auth().currentUser) {
        navigation.replace(routes.home);
        return;
      }

      try {
        const silentUser = await GoogleSignin.signInSilently();
        console.log('Silent Sign-In Response:', silentUser);

        if (silentUser.type === 'success' && silentUser.data?.idToken) {
          const credential = GoogleAuthProvider.credential(
            silentUser.data.idToken,
          );
          await auth().signInWithCredential(credential);
          navigation.replace(routes.home);
          return;
        }

        console.log('Silent login result:', silentUser.type);
      } catch {
        console.log('Silent login failed, proceeding to manual');
      }

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('Manual Sign-In Response:', userInfo);

      if (userInfo.type === 'success') {
        const idToken = userInfo.data?.idToken;
        if (!idToken) throw new Error('No ID token found in response');

        const credential = GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);

        navigation.replace(routes.home);
      } else {
        console.log('User cancelled or sign-in already in progress');
      }
    } catch (e: any) {
      console.log('Google Error Details:', e);

      const errorMessage =
        e.code === '7' ? 'Network Error. Check your internet.' : e.message;

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: color.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <InputField
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            leftIconSource={icon.email}
          />

          <Text style={styles.label}>Password</Text>
          <InputField
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChange={setPassword}
            leftIconSource={icon.lock}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#999" />
          ) : (
            // <SwipeButton title="Swipe to Login" onSwipe={handleLogin} />
            // <View>
            //   <Button title="Login" onPress={handleLogin} />
            // </View>
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => setChecked(!checked)}
              activeOpacity={0.7}
            >
              <Image
                source={checked ? icon.check : icon.uncheck}
                style={styles.icon}
              />

              <Text
                style={[
                  styles.label,
                  { fontFamily: fontFamilies.poppins.Regular },
                ]}
              >
                Remember me
              </Text>
            </TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>
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

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={onAppleButtonPress}
            >
              <Image source={icon.apple} style={styles.icon} />
              <Text>Apple</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.acLinkContainer}>
            <Text style={styles.dontHaveText}>{string.dontHaveAc}</Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate(routes.register)}
            >
              {string.createAc}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
