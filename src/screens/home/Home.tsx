import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { styles } from './homeStyle';
import { errorToast, successToast } from '../../components/Toast';
import { useAppTheme } from '../../hooks/themeContext';
import AddItem from './AddItem';
import DashBoardCard from '../../components/DashBoardCard';
import TodoListButton from '../../components/TodoListButton';
import Card from '../../components/Card';
import { string } from '../../constants/string';
import { route } from '../../constants/routes';
import { RootState } from '../../utils/reduxUtil';
import { Todo } from '../../interfaces/type';
import { icon } from '../../assets/icons/icon';

// import getFirestore, {
//   collection,
//   doc,
//   getDoc,
// } from '@react-native-firebase/firestore';

import firestore from '@react-native-firebase/firestore';
const EmptyListMessage = () => (
  <View style={styles.emptyContainer}>
    <Image source={icon.noData} />
  </View>
);
const Home = () => {
  const user = auth().currentUser;
  const uid = user?.uid || '';

  // const db = getFirestore();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { dark, toggleTheme, theme } = useAppTheme();
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const todos = useSelector((state: RootState) => {
    const userData = state.todo.users.find(item => item.uid === uid);
    return userData?.todos || [];
  });

  console.log('TODOS =====>', todos);
  const favoriteTodos = todos.filter(item => item.favorite === true);
  const otherTodos = todos.filter(item => item.favorite !== true);
  const reorderedTodos = [...favoriteTodos, ...otherTodos];
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'OK',
          style: 'destructive',

          onPress: async () => {
            setLoading(true);

            try {
              await auth().signOut();

              successToast('success', 'User logout successfully');

              navigation.goBack();
            } catch (error) {
              console.log('LOGOUT ERROR', error);

              errorToast('error', 'User logout failed');
            } finally {
              setLoading(false);
            }
          },
        },
      ],

      {
        cancelable: true,
      },
    );
  };
  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePress = (buttonName: string, targetRoute: string) => {
    setSelectedButton(buttonName);

    navigation.navigate(targetRoute);
  };

  const getColl = useCallback(
    async () => {
      try {
        const snapshot = await firestore()
          .collection('user1')
          .doc('ajWENjr2yGDyUZR3ARJI')
          .get();

        console.log('snapshot', snapshot);
        console.log('exists', snapshot.exists);
        console.log(snapshot.data());
      } catch (error) {
        console.log('error', error);
      }
    },
    [
      /*db*/
    ],
  );

  useEffect(() => {
    getColl();
  }, [getColl]);

  const renderItem = ({ item }: { item: Todo }) => {
    return <Card item={item} />;
  };

  // if (!uid) {
  //   return null;
  // }
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerUser}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
            numberOfLines={1}
          >
            Welcome {user?.email}
          </Text>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleLogout}
              style={[
                styles.loginButton,
                {
                  backgroundColor: theme.button,
                },
              ]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>

        <DashBoardCard />

        <View style={styles.buttonContainer}>
          <TodoListButton
            title={string.TodoList.favorite}
            onPress={() => handlePress('favorite', route.favorite)}
            isSelected={selectedButton === 'favorite'}
            theme={theme}
          />

          <TodoListButton
            title={string.TodoList.saveDraft}
            onPress={() => handlePress('draft', route.saveDraft)}
            isSelected={selectedButton === 'draft'}
            theme={theme}
          />

          <TodoListButton
            title={dark ? 'Switch to Light' : 'Switch to Dark'}
            onPress={toggleTheme}
            color={theme.button}
          />
        </View>
        <FlatList
          data={reorderedTodos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyListMessage}
        />

        <BottomSheetModalProvider>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.stickyButton,
                {
                  backgroundColor: theme.button,
                },
              ]}
              onPress={handleOpen}
            >
              <Text style={styles.buttonTextSticky}>+</Text>
            </TouchableOpacity>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{
                backgroundColor: theme.card,
              }}
              handleIndicatorStyle={{
                backgroundColor: theme.text,
              }}
            >
              <BottomSheetView>
                <AddItem onClose={handleClose} />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
