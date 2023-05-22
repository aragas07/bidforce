import { StyleSheet, Dimensions } from 'react-native';

export const profileStyles = StyleSheet.create({
    listItem: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    listBorder: {
        borderColor: '#000'
    },
    listIcon: {
        paddingRight: 20
    },
    listItemSubtitle: {
        fontStyle: "italic",
        color: '#555'
    },
    icon:{
        fontSize: 27,
        color: '#707070',
        paddingVertical: 10,
        marginRight: 11,
        alignSelf: 'center',
        textAlign: 'center',
        width: 30
    },
    bottomlogo: {
      aspectRatio: 1,
      resizeMode: 'contain',
      marginTop: -90,
      height: 300,
      opacity: 0.5
    },
    divimg: {
      height: 100,
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      backgroundColor: 'black',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingTop: 17
    },
    list: {
        backgroundColor: '#000',
    },
});
