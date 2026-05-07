import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/reduxUtil';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useAppTheme } from '../../hooks/themeContext';
import { wp } from '../../constants/ResponsiveUI';
import { Todo } from '../../interfaces/type';

export default function SaveDraft() {
  const { theme } = useAppTheme();
  const saveDraft = useSelector((state: RootState) => state.user.drafts);

  const renderItem: ListRenderItem<Todo> = ({ item }) => <Card item={item} />;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header text="SaveDraft" backText="Back" />

      <FlatList
        data={saveDraft}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.cardContainer}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.emptyData}>No data</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
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
  },
  emptyData: {
    textAlign: 'center',
  },
});
