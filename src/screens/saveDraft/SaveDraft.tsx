import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useAppTheme } from '../../hooks/themeContext';
import { RootState } from '../../utils/reduxUtil';
import { wp } from '../../constants/ResponsiveUI';
import { Todo } from '../../interfaces/type';
import { icon } from '../../assets/icons/icon';

const EmptyListMessage = () => (
  <View style={styles.emptyContainer}>
    <Image source={icon.noData} />
  </View>
);
export default function SaveDraft() {
  const { theme } = useAppTheme();
  const user = auth().currentUser;
  const uid = user?.uid || '';
  const userData = useSelector((state: RootState) =>
    state.todo.users.find(item => item.uid === uid),
  );

  console.log('saveDraft userData', userData);
  const saveDraft = userData?.saveDraft || [];
  console.log('saveDraft', saveDraft);
  const renderItem: ListRenderItem<Todo> = ({ item }) => <Card item={item} />;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Header text="Save Draft" backText="Back" />

      <FlatList
        data={saveDraft}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
  },

  cardContainer: {
    gap: 10,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  emptyData: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
