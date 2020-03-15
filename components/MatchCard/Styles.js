import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  container: {
    height: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
  },
  cardMatch: {
    shadowColor: '#aaaaaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  topSection: {
    flex: 5,
    flexDirection: 'row',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-around',
  },
  bottomItem: {
    width: wp('22%'),
    height: hp('4%'),
    borderColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  bottomAssistActive: {
    backgroundColor: '#8eea75',
  },
  bottomAssist: {
    backgroundColor: '#4eaa4c',
  },
  bottomNoAssistActive: {
    backgroundColor: '#ed7474',
  },
  bottomNoAssist: {
    backgroundColor: '#CC1034',
  },
  // bottomNoAssist:  {

  // },
  imageContainer: {
    flex: 1.3,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
  topInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

export default Styles
