import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBackgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  backColor: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'montserrat-regular',
    marginTop: getStatusBarHeight() * 1.5,
    marginLeft: 10,
  },
  topBackgroundImageWithColor: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 63, 63, .6)',
  },
  avatarWrapper: {
    flex: 2,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  avatar: {
    marginTop: 30,
  },
  subtitle: {
    color: 'white',
    fontFamily: 'montserrat-light',
    fontSize: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

export default Styles
