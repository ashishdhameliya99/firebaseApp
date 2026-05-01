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

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import appleAuth from '@invertase/react-native-apple-authentication';
import { AppleAuthProvider } from '@react-native-firebase/auth';
import fontFamilies from '../assets/fonts/font';
import SwipeButton from 'rn-swipe-button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = async () => {
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

      navigation.navigate(routes.login);
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

      <Text style={styles.label}>Re-Password</Text>
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
        <SwipeButton
          title="Swipe to Login"
          onSwipeSuccess={handleSignup}
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

export default Register;

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
    color: '#888',
  },

  socialRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  socialBtn: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 14,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
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
