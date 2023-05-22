import React, { Component } from 'react';
import { View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import { logout } from '../../../stores/modules/auth';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { profileStyles, MAIN_COLOR } from '../ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-paper'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
export class MainSettings extends React.Component {
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

  //   uploadProfilePic(data) {}

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (<ScrollView style={{borderTopColor: '#f7601b', borderTopWidth: 3}}>
      <Card style={[profileStyles.listOptions,{margin: 7}]}>
        <Card.Content style={{flexDirection: 'row'}}>
          <Icon name='list' style={profileStyles.icon} />
          <View>
            <Text style={profileStyles.listItem}>Account Linking</Text>
            <Text style={profileStyles.listItemSubtitle}>
              Link your profile to a Google Account
              (inop)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>);
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

export default connect(mapStateToProps, mapActionCreators)(MainSettings);

MainSettings.propTypes = {};

// export default MainSettings;
