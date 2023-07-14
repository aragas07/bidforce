import React, { Component } from 'react';
import {FloatingAction} from 'react-native-floating-action'
import {View, Text, ScrollView, TextInput, Image, ImageBackground, RefreshControl} from 'react-native';
import {logout} from '../../stores/modules/auth';
import {connect} from 'react-redux';
import {Avatar,CheckBox} from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import {profileStyles, MAIN_COLOR} from './ProfileStyles';
import { HomeStyles } from '../../Routes/Common/HomeStyles';
import { getListings } from '../../stores/modules/admin';
import ItemList from '../Common/ItemList/ItemList';
import {Card} from 'react-native-paper'

const actions = [
  {
    text: "Create User",
    // icon: require("./images/ic_accessibility_white.png"),
    name: "createUser",
    position: 2
  },
];
export class ListingManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isPending:false,
      isPublic:false,
      isEnded: false,
      input:null,
      isfetching:false,
    };
  }

  componentDidMount() {
    // this.setState({data:sampleData})
    this.props.getListings()
  }

  componentDidUpdate(prevProps){
    if(prevProps!=this.props){
      let {admin} = this.props
      if(admin.getListingsSuccess && admin.getListingsData){
        console.log("get datas")
        console.log(admin.getListingsData)
          this.setState({data:admin.getListingsData.data, isfetching:false})
      }
      if(admin.getListingsError){

      }
    }
  }

  getData(){
    this.setState({isfetching:true})
    this.props.getListings()
  }

  floatingAction(action){
    if(action=="createUser"){
      this.props.navigation.navigate('createUser')
    }
  }

  onChangeCheckBoxes(type, value){
    this.setState({"":""})
  }

  render(){
    return(<ScrollView style={{borderTopColor: '#f7601b', borderTopWidth: 3, marginBottom: 60}}>
        <View>
            <CheckBox title='Pending' checked={this.state.isPending} onPress={(v)=>{this.onChangeCheckBoxes("isPending",v.target.checked)}}/>
            <CheckBox title='Public' checked={this.state.isPublic} onPress={(v)=>{this.setState({isPublic:v.target.checked})}}/>
            <CheckBox title='Has Ended' checked={this.state.isEnded} onPress={(v)=>{this.setState({isPublic:v.target.checked})}}/>
        </View>
        <Card style={{margin:7}}>
            <Card.Content>
              <TextInput style={{padding:10,borderColor: '#aaa',borderWidth: 1, borderRadius: 7}} placeholder='Search'/>
            </Card.Content>
        </Card>
        <View style={{display: 'flex', backgroundColor: '#000'}}>
          
          <ItemList itemList={this.state.data} navigation={this.props.navigation}/>
            {/* {(Platform.OS == 'ios') &&(<>
                <RefreshControl refreshing={this.state.isfetching} onRefresh={()=> this.getData()} ></RefreshControl>
                <ItemList itemList={this.state.data} navigation={this.props.navigation}/>
            </>)}
            {(Platform.OS != 'ios') &&(<RefreshControl refreshing={this.state.isfetching} onRefresh={()=> this.getData()} >
                <ItemList itemList={this.state.data} navigation={this.props.navigation}/>
            </RefreshControl>)} */}
        </View>
    </ScrollView>)
  }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    admin: state.admin,
  });
  
  const mapActionCreators = {
    logout,
    getListings,
  };
  
  export default connect(mapStateToProps, mapActionCreators)(ListingManagement);
  
  ListingManagement.propTypes = {};