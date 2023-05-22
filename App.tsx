import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Pressable, Keyboard, Image, StyleSheet, Text, View, TextInput, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Navigate from './src/Navigate'
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './configureStore';
import {Provider as ReduxProvider} from 'react-redux';

class App extends React.Component{
  store: Object
  persistor: Object
  constructor(props:any){
    super(props)
    this.state = {
      theme: null,
      currentTheme: null,
      isReady: false
    }
    const {persistor, store} = configureStore();
    this.persistor = persistor;
    this.store = store;
  }

  render(): React.ReactNode {
      return(<>
        <ReduxProvider store={this.store}>
          <PersistGate loading={null} persistor={this.persistor}>
            <Navigate {...this.props}></Navigate>
          </PersistGate>
        </ReduxProvider>
      </>)
  }
}

export default App