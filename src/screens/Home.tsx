import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import {
  CommonActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { routes } from '../constants/routes';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth().signOut();
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'See you again soon!',
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routes.tab }],
        }),
      );
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to logout',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Back!</Text>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#FF3B30"
            style={styles.loaderIcon}
          />
        ) : (
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutBtn}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  loaderIcon: {
    marginTop: 20,
  },
});

export default Home;
