import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';

import InputField from '../components/InputText';
import { hp, wp } from '../constants/responsiveUI';
import { color } from '../utils/color';
import { icon } from '../assets/icons/icon';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { routes } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SwipeButton from 'rn-swipe-button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import appleAuth from '@invertase/react-native-apple-authentication';
import { AppleAuthProvider } from '@react-native-firebase/auth';
import fontFamilies from '../assets/fonts/font';

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
        text2: 'Please enter email & password',
      });
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
      });

      navigation.replace(routes.home);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.type === 'success' && userInfo.data.idToken) {
        const credential = GoogleAuthProvider.credential(userInfo.data.idToken);

        await auth().signInWithCredential(credential);

        navigation.replace(routes.home);
      }
    } catch (e) {
      console.error('Google Sign-In Error:', e);
    }
  };

  const onApplePress = async () => {
    try {
      const response = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      if (!response.identityToken) return;

      const credential = AppleAuthProvider.credential(
        response.identityToken,
        response.nonce,
      );

      await auth().signInWithCredential(credential);

      navigation.replace(routes.home);
    } catch (e) {
      console.log(e);
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

      {Loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <SwipeButton
          title="Swipe to Login"
          onSwipeSuccess={handleLogin}
          railBackgroundColor={color.orange}
          railStyles={styles.thumbButton}
          thumbIconBackgroundColor={color.white}
          titleColor="#ffffff"
          titleStyles={styles.titleText}
          thumbIconImageSource={icon.rightArrow}
          thumbIconBorderColor={color.darkOrange}
          thumbIconStyles={styles.thumbIcon}
          // disableResetOnTap={true}
        />
      )}

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>Or continue with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={onGooglePress}>
          <Image source={icon.google} style={styles.icon} />
          <Text style={styles.titleText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn} onPress={onApplePress}>
          <Image source={icon.apple} style={styles.icon} />
          <Text style={styles.titleText}>Apple</Text>
        </TouchableOpacity>
      </View>
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

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },

  or: {
    marginHorizontal: 10,
    color: color.placeholderText,
    fontFamily: fontFamilies.poppins.Regular,
  },

  socialRow: {
    flexDirection: 'row',
    marginTop: hp(15),
  },

  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    gap: wp(10),
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    padding: hp(14),
    marginHorizontal: wp(5),
    borderRadius: wp(30),
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fontFamilies.poppins.Regular,
  },
  icon: {
    height: wp(20),
    width: wp(20),
  },
  thumbButton: {
    backgroundColor: '#eeeeeeff',
    borderWidth: 0,
  },
  swiperIcon: {
    borderWidth: 0,
  },
  thumbIcon: {
    height: 15,
    width: 10,
  },
});
