import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TotalButton from './TotalButton';
import CardTitle from './CardTitle';
import { useAppTheme } from '.././hooks/themeContext';
import { useSelector } from 'react-redux';
import { RootState } from '.././utils/reduxUtil';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { route } from '.././constants/routes';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import fontFamilies from '.././assets/fonts/font';

export default function DashBoardCard() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const todos = useSelector((state: RootState) => state.user.todos);
  const saveDraft = useSelector((state: RootState) => state.user.drafts);
  const totalLength = todos?.length || 0;
  const favoriteList = todos.filter(item => item.favorite);
  const favoriteLength = favoriteList?.length || 0;
  const saveDraftLength = saveDraft?.length || 0;
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardStyle, { backgroundColor: theme.borderColor }]}>
        <CardTitle title="Total" />
        <TotalButton text="Completed" />
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={totalLength}
          tintColor="#040404ff"
          backgroundColor="#fcfcfcff"
          style={styles.progress}
        >
          {(fill: number) => (
            <Text style={styles.points}>{Math.round(fill)}%</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={[styles.cardStyle, { backgroundColor: theme.borderColor }]}>
        <CardTitle title="Favorite" />
        <TotalButton text="WishListed" />
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={favoriteLength}
          tintColor="#101010ff"
          backgroundColor="#fcfcfcff"
          style={styles.progress}
        >
          {(fill: number) => (
            <Text style={styles.points}>{Math.round(fill)}%</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={[styles.cardStyle, { backgroundColor: theme.borderColor }]}>
        <CardTitle title="Save Draft" />
        <TotalButton text="Pending Task" />
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={saveDraftLength}
          tintColor="#101010ff"
          backgroundColor="#fcfcfcff"
          style={styles.progress}
        >
          {(fill: number) => (
            <Text style={styles.points}>{Math.round(fill)}%</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={[styles.cardStyle, { backgroundColor: theme.borderColor }]}>
        <CardTitle title="Bar Graph" />
        <TotalButton
          onPress={() => navigation.navigate(route.todoGraph)}
          text="Data Visualization"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cardStyle: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
    shadowOpacity: 0.1,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  points: {
    fontFamily: fontFamilies.poppins.bold,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progress: { marginLeft: 10, marginBottom: 10 },
});
