import { FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useAppTheme } from '../../hooks/themeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/reduxUtil';
import Card from '../../components/Card';
import { wp } from '../../constants/ResponsiveUI';

export default function Favorite() {
  const { theme } = useAppTheme();
  const todos = useSelector((state: RootState) => state.user.todos);
  const saveDraft = useSelector((state: RootState) => state.user.drafts);
  const favoriteList = todos.filter(item => item.favorite);

  const allData = [...saveDraft, ...favoriteList];
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header text="Favorite" backText="Back" />
      {favoriteList.length === 0 ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ color: theme.text, textAlign: 'center' }}>
          No Favorite Items
        </Text>
      ) : (
        <FlatList
          data={allData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Card item={item} />}
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
  },
});
