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

import auth, {
  AppleAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

import InputField from '../../components/InputText';
import { icon } from '../../assets/icons/icon';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { routes } from '../../constants/routes';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import appleAuth from '@invertase/react-native-apple-authentication';
import { string } from '../../constants/string';
import { styles } from './loginStyle';
import fontFamilies from '../../assets/fonts/font';
import { errorToast, successToast } from '../../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogin = async () => {
    console.log('login user', email, password);

    if (!email.trim() || !password.trim()) {
      errorToast('Require field', 'please enter email and password');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
      successToast('Success', 'Welcome Back');
      navigation.navigate('Home');
    } catch (e: any) {
      console.log('Login Error:', e);
      errorToast('Login failed', 'require all field');
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

  GoogleSignin.configure({
    webClientId:
      '1021574425223-j7e9arqqmu85utu85q5cb44279gso0p5.apps.googleusercontent.com',
  });

  async function onGooglePress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = GoogleAuthProvider.credential(
      signInResult.data?.idToken,
    );

    return signInWithCredential(getAuth(), googleCredential);
  }

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
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
