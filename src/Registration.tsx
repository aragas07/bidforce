import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  List,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert,ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {register} from './stores/modules/auth'
import Modal from "react-native-modal";
import loginlogo from '../assets/bidforce.png';


export class Registration extends React.Component{
    
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: '',
            oldpass: '',
            firstname: '',
            middlename: '',
            lastname: '',
            phone: '',
            address: '',
            loggingIn: false,
            usertype: '',
            fnameR: false,
            mnameR: false,
            lnameR: false,
            usertypeR: false,
            emailR: false,
            passwordR: false,
            repassR: false,
            isRegister: false,
            isLiked:[
                { id: 1, value: 'WHOLESALER', name: "Whole saler", selected: false },
                { id: 2, value: 'CUSTOMER', name: "Customer", selected: false }]
        }
    }

    componentDidMount(): void {
    }

    componentDidUpdate(prevProps){
        console.log(":: probs ::")
        console.log(this.props)
        console.log(":: problem ::")
        console.log(prevProps)
        if(prevProps != this.props){
            let {auth} = this.props
            if(!auth.registerSuccess){
                this.setState({isRegister: false})
                Alert.alert('Register Success!',
                "You are successfully registered",
                [{text: "OK", onPress:()=>this.navigateToLogin()}], ()=>this.navigateToLogin())
            }else{

            }
        }
    }

    navigateToLogin(){
        this.props.navigation.navigate('login')
    }

    onRadioBtnClick = (item)=>{
        let updatedState = this.state.isLiked.map((isLikedItem) =>
            isLikedItem.id === item.id
            ? { ...isLikedItem, selected: true }
            : { ...isLikedItem, selected: false }
        );
        this.setState({isLiked: updatedState, usertype: item.value, usertypeR: false})
    }

    register(){
        console.log("register")
        let {email, password, oldpass, firstname, middlename, lastname, phone, address, usertype} = this.state
        var data = {email, password, firstname, middlename, lastname, phone, address, usertype}
        var bool = true
        if(email == ''){
            bool = false
            this.setState({emailR: true})
        }
        if(password == ''){
            bool = false
            this.setState({passwordR: true})
        }
        if(password != oldpass){
            bool = false
            this.setState({repassR: true})
        }
        if(firstname == ''){
            bool = false
            this.setState({fnameR: true})
        }
        if(middlename == ''){
            bool = false
            this.setState({mnameR: true})
        }
        if(lastname == ''){
            bool = false
            this.setState({lnameR: true})
        }
        if(usertype == ''){
            bool = false
            this.setState({usertypeR: true})
        }

        if(bool){
            this.setState({isRegister: true})
            this.props.register(data)
        }
    }

    render(): React.ReactNode {
        return (<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.scrollView}>
                <Image source={loginlogo} style={styles.logoimg}/>
                <View style={styles.form}>
                    <View style={styles.formContainer}>
                        <View style={styles.alignCenter}>
                            <Text style={styles.title}>Register</Text>
                        </View>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({email:v, emailR: false})} style={styles.input}/>
                            {this.state.emailR &&(<Text style={styles.required}>Please fill this field</Text>)}
                        </View>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({password:v, passwordR: false})} style={styles.input} secureTextEntry={true}/>
                            {this.state.passwordR &&(<Text style={styles.required}>Please fill this field</Text>)}
                        </View>
                        <Text style={styles.label}>Repeat your password</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> {this.setState({oldpass:v}); if(this.state.password == v) this.setState({repassR: false})}} style={styles.input} secureTextEntry={true}/>
                            {this.state.repassR &&(<Text style={styles.required}>Password is not correct.</Text>)}
                        </View>
                        <Text style={styles.label}>First name</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({firstname:v, fnameR: false})} style={styles.input}/>
                            {this.state.fnameR &&(<Text style={styles.required}>Please fill this field</Text>)}
                        </View>
                        <Text style={styles.label}>Middle name</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({middlename:v, mnameR: false})} style={styles.input}/>
                            {this.state.mnameR &&(<Text style={styles.required}>Please fill this field</Text>)}
                        </View>
                        <Text style={styles.label}>Last name</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({lastname:v, lnameR: false})} style={styles.input}/>
                            {this.state.lnameR &&(<Text style={styles.required}>Please fill this field</Text>)}
                        </View>
                        <Text style={styles.label}>Phone number</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({phone:v})} style={styles.input}/>
                        </View>
                        <Text style={styles.label}>Address</Text>
                        <View style={styles.inputSection}>
                            <TextInput onChangeText={(v)=> this.setState({address:v})} style={styles.input}/>
                        </View>
                        <View style={styles.row}>
                            {this.state.isLiked.map((item) => (
                                <View style={styles.radioButtonContainer}>
                                <TouchableOpacity onPress={(v) => this.onRadioBtnClick(item)} style={styles.radioButton}>
                                    {item.selected ? <View style={styles.radioButtonIcon} /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={(v) => this.onRadioBtnClick(item)}>
                                    <Text style={styles.radioButtonText}>{item.name}</Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                            {this.state.usertypeR &&(<Text style={styles.required}>Please select user type</Text>)}

                        <Pressable onPress={()=>{this.register()}} style={styles.button}><Text style={styles.submitText}>Register</Text></Pressable>
                        <Text style={styles.legend}>Back to
                            <Text onPress={()=>this.props.navigation.navigate('login')} style={styles.bluetext}> Login</Text>
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 400}}></View>
                  <Modal transparent popup visible={this.state.isRegister} closable={false}>
                    <View style={styles.modalForm}>
                      <Text><ActivityIndicator/> Loading ...</Text>
                    </View>
                  </Modal>
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>)
        }
}
const styles = StyleSheet.create({
    logoimg: {
        width: 300,
        height: 100,
        alignSelf: 'center',
    },
    scrollView:{
        width: '100%'
    },
    button:{
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#f7601b',
        width: '40%',
        marginBottom: 10,
        alignSelf: 'center'
    },
    submitText:{
        fontWeight: 700,
        fontSize: 15,
        color: 'white'
    },
    alignCenter:{
        alignItems: 'center'
    },
    required:{
        alignSelf: 'flex-end',
        color: 'red',
        marginBottom: 9
    },
    row:{
        flexDirection: 'row',
        marginBottom: 10
    },
    title:{
        color: '#f7601b',
        fontWeight: 700,
        fontSize: 30,
    },
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "#98CFB6"
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16,
        color: '#eee'
    },
    label: {
        color: '#eee'
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
    legend: {
        color: '#eee',
        fontWeight: 700,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    bluetext:{
        color: '#05d5fa'
    },
    formContainer:{
        marginTop: 15,
        width: '85%',
        height: 370,
    },
    form: {
        backgroundColor: 'black',
        minHeight: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    text: {
        fontSize: 37
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapActionCteators = {
    register
}

export default connect(mapStateToProps, mapActionCteators)(Registration)
