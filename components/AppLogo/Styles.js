import { StyleSheet } from 'react-native'

const AppLogoStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  logoContainer: {
    marginBottom: 20,
  },
  leftTitle: {
    color: '#CC1034',
    marginRight: 10,
    fontSize: 60,
    fontWeight: '100',
    fontFamily: 'montserrat-regular',
  },
  rightTitle: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'montserrat-regular',
  },
  subtitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 15,
    fontFamily: 'montserrat-light',
  },
})

export default AppLogoStyles
