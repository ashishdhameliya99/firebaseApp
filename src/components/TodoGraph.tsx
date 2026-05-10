import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts';
import Header from '.././components/Header';
import { useAppTheme } from '.././hooks/themeContext';
import { RootState } from '.././utils/reduxUtil';
import { hp, rf, wp } from '.././constants/ResponsiveUI';
import fontFamilies from '.././assets/fonts/font';

const TodoGraph = () => {
  const { theme } = useAppTheme();
  const user = auth().currentUser;
  const uid = user?.uid || '';
  const userData = useSelector((state: RootState) =>
    state.todo.users.find(item => item.uid === uid),
  );

  const todos = useMemo(() => userData?.todos || [], [userData]);
  const chartData = useMemo(() => {
    const counts = todos.reduce(
      (
        acc: {
          [key: string]: number;
        },
        todo,
      ) => {
        const dateKey = new Date(todo.dob).toISOString().split('T')[0];

        acc[dateKey] = (acc[dateKey] || 0) + 1;

        return acc;
      },
      {},
    );

    return Object.keys(counts)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

      .map(date => ({
        value: counts[date],

        label: date.slice(5),

        frontColor: theme.button,
      }));
  }, [todos, theme.button]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Header text="Graph" backText="Back" />
      </View>
      <View
        style={[
          styles.graphContainer,
          {
            backgroundColor: theme.dashBoardButton,
          },
        ]}
      >
        {chartData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.text,
                },
              ]}
            >
              No Graph Data Found
            </Text>
          </View>
        ) : (
          <BarChart
            data={chartData}
            isAnimated
            barWidth={35}
            spacing={20}
            noOfSections={5}
            maxValue={10}
            barBorderRadius={8}
            animationDuration={500}
            showValuesAsTopLabel
            yAxisThickness={1}
            xAxisThickness={1}
            xAxisLabelTextStyle={[
              styles.xAxisStyle,
              {
                color: theme.text,
              },
            ]}
            yAxisTextStyle={{
              color: theme.text,
              fontSize: rf(10),
            }}
          />
        )}
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Text
          style={[
            styles.footerText,
            {
              color: theme.text,
            },
          ]}
        >
          Information Source: This graph represents total todos grouped by Date
          of Birth.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TodoGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },

  header: {
    paddingHorizontal: wp(20),
  },

  graphContainer: {
    width: '100%',
    minHeight: hp(350),
    paddingVertical: hp(20),
    borderRadius: 10,
  },

  xAxisStyle: {
    fontSize: rf(8),
    rotation: 45,
    fontFamily: fontFamilies.poppins.Regular,
  },

  footer: {
    marginTop: hp(20),
    padding: wp(10),
    borderRadius: 10,
    marginHorizontal: wp(20),
  },

  footerText: {
    fontSize: rf(12),
    fontFamily: fontFamilies.poppins.semiBold,
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  emptyText: {
    fontSize: rf(16),
    fontFamily: fontFamilies.poppins.semiBold,
  },
});
