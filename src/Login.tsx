import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Keyboard, Image, StyleSheet, Text, View, TextInput, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginlogo from '../assets/bidforce.png';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { login } from './stores/modules/auth';

export class Login extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      isLoginPressed: false,
      email: null,
      password: null,
      loggingIn: false
    }
  }
  
  componentDidMount(){
    // console.log(API_URL)
    console.log(this.props)
  }

  componentDidUpdate(props, props2){
    let { auth } = this.props
    if(props!=this.props){
      if(auth.loginSuccess){
        this.setState({loggingIn:false, error:null})
        Toast.show({text1:"Welcome back"})
        // this.props.navigation.replace("dashboard")
      }
      if(auth.loginError){
        this.setState({loggingIn:false, error: auth.loginError})
      }
    }
  }

  login(){
    this.props.login({email:this.state.email, password:this.state.password})
    this.setState({loggingIn:false})
  }
  render(): React.ReactNode {
      return(<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image source={loginlogo} style={styles.logoimg}/>
          <View style={styles.form}>
            <View style={styles.formContainer}>
              <View style={styles.alignCenter}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.legend}>Sign in to continue.</Text>
              </View>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputSection}>
                <Icon name="user" size={20} color="#000"/>
                <TextInput onChangeText={(v)=> this.setState({email:v})} style={styles.input}/>
              </View>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputSection}>
                <Icon name="lock" size={20} color="#000"/>
                <TextInput onChangeText={(v)=> this.setState({password:v})} value={this.state.password} style={styles.input} secureTextEntry={true}/>
                <Text>{this.state.error }</Text>
              </View>
              <View style={styles.alignCenter}>
                <Pressable style={styles.button} onPress={()=>this.login()}>
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Text style={styles.legend}>Don't have an account? <Text onPress={()=>this.props.navigation.navigate('createUser')} style={styles.bluetext}>Create a new account</Text></Text>
              </View>
            </View>
          </View>
          
          <Modal transparent popup visible={this.state.loggingIn}>
            <View style={styles.modalForm}>
              <Text><ActivityIndicator/>       Logging in...</Text>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>)
  }
}


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalForm:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bluetext:{
    color: '#05d5fa'
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
    paddingRight: 15,
    borderRadius: 30
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      color: '#424242',
  },
  label: {
    color: '#eee'
  },
  alignCenter:{
    alignItems: 'center'
  },
  icon: {
    color: '#111',
    fontSize: 20,
    paddingRight: 10
  },
  legend: {
    color: '#eee',
    fontWeight: 700,
    marginBottom: 15,
  },
  title:{
    color: '#f7601b',
    fontWeight: 700,
    fontSize: 30,
  },
  formContainer:{
    marginTop: 15,
    width: '85%',
    height: 370
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 15,
    color: 'white'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#f7601b',
    width: '40%',
    marginBottom: 10
  },
  logoimg: {
    aspectRatio: 0.7,
    resizeMode: 'contain',
    height: 500,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  form: {
    backgroundColor: 'black',
    minHeight: '50%',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});


const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapActionCteators = {
  login
}

export default connect(mapStateToProps, mapActionCteators)(Login)
