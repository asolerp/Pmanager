import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    height: 60,
    borderColor: '#aaaaaa',
  },
  input: {
    fontSize: 30,
    flex: 0.7,
    borderRadius: 50,
    height: 50,
    fontFamily: 'montserrat-regular',
    fontWeight: '300',
    marginLeft: 10,
    width: '100%',
  },
  labelWrapper: {
    flex: 0.3,
    height: '100%',
    backgroundColor: '#22508F',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '400',
    color: 'white',
    marginLeft: 10,
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
})

export default Styles
