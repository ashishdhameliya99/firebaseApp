import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import InputField from '../components/InputText';

import { hp, wp } from '../constants/responsiveUI';
import { color } from '../utils/color';
import { icon } from '../assets/icons/icon';
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { routes } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

      setEmail('');
      setPassword('');
      setRePassword('');
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

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={email}
        onChange={setEmail}
        leftIconSource={icon.email}
        contextmenu={true}
      />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChange={setPassword}
        leftIconSource={icon.lock}
        contextmenu={true}
      />
      <InputField
        placeholder="Confirm Password"
        secureTextEntry
        value={RePassword}
        onChange={setRePassword}
        leftIconSource={icon.lock}
        contextmenu={true}
      />
      {Loading ? (
        <ActivityIndicator size="large" color="#cacbccff" />
      ) : (
        <CustomButton title="Register" onPress={handleSignup} />
      )}
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
});
