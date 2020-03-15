import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  addPlayerButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 50,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    zIndex: 5,
  },
})

export default Styles
