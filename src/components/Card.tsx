import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Menu } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../hooks/themeContext';
import { hp, wp } from '../constants/ResponsiveUI';
import { toggleFavorite } from '../redux/slice/toDoSlice';
import { route } from '../constants/routes';
import { deleteTodoAndDraft } from '../redux/actions/action';
import { useAppDispatch } from '../utils/reduxUtil';
import fontFamilies from '../assets/fonts/font';
import { icon } from '../assets/icons/icon';
import { Todo } from '../interfaces/type';

export default function Card({ item }: { item: Todo }) {
  const [visible, setVisible] = useState(false);
  const user = auth().currentUser;
  const uid = user?.uid || '';
  const { theme } = useAppTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleFavorite = () => {
    dispatch(
      toggleFavorite({
        uid,
        id: item.id,
      }),
    );
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={styles.menuContainer}
      anchor={
        <TouchableOpacity
          style={[
            styles.cardContainer,
            styles.cardBorder,
            {
              backgroundColor: theme.card,
              borderLeftColor: theme.borderColor,
            },
          ]}
          onLongPress={openMenu}
          delayLongPress={500}
        >
          <View style={styles.leftContent}>
            <Text
              style={[
                styles.textCard,
                {
                  color: theme.text,
                },
              ]}
            >
              Name: {item.name}
            </Text>

            <Text
              style={[
                styles.textCard,
                {
                  color: theme.text,
                },
              ]}
            >
              Email: {item.email}
            </Text>

            <Text
              style={[
                styles.textCard,
                {
                  color: theme.text,
                },
              ]}
            >
              Phone:
              {item.countryCode}
              {item.phone}
            </Text>

            <Text
              style={[
                styles.textCard,
                {
                  color: theme.text,
                },
              ]}
            >
              Date:{' '}
              {new Date(item.dob).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={handleFavorite}>
            <Image
              source={item.favorite ? icon.selected : icon.unSelected}
              style={[
                styles.icon,
                {
                  tintColor: theme.todoListButtonText,
                },
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={() => {
          navigation.navigate(route.addItem, {
            data: item,
          });
          closeMenu();
        }}
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          Alert.alert('Alert', 'Are you sure?', [
            {
              text: 'OK',
              onPress: () => {
                dispatch(deleteTodoAndDraft(uid, item.id));
              },
            },
            {
              text: 'Cancel',
              style: 'destructive',
            },
          ]);

          closeMenu();
        }}
        title="Delete"
      />
      <Menu.Item
        onPress={() => {
          handleFavorite();
          closeMenu();
        }}
        title={item.favorite ? 'Remove Favorite' : 'Add Favorite'}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: wp(10),
    borderRadius: wp(10),
    flexDirection: 'row',
  },

  menuContainer: {
    marginLeft: wp(200),
    marginTop: hp(20),
  },

  textCard: {
    fontFamily: fontFamilies.poppins.Regular,
  },

  cardBorder: {
    borderLeftWidth: 10,
  },

  leftContent: {
    flex: 1,
  },

  icon: {
    height: hp(25),
    width: hp(25),
  },
});
