import React, {Component} from 'react';
import {View, Text, TextInput, ScrollView, Image, Pressable, ImageBackground, RefreshControl} from 'react-native';
import {logout} from '../../stores/modules/auth';
import {FloatingAction} from 'react-native-floating-action'
import {connect} from 'react-redux';
import {Avatar,CheckBox} from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import {profileStyles, MAIN_COLOR} from './ProfileStyles';
import { HomeStyles } from '../../Routes/Common/HomeStyles';
import { getUsers } from '../../stores/modules/admin';
import {Card} from 'react-native-paper'
import { verticalStackLayout } from 'react-native-reanimated-carousel/lib/typescript/layouts/stack';
const actions = [
  {
    text: "Create User",
    icon: require("../../assets/avatar.png"),
    name: "createUser",
    position: 0
  },
];

class Users extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isUser:false,
      isWholesaler:false,
      isAdmin:false,
      input:null,
      isfetching:false,
    };
  }

  componentDidMount() {
    this.props.getUsers()
  }
  componentDidUpdate(prevProps){
    if(prevProps!=this.props){
      let {admin} = this.props
      if(admin.getUsersSuccess && admin.getUsersData){
        console.log("HA")
        console.log(admin.getUsersData)
          this.setState({data:admin.getUsersData, isfetching:false})
      }
      if(admin.getUsersError){

      }
    }
  }

  getData(){
    this.setState({isfetching:true})
    this.props.getUsers()
  }

  floatingAction(action){
    if(action=="createUser"){
      this.props.navigation.navigate('createUser')
    }
  }

  render(): React.ReactNode {
      return(<><ScrollView style={[HomeStyles.ScrollViewLimit,{height: '100%', borderTopColor: '#f7601b', borderTopWidth: 3}]}>
        {Platform.OS == 'ios' &&(<>
          <RefreshControl refreshing={this.state.isfetching} onRefresh={()=> this.getData()}></RefreshControl>
          <View>
            <CheckBox title='User' onPress={(v)=>{console.log("this is my example checkbox "+v); this.setState({isUser:v.target.checked})}} checked={this.state.isUser}/>
            <CheckBox title='Wholesaler' onPress={(v)=>{this.setState({isWholeSaler:v.target.checked})}} checked={this.state.isWholeSaler}/>
            <CheckBox title='Admin' onPress={(v)=>{this.setState({isAdmin:v.target.checked})}} checked={this.state.isAdmin}/>
          </View>
          <Card style={{margin: 7}}>
            <Card.Content>
              <TextInput style={{padding:10,borderColor: '#aaa',borderWidth: 1, borderRadius: 7}} placeholder='Search'/>
            </Card.Content>
            <Card.Content>
              {this.state.data && this.state.data.length >0 && this.state.data.map((data, index) => {
                return (<Pressable style={{paddingHorizontal: 19,paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}} onPress={()=>{this.props.navigation.navigate("profile",data)}}>
                  <Text>{data.firstname} {data.lastname}</Text>
                </Pressable>)
              })}
            </Card.Content>
          </Card>
        </>)}
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
        distanceToEdge={{horizontal: 10,vertical: 70}}
      />
      </>)
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  admin: state.admin,
});

const mapActionCreators = {
  logout,
  getUsers,
};

export default connect(mapStateToProps, mapActionCreators)(Users);

Users.propTypes = {};
