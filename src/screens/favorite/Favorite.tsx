import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useAppTheme } from '../../hooks/themeContext';
import { RootState } from '../../utils/reduxUtil';
import { Todo } from '../../interfaces/type';
import { wp } from '../../constants/ResponsiveUI';
import { icon } from '../../assets/icons/icon';

export default function Favorite() {
  const { theme } = useAppTheme();
  const user = auth().currentUser;
  const uid = user?.uid || '';
  const userData = useSelector((state: RootState) =>
    state.todo.users.find(item => item.uid === uid),
  );
  const todos = userData?.todos || [];
  const saveDraft = userData?.saveDraft || [];

  const favoriteTodos = todos.filter(item => item.favorite === true);
  const favoriteDrafts = saveDraft.filter(item => item.favorite === true);
  const favoriteList = [...favoriteTodos, ...favoriteDrafts];

  const renderItem = ({ item }: { item: Todo }) => {
    return <Card item={item} />;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Header text="Favorite" backText="Back" />
      {favoriteList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={icon.noData} />
        </View>
      ) : (
        <FlatList
          data={favoriteList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
