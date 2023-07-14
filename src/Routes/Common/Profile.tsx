import React, {Component} from 'react';
import moment from 'moment';
import {View, Text, ScrollView, Image, RefreshControl, ActivityIndicator, TouchableHighlightBase} from 'react-native';
import {Avatar} from 'react-native-elements';
import {HomeStyles} from './HomeStyles';
import ItemList from './ItemList/ItemList';
import { getUserById,setGetUserNull } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
const dateFormat = 'MM/DD/YYYY';
const userDataDummy = {
    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'
}

export class Profile extends Component{
    constructor(props:any) {
        super(props)
        this.state = {
          mode: null, //Easy service? or typical?
          profile: null,
          profile_pic: null,
          isFetching: false,
        };
      }
    
      componentDidMount() {
        console.log('viewpofile');
        console.log(this.props);
        this.processMode();
        var params = this.props.route ? this.props.route.params : {id:null}
        var query = params && params.id ? params.id : this.props.auth.loginData.id
        this.setState({isFetching:true})
        this.props.getUserById(query)
        
        // this.setState({
        //     profile: userDataDummy
        // })
        // console.log(this.props.route.params.id)
      }
    
      processMode() {
        if (this.props.route.params && this.props.route.params.id) {
          this.setState({isFetching: true});
          if (this.props.route.params.type == 'customer') {
            this.setState({mode: 'customer'});
          }
          if (this.props.route.params.type == 'wholesaler') {
          }
        }
      }
    
    processType(type){
        console.log(type)
        switch(type){
            case "WHOLESALER": return "Wholesaler" 
            case "CUSTOMER": return "Customer" 
            case "ADMIN": return "Administrator" 
            default: return "UNKNOWN"
        }
    }

      
    componentDidUpdate(prevProps){
        console.log("placeholder")
        console.log(this.props == prevProps)
        // if(prevProps!=this.props){
        console.log(this.props)
        // this.setState({isFetching:false})

        let {GetUserData} = this.props.auth;

        if(GetUserData!=this.state.profile && GetUserData.firstname ){
            this.setState({profile:GetUserData, isFetching:false})
        }
        

    // Update notificationData
    }

    componentWillUnmount(){
        this.props.setGetUserNull()
    }

    returnCustomer(){
        return(<View style={{backgroundColor: 'white', borderRadius: 20}}>
            <Text style={{fontStyle: 'italic'}}></Text>
            <Text>Contact No: {this.state.profile.phone_number}</Text>
      
            <Text>Address: {this.state.profile.address}</Text>
            <Text>Company Address: {this.state.profile.company_address}</Text>
      
            <Text>Email: {this.state.profile.email}</Text>
        </View>)
    }

