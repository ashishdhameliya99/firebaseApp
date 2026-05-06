import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Login from './login/Login';
import Register from './register/Register';
import { color } from '../utils/color';
import { rf } from '../constants/responsiveUI';
import fontFamilies from '../assets/fonts/font';

const Auth = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.appName}>DishDash</Text>

        <Text style={styles.title}>
          {tab === 'login' ? 'Welcome Back' : 'Create Account'}
        </Text>

        <Text style={styles.subtitle}>
          {tab === 'login'
            ? 'Sign in to continue ordering your\n favorite meals.'
            : 'Join us today and start enjoying fast\n food delivery.'}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, tab === 'login' && styles.activeTab]}
            onPress={() => setTab('login')}
          >
            <Text
              style={[styles.tabText, tab === 'login' && styles.activeText]}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, tab === 'signup' && styles.activeTab]}
            onPress={() => setTab('signup')}
          >
            <Text
              style={[styles.tabText, tab === 'signup' && styles.activeText]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          {tab === 'login' ? <Login /> : <Register setTab={setTab} />}
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4D00',
  },

  header: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  appName: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.9,
  },

  title: {
    fontSize: rf(26),
    fontFamily: fontFamilies.poppins.bold,
    color: '#fff',
  },

  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    fontSize: rf(13),
    fontFamily: fontFamilies.poppins.Regular,
  },

  card: {
    flex: 1,
    backgroundColor: color.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#fff',
  },

  tabText: {
    color: '#888',
    fontWeight: '500',
  },

  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
