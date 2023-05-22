import React, { Component } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, StyleSheet, Pressable } from 'react-native';
import {logout} from '../../stores/modules/auth'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import {Card} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import { profileStyles, MAIN_COLOR } from './ProfileStyles';
import { HomeStyles } from './HomeStyles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const API_URL = 'http://165.22.48.133:3333';

export class MenuScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            isLoggingIn: false,
            loginError: false,
            loginErrorDetails: '',
            connectionError: false,
            errorDialog: false,
            errorMessage: null,
            first_name: 'Mike',
            middle_name: 'Burn',
            last_name: 'Fire',
        };
    }

    componentDidMount() {
        let { loginData } = this.props.auth
        // console.log("Mounted")
        // console.log(this.props)
        this.setState({
            first_name:loginData.firstname,
            middle_name: loginData.middlename,
            last_name:loginData.lastname
        })
    }
    
    componentDidUpdate(props) {
        let { auth } = props;
    
        console.log("PROP UPDATE_MENU")
        console.log(props)
    
        if (auth.logoutSuccess) {
            this.props.navigation.replace('login');
        }
    }
    
    componentWillReceiveProps(props) {
        let { auth } = props;
    
        console.log("ASD?")
    
        if (auth.logoutSuccess) {
            this.props.navigation.replace('login');
        }
    }

    render(): React.ReactNode {
        return(<View style={{borderTopColor: '#f7601b', borderTopWidth: 3}}>
            <View style={{flexDirection: 'row', margin: 17}}>
                <Avatar 
                    avatarStyle={{borderRadius: 90, borderWidth: 3, borderColor: '#333'}}
                    onPress={()=>{
                        Toast.show({text1:"Avatar Picture currently not implemented", text2:"Probably on the next update", type:"error"})
                    }}
                    rounded
                    size='xlarge'
                    source={{
                        uri:
                          this.props.auth.loginData &&
                            this.props.auth.loginData.profile &&
                            this.props.auth.loginData.profile.picture
                            ? `${API_HOST}/${this.props.auth.loginData.profile.picture.path}`
                            : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504=',
                    }}
                />
                <View>
                  <View
                    style={{
                      marginTop: 30,
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 27,
                        maxWidth: 170,
                        fontWeight: 'bold',
                        color: '#444'
                      }}>
                    {this.state.last_name}
                    </Text>
                    <Text style={{ fontSize: 20, color: '#777' }}>
                      {this.state.first_name} {this.state.middle_name}
                    </Text>
                  </View>
                  {this.props.auth.loginData &&
                    this.props.auth.loginData.profile &&
                    this.props.auth.loginData.profile.is_company && (
                      <Text
                        style={{
                          fontSize: 16,
                          fontStyle: 'italic',
                          color: '#777',
                          marginLeft: 20,
                        }}>
                        {this.props.auth.loginData &&
                          this.props.auth.loginData.company.name}
                      </Text>
                    )}
                </View>
            </View>
            <Card style={{margin: 10}}>
                <Card.Content>
                    <Pressable onPress={()=>this.props.navigation.navigate('profile')} style={[HomeStyles.row,{marginBottom: 10}]}>
                        <Icon name="id-card" style={profileStyles.icon}/>
                        <View>
                            <Text style={profileStyles.listItem}>Profile</Text>
                            <Text style={profileStyles.listItemSubtitle}>
                                Tap to view or set your profile
                            </Text>
                        </View>
                    </Pressable>
                    {this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == 'ADMIN' &&(
                        <>
                            <Pressable onPress={()=>this.props.navigation.navigate('usermanagement')} style={[HomeStyles.row,{marginBottom:10}]}>
                                <Icon name='user' style={profileStyles.icon}/>
                                <View>
                                    <Text style={profileStyles.listItem}>User Management</Text>
                                    <Text style={profileStyles.listItemSubtitle}>
                                        Tap to create, edit, view or update Users.
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={()=>this.props.navigation.navigate('listingmanagement')} style={[HomeStyles.row,{marginBottom:10}]}>
                                <Icon name="clipboard" style={profileStyles.icon}/>
                                <View>
                                    <Text style={profileStyles.listItem}>Listing management</Text>
                                    <Text style={profileStyles.listItemSubtitle}>
                                        Tap to manage listings
                                    </Text>
                                </View>
                            </Pressable>
                        </>
                    )}
                    <Pressable onPress={()=>{console.log("example vin scanner");this.props.navigation.navigate('vinscanner')}} style={[HomeStyles.row,{marginBottom:10}]}>
                        <Icon name='qrcode' style={profileStyles.icon}/>
                        <View>
                            <Text style={profileStyles.listItem}>Vin Scanner</Text>
                            <Text style={profileStyles.listItemSubtitle}>Tap to use the VIN Scanner</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>this.props.navigation.navigate('settings')} style={[HomeStyles.row,{marginBottom:10}]}>
                        <Icon name='gear' style={profileStyles.icon}/>
                        <View>
                            <Text style={profileStyles.listItem}>Settings</Text>
                            <Text style={profileStyles.listItemSubtitle}>Tap to view settings</Text>
                        </View>
                    </Pressable>
                    <Pressable style={HomeStyles.row} onPress={()=>this.props.logout()}>
                        <Icon name="search" style={profileStyles.icon}/>
                        <View>
                            <Text style={profileStyles.listItem}>Logout</Text>
                            <Text style={profileStyles.listItemSubtitle}>
                                Tap to end your current session
                            </Text>
                        </View>
                    </Pressable>
                </Card.Content>
            </Card>
        </View>)
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    // user: state.user,
});
  
const mapActionCreators = {
    logout,
    //   updateProfilePic,
    // login,
};
  
export default connect(mapStateToProps, mapActionCreators)(MenuScreen);
  
MenuScreen.propTypes = {};