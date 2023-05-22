import {StyleSheet, Dimensions} from 'react-native';

export const MAIN_COLOR = '#061e69';

export const HomeStyles = StyleSheet.create({
  cancelledText: {
    color: '#999',
  },
  homeCards: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 10,
    borderWidth: 2,
    // borderColor: '#FFF',
    borderColor: '#999',
    borderRadius: 15,
    // backgroundColor: '#EEE',
  },
  modalButton: {
    padding: 10,
    borderColor: '#ededed',
    borderWidth: 1,
    width: '50%'
  },
  modalButtonText: {
    fontSize: 19,
    textAlign: 'center'
  },
  gridnopad: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  grid:{
    flexDirection: 'row',
    padding: 13,
    justifyContent: 'space-between'
  },
  vlbutton: {
    paddingVertical: 13,
    width: 170,
    borderColor: '#1e72f7',
    borderWidth: 2,
    borderRadius: 7
  },
  addNote: {
    padding: 14, 
    borderColor: '#d1d1d1',
    borderRadius: 5, 
    borderWidth: 1, 
    marginHorizontal: 10, 
    backgroundColor: 'white'
  },
  bidControll:{
    padding: 10,
    borderColor: '#d1d1d1',
    borderWidth: 1, 
    marginVertical: 3,
    borderRadius: 3
  },
  bidControllText:{
    fontSize: 17,
    textAlign: 'center',
  },
  addNoteText: {
    textAlign: 'center',
    fontSize: 17
  },
  primary:{
    paddingVertical: 13,
    width: 170,
    backgroundColor: '#1e72f7',
    borderColor: '#1e72f7',
    borderWidth: 2,
    borderRadius: 7
  },
  vlText: {
    textAlign: 'center',
    fontSize: 19,
  },
  vlTextwhite: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white'
  },
  flexibleGrid: {
    flex:1, 
    flexDirection:'row',
    flexWrap:'wrap',
  },
  flexibleRow:{
    flexDirection:'row'
  },
  listingCards:{
    fontWeight:'bold',
    color: '#ddd'
  },
  listingCardsDesc:{
    fontWeight:'normal',
    fontStyle:'italic',
  },
  entryCards: {
    marginTop: 5,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  entryRating: {
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  entryHomepage: {
    marginTop: 5,
    borderRadius: 15,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  entryNotification: {
    // marginTop: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 2,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  notificationBody: {
    marginTop: 5,
  },
  ScrollViewLimit: {
    marginBottom: 50,
    // marginBottom: 40
  },
  viewProfileLimit: {
    marginBottom: 50,
    // marginBottom: 40
  },
  listingTitle:{
    color:'#000',
    fontWeight:'bold',
    fontSize:20
  },
  listingManuf:{
    color:'#000',
    fontWeight:'bold',
    fontStyle:'italic',
    fontSize:20
  },
  listingYear:{
    fontStyle:'normal'
  },
  row: {
    flexDirection: 'row'
  }
});
