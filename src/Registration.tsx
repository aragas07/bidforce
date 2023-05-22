import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  List,
  View
} from 'react-native';

export default function Registration(){
    return (<View style={styles.whole}>
        <Text style={styles.text}>Example</Text> 
    </View>)
}

const styles = StyleSheet.create({
    whole: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 70,
    },
    text: {
        fontSize: 37
    }
})