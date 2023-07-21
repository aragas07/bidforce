import React from 'react'
import { StyleSheet, Text, View, Pressable, SafeAreaView, Image, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements';
import { connect } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {logout} from '../../stores/modules/auth'

export class Home extends React.Component{
    
  componentDidMount() {
    let { loginData } = this.props.auth
    // console.log("Mounted")
    // console.log(this.props)
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

  logout(){
    this.props.logout()
  }
  render(){
    return(<View style={styles.view}>
        <Pressable style={styles.button} onPress={()=>this.logout()}>
            <Text>Logout</Text>
        </Pressable>
    </View>)
  }
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        backgroundColor: 'skyblue'
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth,
    // user: state.user,
  });
  
  const mapActionCreators = {
    logout,
    //   updateProfilePic,
    // login,
  };
  
  export default connect(mapStateToProps, mapActionCreators)(Home);
  
  Home.propTypes = {};
  