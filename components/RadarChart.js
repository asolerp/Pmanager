import React, { useState } from 'react'
import 'react-native-svg'

import { StyleSheet, View } from 'react-native'
import { VictoryPolarAxis, VictoryChart, VictoryTheme, VictoryBar } from 'victory-native'

export default function RadarChart() {
  return (
    <View style={styles.container}>
      <VictoryChart polar theme={VictoryTheme.material}>
        {['cat', 'dog', 'bird', 'dog', 'frog', 'fish'].map((d, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{ tickLabels: { fill: 'none' } }}
              axisValue={d}
            />
          )
        })}
        <VictoryBar
          style={{ data: { fill: 'tomato', width: 25 } }}
          data={[
            { x: 'cat', y: 10 },
            { x: 'dog', y: 25 },
            { x: 'bird', y: 40 },
            { x: 'frog', y: 50 },
            { x: 'fish', y: 50 },
          ]}
        />
      </VictoryChart>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
