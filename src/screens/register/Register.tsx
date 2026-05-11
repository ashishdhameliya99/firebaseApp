import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import InputField from '../../components/InputText';
import { icon } from '../../assets/icons/icon';
import { styles } from './registerStyle';
import { auth } from '../../utils/firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  AppleAuthProvider,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';

import appleAuth from '@invertase/react-native-apple-authentication';
import { errorToast, successToast } from '../../components/Toast';
GoogleSignin.configure({
  webClientId:
    '1021574425223-j7e9arqqmu85utu85q5cb44279gso0p5.apps.googleusercontent.com',
});

const Register = ({ setTab }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!email || !password || !RePassword) {
      errorToast('Invalid', 'Please fill all fields');
      return;
    }

    if (password !== RePassword) {
      errorToast('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      errorToast('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      console.log('Registered User:', response.user);

      successToast('Success', 'Account created successfully');

      setTab('login');
    } catch (error: any) {
      console.log('Signup Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        errorToast('Email Exists', 'This email is already registered');
      } else if (error.code === 'auth/invalid-email') {
        errorToast('Invalid Email', 'Please enter valid email');
      } else {
        errorToast('Signup Failed', error.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const signInResult = await GoogleSignin.signIn();

      console.log('Google User:', signInResult);

      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);

      const userCredential = await signInWithCredential(
        getAuth(),
        googleCredential,
      );

      console.log('Google Login Success:', userCredential.user);

      successToast('Success', 'Google login successful');
    } catch (error: any) {
      console.log('Google Login Error:', error);

      errorToast(
        'Google Login Failed',
        error.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const onAppleButtonPress = async () => {
    try {
      setLoading(true);

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,

        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - No identity token returned');
      }

      const { identityToken, nonce } = appleAuthRequestResponse;

      const appleCredential = AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      const userCredential = await signInWithCredential(
        getAuth(),
        appleCredential,
      );

      console.log('Apple Login Success:', userCredential.user);

      successToast('Success', 'Apple login successful');
    } catch (error: any) {
      console.log('Apple Login Error:', error);

      errorToast('Apple Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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

        <Text style={styles.label}>Confirm Password</Text>

        <InputField
          placeholder="Confirm your password"
          secureTextEntry
          value={RePassword}
          onChange={setRePassword}
          leftIconSource={icon.lock}
          contextmenu={true}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
            <Text style={styles.buttonText}>Register</Text>
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

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={onAppleButtonPress}
            >
              <Image source={icon.apple} style={styles.icon} />

              <Text>Apple</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 30,
          }}
        >
          <Text>Already have an account? </Text>

          <TouchableOpacity onPress={() => setTab('login')}>
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
