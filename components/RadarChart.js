import React, { useState } from 'react'
import Svg from 'react-native-svg'

import { StyleSheet, View } from 'react-native'
import { VictoryPolarAxis, VictoryChart, VictoryTheme, VictoryBar } from 'victory-native'

export default function RadarChart(props) {
  return (
    <View>
      <Svg style={styles.container}>
        <VictoryChart polar theme={VictoryTheme.material}>
          {props.labels.map((d, i) => {
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
          <VictoryBar style={{ data: { fill: 'tomato', width: 25 } }} data={props.data} />
        </VictoryChart>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: -20,
  },
})
