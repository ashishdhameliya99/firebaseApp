import React, { useMemo } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { RootState } from '.././utils/reduxUtil';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import { StyleSheet, Text, View } from 'react-native';
import { hp, rf, wp } from '.././constants/ResponsiveUI';
import fontFamilies from '.././assets/fonts/font';
import { useAppTheme } from '.././hooks/themeContext';

const TodoGraph = () => {
  const todos = useSelector((state: RootState) => state.user.todos);
  const { theme } = useAppTheme();
  const chartData = useMemo(() => {
    const counts = todos.reduce((acc: { [key: string]: number }, todo) => {
      const dateKey = new Date(todo.dob).toISOString().split('T')[0];

      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(date => ({
        value: counts[date],
        label: date,
        frontColor: theme.button,
      }));
  }, [todos, theme]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Header text="Graph" backText="Back" />
      </View>
      <View
        style={[
          styles.graphContainer,
          { backgroundColor: theme.dashBoardButton },
        ]}
      >
        <BarChart
          data={chartData}
          isAnimated
          barWidth={35}
          spacing={20}
          noOfSections={3}
          yAxisLabelTexts={['0', '5', '10', '15', '20']}
          xAxisLabelTextStyle={[styles.xAxisStyle]}
          yAxisLabelContainerStyle={[styles.yAxisStyle]}
          barBorderRadius={20}
          animationDuration={500}
          showValuesAsTopLabel
          backgroundColor={theme.dashBoardButton}
        />
      </View>
      <View style={[styles.footer, { backgroundColor: theme.card }]}>
        <Text style={[styles.footerText, { color: theme.text }]}>
          information_source: This chart represents the number of todos added
          for each Date of Birth.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  header: {
    paddingHorizontal: wp(20),
  },
  xAxisStyle: {
    fontSize: rf(8),
    rotation: 45,
    fontFamily: fontFamilies.poppins.Regular,
  },
  footer: {
    marginTop: hp(20),
    backgroundColor: '#ede9fe',
    padding: wp(10),
    borderRadius: 10,
  },
  footerText: {
    fontSize: rf(12),
    fontFamily: fontFamilies.poppins.semiBold,
  },
  yAxisStyle: {
    fontSize: rf(8),
    rotation: 45,
    fontFamily: fontFamilies.poppins.Regular,
    color: 'white',
  },
  graphContainer: {
    width: '100%',
  },
});
export default TodoGraph;
