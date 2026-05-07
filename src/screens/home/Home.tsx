import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './homeStyle';
import { errorToast, successToast } from '../../components/Toast';
import { useAppTheme } from '../../hooks/themeContext';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import AddItem from './AddItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DashBoardCard from '../../components/DashBoardCard';
import TodoListButton from '../../components/TodoListButton';
import { string } from '../../constants/string';
import { route } from '../../constants/routes';
import { Todo } from '../../interfaces/type';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/reduxUtil';
const Home = () => {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { dark, toggleTheme, theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  // const todos = useSelector(
  //   (state: RootState) => state.user.todosByUid[user?.uid || ''] || [],
  // );
  const todos = useSelector(
    (state: RootState) => state.user.todosByUid[user?.uid || ''] || [],
  );
  console.log('===============', todos);
  const filterData = todos.filter(item => item.favorite === true);
  const others = todos.filter(item => item.favorite !== true);
  const reorderedTodos = [...filterData, ...others];
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await auth().signOut();
              successToast('success', 'User success logout');
              navigation.goBack();
            } catch {
              errorToast('error', 'user not logout');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
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
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const renderItem = ({ item }: { item: Todo }) => <Card item={item} />;
  return (
    <GestureHandlerRootView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerUser}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            Welcome {user?.email}
          </Text>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.loginButton, { backgroundColor: theme.button }]}
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
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        />
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.stickyButton, { backgroundColor: theme.button }]}
              onPress={handleOpen}
            >
              <Text style={styles.buttonTextSticky}>+</Text>
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: theme.card }}
              handleIndicatorStyle={{ backgroundColor: theme.text }}
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
