import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TotalButton from './TotalButton';
import CardTitle from './CardTitle';
import { useAppTheme } from '.././hooks/themeContext';
import { useSelector } from 'react-redux';
import { RootState } from '.././utils/reduxUtil';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { route } from '.././constants/routes';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import fontFamilies from '.././assets/fonts/font';

export default function DashBoardCard() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const currentUid = auth().currentUser?.uid;

  const users = useSelector((state: RootState) => state.todo.users) || [];
  const currentUserData = users.find(user => user.uid === currentUid);
  const userTodos = currentUserData?.todos || [];
  const userDrafts = currentUserData?.saveDraft || [];

  const combinedItems = [...userTodos, ...userDrafts];
  const totalCombinedCount = combinedItems.length;
  const favoriteCount = combinedItems.filter(item => item.favorite).length;
  const totalTodosCount = userTodos.length;
  const draftCount = userDrafts.length;

  const getCombinedPercentage = (count: number) =>
    totalCombinedCount > 0 ? (count / totalCombinedCount) * 10 : 0;
  const favoritePercentage = getCombinedPercentage(favoriteCount);

  console.log('favoriteCount', getCombinedPercentage(favoriteCount));

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardStyle, { backgroundColor: theme.borderColor }]}>
        <CardTitle title="Total" />
        <TotalButton text="Completed" />
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={getCombinedPercentage(totalTodosCount)}
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
          fill={getCombinedPercentage(favoritePercentage)}
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
          fill={getCombinedPercentage(draftCount)}
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
