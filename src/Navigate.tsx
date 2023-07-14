import * as React from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login'
import Dashboard from './Routes/Common/Dashboard'
import Menu from './Routes/Common/Menu'
import Registration from './Registration';
import Notifications from './Routes/Common/Notifications';
import { connect,Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MyNotes from './Routes/Common/MyNotes';
import ViewListing from './Routes/Common/ViewListing'
import AddListing from './Routes/Wholesaler/AddListing'
import MyBids from './Routes/Customer/MyBids'
import VinScan from './Routes/Common/VinScanner/VinScanViewer';
import Home from './Routes/Admin/Home'
import VinScanner from './Routes/Common/VinScanner/VinScanner'
import QRScanner from './Routes/Common/VinScanner/QRScanner'
import Profile from './Routes/Common/Profile';
import Users from './Routes/Admin/Users';
import {View, Image, Text, Pressable} from 'react-native'
import { TabBar } from 'react-native-ios-kit';
import ListingManagement from './Routes/Admin/ListingManagement';
import MainSettings from './Routes/Common/Settings/MainSettings';
import logo from '../assets/icon.png';
const test = false,
Stack = createNativeStackNavigator(),
  mapStateToProps = (state: any) => ({
  auth: state.auth,
}),
mapActionCreators = {};


export class Navigate extends React.Component {
  NavigationContainerRef: Object
  
  constructor(props: any) {
    super(props)
    this.NavigationContainerRef = React.createRef()
    this.state = {
      currentRoute: null,
    }
  }

  updateNavigation() {
    // console.log("Navigational Props")
    // console.log(this.props)
    this.setState({
      currentRoute: this.NavigationContainerRef.current.getCurrentRoute().name,
    });
  }

  componentDidMount() {
    // console.log("NAVIGATOR PROPS")
    // console.log(this.props)
  }

  render(): React.ReactNode {
    const { auth } = this.props
    const i = 0
    return (<>
      <View>
        <Image source={logo} style={{resizeMode: 'stretch', height: 30, width: 30, marginTop: 10, marginLeft: 10}}/>
      </View>
        <NavigationContainer ref={this.NavigationContainerRef}>
          <Stack.Navigator
            initialRouteName="login">
              {auth && auth.loginData && (
                <>
                  <Stack.Screen
                    name='dashboard'
                    component={Dashboard}
                    options={{ title: 'Home Screen', headerShown: false }}/>
                  <Stack.Screen
                    name='Notifications'
                    component={Notifications}
                    options={{title: 'Notifications', headerShown: true,
                      headerStyle: {backgroundColor: '#000'},
                      headerTintColor: '#fff'
                    }}
                  />
                  <Stack.Screen
                    name="settings"
                    component={MainSettings}
                    options={{ title: 'Settings',headerTintColor:'#f7601b', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
                  />
                  <Stack.Screen
                    name="profile"
                    component={Profile}
                    options={{ title: 'View Profile',headerTintColor:'#f7601b', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
                  />
                  <Stack.Screen
                    name="listingmanagement"
                    component={ListingManagement}
                    options={{ title: 'Listing management',headerTintColor:'#f7601b', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
                  />
                  <Stack.Screen
                    name='vinscanner'
                    component={VinScanner}
                    options={{title:'VIN Query',headerTintColor:'#f7601b', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                    name='qrscanner'
                    component={QRScanner}
                    options={{title:'QR Scanner',headerTintColor:'#f7601b', headerLeft:()=><></>, headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                  name="mynotes"
                  component={MyNotes}
                  options={{title:'My Notes', headerShown:true, headerLeft:()=><></>, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                  name="addlisting"
                  component={AddListing}
                  options={{ title: 'Home Screen', headerShown: false }}
                  />
                  <Stack.Screen
                    name="menu"
                    component={Menu}
                    options={{ title: 'Menu', headerShown: true, headerLeft:()=><></>,headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
                  />
                  <Stack.Screen
                  name="myBids"
                  component={MyBids}
                  options={{title:'Bids', headerShown:true, headerLeft:()=><></>, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                    name="usermanagement"
                    component={Users}
                    options={{title:'User management',headerTintColor:'#f7601b', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                  name="vinscan"
                  component={VinScan}
                  options={{title:'VIN Scanner',headerTintColor:'#f7601b', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
                  />
                  <Stack.Screen
                    name="viewListing"
                    component={ViewListing}
                    options={{ title: 'View Listing',headerTintColor:'#f7601b', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
                  />
                  <Stack.Screen
                    name='home'
                    component={Home}
                    options={{title: 'Home', headerShown: false}}
                  />
                </>
              )}
              {auth && !auth.loginData && (
                <>
                <Stack.Screen 
                  name='login' 
                  component={Login} 
                  options={{ title: 'login Screen', headerShown: false }}/>
                </>
              )}
              <Stack.Screen
                name='createUser'
                component={Registration}
                options={{title: 'Register', headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      {((this.props.auth && this.props.auth.accessToken) || (test)) &&(
        <TabBar theme={{barColor: '#000', dividerColor: '#f7601b', primaryLightColor: '#ddd', disabledColor: '#000'}} tabs={[
          {
            icon: 'ios-home-outline',
            title: 'Dashboard',
            onPress: () => {
              this.NavigationContainerRef.current.navigate('dashboard');
              this.updateNavigation();
            },
            isActive: this.state.currentRoute == 'dashboard',
          },
          {
          icon: 'ios-list',
            title: 'My Bids',
            onPress: () => {
              this.NavigationContainerRef.current.navigate('myBids');
              this.updateNavigation();
            },
            isActive: this.state.currentRoute == 'myBids',
          },
          {
            icon: 'ios-add-circle-outline',
            title: 'Add',
            onPress: ()=>{
              this.NavigationContainerRef.current.navigate('addlisting');
              this.updateNavigation();
            },
            isActive: this.state.currentRoute == 'addlisting',
          },
          {
            icon: 'book-outline',
            title: 'My Notes',
            onPress: ()=>{
              this.NavigationContainerRef.current.navigate('mynotes');
              this.updateNavigation();
            },
            isActive: this.state.currentRoute == 'mynotes',
          },
          {
            icon: 'ios-menu',
            title: 'Menu',
            onPress: ()=>{
              this.NavigationContainerRef.current.navigate('menu');
              this.updateNavigation();
            },
            isActive: this.state.currentRoute == 'menu',
          },
        ]}/>
      )}
    </>)
  }
}


export default connect(mapStateToProps, mapActionCreators)(Navigate);