    render(): React.ReactNode {
        return(<ScrollView style={[HomeStyles.viewProfileLimit,{borderTopColor: '#f7601b', borderTopWidth: 3}]}>
            {Platform.OS == 'ios' &&(<>
                <RefreshControl
                    refreshing={this.state.isFetching}
                    onRefresh={() => {
                    this.setState({isFetching: true});
                    var params = this.props.route ? this.props.route.params : {id:null}
                    var query = params.id ? params.id : this.props.auth.loginData.id
                    this.setState({isFetching:true})
                    this.props.getUserById(query)
                }}></RefreshControl>
                    {this.props.auth &&
                      this.props.auth.loginData &&
                      this.props.auth.loginData.applicant &&
                      this.props.auth.loginData.applicant.id ==
                        (this.props.route.params && this.props.route.params.id) && (
                        // <Button type="ghost">
                        <Icon
                          name="edit"
                          style={{alignSelf: 'flex-end'}}
                          onPress={() => this.props.navigation.navigate('editprofile')}
                        />
                        // </Button>
                      )}{this.state.mode == 'wholesaler' &&
                      this.props.auth &&
                      this.props.auth.loginData &&
                      this.props.auth.loginData.id == this.props.route.params.id && (
                        // <Button type="ghost">
                        <Icon
                          name="edit"
                          style={{alignSelf: 'flex-end'}}
                        //   onPress={() =>
                        //     this.props.navigation.navigate('editfreelanceemployer')
                        //   }
                        />
                        // </Button>
                      )}
                      <View style={{alignSelf: 'center', marginTop: 19}}>
                        <Avatar
                          rounded
                          size="xlarge"
                          source={{
                            uri: this.state.profile_pic
                              ? `${API_HOST}/${this.state.profile_pic.path}`
                              : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                          }}
                        />
                      </View>
                      
                    {this.state.isFetching && <ActivityIndicator text="Loading.." />}
                    {this.state.proofile && (<>
                        <Text
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}>
                        {this.state.profile.firstname}{' '}
                        {this.state.profile.middlename}{' '}
                        {this.state.profile.lastname}
                        </Text>
                        <Text
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            fontStyle: 'italic',
                        }}>
                        {this.processType(this.state.profile.user_type)}
                        </Text>

                        {this.returnCustomer()}
                        {(this.state.profile.user_type=="WHOLESALER" || this.state.profile.user_type=="ADMIN")  && (<ItemList itemList={this.state.profile.listings} navigation={this.props.navigation}  />)}
                    </>)}
                {this.state.isFetching && <ActivityIndicator text="Loading.." />}
            </>)}
            {Platform.OS != 'ios' &&(
                <RefreshControl
                    refreshing={this.state.isFetching}
                    onRefresh={() => {
                    this.setState({isFetching: true});
                    var params = this.props.route ? this.props.route.params : {id:null}
                    var query = params.id ? params.id : this.props.auth.loginData.id
                    this.setState({isFetching:true})
                    this.props.getUserById(query)
                }}>
                    {this.props.auth &&
                      this.props.auth.loginData &&
                      this.props.auth.loginData.applicant &&
                      this.props.auth.loginData.applicant.id ==
                        (this.props.route.params && this.props.route.params.id) && (
                        // <Button type="ghost">
                        <Icon
                          name="edit"
                          style={{alignSelf: 'flex-end'}}
                          onPress={() => this.props.navigation.navigate('editprofile')}
                        />
                        // </Button>
                      )}{this.state.mode == 'wholesaler' &&
                      this.props.auth &&
                      this.props.auth.loginData &&
                      this.props.auth.loginData.id == this.props.route.params.id && (
                        // <Button type="ghost">
                        <Icon
                          name="edit"
                          style={{alignSelf: 'flex-end'}}
                        //   onPress={() =>
                        //     this.props.navigation.navigate('editfreelanceemployer')
                        //   }
                        />
                        // </Button>
                      )}
                      <View style={{alignSelf: 'center', marginTop: 19}}>
                        <Avatar
                          rounded
                          size="xlarge"
                          source={{
                            uri: this.state.profile_pic
                              ? `${API_HOST}/${this.state.profile_pic.path}`
                              : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                          }}
                        />
                      </View>
                      
                    {this.state.isFetching && <ActivityIndicator text="Loading.." />}
                    {this.state.proofile && (<>
                        <Text
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}>
                        {this.state.profile.firstname}{' '}
                        {this.state.profile.middlename}{' '}
                        {this.state.profile.lastname}
                        </Text>
                        <Text
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            fontStyle: 'italic',
                        }}>
                        {this.processType(this.state.profile.user_type)}
                        </Text>

                        {this.returnCustomer()}
                        {(this.state.profile.user_type=="WHOLESALER" || this.state.profile.user_type=="ADMIN")  && (<ItemList itemList={this.state.profile.listings} navigation={this.props.navigation}  />)}
                    </>)}
                {       this.state.isFetching && <ActivityIndicator text="Loading.." />}</RefreshControl>)}
        </ScrollView>)
    }
}


const mapStateToProps = (state:any) => ({
    // user: state.user,
    auth: state.auth,
  });
  
  const mapActionCreators = {
    getUserById,
    setGetUserNull
  };
  
  // export default 
  
  export default connect(mapStateToProps, mapActionCreators)(Profile);
  