import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    left: 193 - 25 - 2.5,
    top: -10,
    zIndex: 10,
    flexDirection: 'row',
  },
  score: {
    width: 25,
    height: 50,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  avatar: {
    borderWidth: 2,
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  avatarText: {
    color: 'white',
    width: '100%',
    backgroundColor: 'black',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 5,
    borderRadius: 5,
    height: 20,
  },
  emptyPlayer: {
    width: 40,
    height: 40,
    borderStyle: 'dashed',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: 'rgba(127, 127, 127, 0.4)',
    zIndex: 0,
  },
})

export default Styles
