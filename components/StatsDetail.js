import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { getLabelStat } from '../constants/Player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  statsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleStat: {
    color: 'black',
    fontFamily: 'montserrat-regular',
    fontSize: 10,
  },
  valueStat: {
    color: 'black',
    fontFamily: 'montserrat-regular',
    fontWeight: 'bold',
    fontSize: 10,
  },
})

const StatsDetail = ({ stats }) => (
  <View style={styles.container}>
    <View style={styles.statsWrapper}>
      {stats &&
        Object.keys(stats).map((stat, i) => (
          <View style={styles.container} key={i}>
            <Icon name={getLabelStat(stat).icon} type="font-awesome" color="black" size={10} />
            <Text style={styles.titleStat}>{getLabelStat(stat).name}: </Text>
            <Text style={styles.valueStat}>{stats[stat]}</Text>
          </View>
        ))}
    </View>
  </View>
)

export default StatsDetail
