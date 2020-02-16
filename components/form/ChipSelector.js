import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

// Utils
import _ from 'lodash'

const styles = StyleSheet.create({
  chipContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chip: {
    borderRadius: 40,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'montserrat-regular',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  activeChip: {
    backgroundColor: '#22508F',
    color: 'white',
  },
  deactiveChip: {
    backgroundColor: '#aaaaaa',
    color: '#f7f7f7',
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
  },
})

const ChipSelector = ({
  value,
  values,
  label,
  multiple = false,
  touchable = false,
  markPrincipal = false,
  principal,
  customStyle,
  onValueChange,
}) => {
  const [chips, setChip] = useState([])

  useEffect(() => {
    const result = _.values(_.merge(_.keyBy(value, 'label'), _.keyBy(values, 'label')))
    setChip(result)
  }, [])

  // Chip methods
  const findChip = item => {
    const index = _.findIndex(chips, ['value', item.value])
    return index
  }

  const isPrincipal = item => {
    return item.value === principal
  }

  const handlePress = item => {
    const index = findChip(item)
    const newChips = [...chips]
    if (!newChips[index].active) {
      if (!multiple) {
        newChips.forEach(chip => {
          chip.active = false
        })
      }
    }
    newChips[index].active = !newChips[index].active
    setChip(newChips)
    onValueChange(chips)
  }

  const chip = item => (
    <Text
      key={item.value}
      style={[
        styles.chip,
        item.active ? styles.activeChip : styles.deactiveChip,
        customStyle,
        markPrincipal && isPrincipal(item) && { backgroundColor: '#CC1034' },
      ]}
    >
      {item.label}
    </Text>
  )

  return (
    <View style={styles.chipContainer}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View style={styles.chips}>
        {chips &&
          chips.map(item => {
            if (touchable) {
              return (
                <TouchableOpacity key={item.value} onPress={() => handlePress(item)}>
                  {chip(item)}
                </TouchableOpacity>
              )
            }
            return chip(item)
          })}
      </View>
    </View>
  )
}

export default ChipSelector
