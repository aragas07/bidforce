import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, RefreshControl, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements';
import { connect } from 'react-redux';
import ItemList from './ItemList/ItemList';
import { getListings } from '../../stores/modules/listing';
import { logout } from '../../stores/modules/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import logo from './../../../assets/bidforce.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Dashboard extends React.Component {


  constructor(props: any) {
    super(props)
    this.state = {
      drawerOpen: false,
      bdages: 0,
      items: [],
      isLoading:false,
    }
  }

  componentDidMount(){

    this.props.getListings();

    Toast.show({text1:'Welcome Back!', text2:'Currently in development. Bugs may appear'})
  }

  componentDidUpdate(prevProps){
    let { listing } = this.props

    if(prevProps!=this.props){
      if(listing.getListingError){
        this.setState({isLoading:false})
      }
      if(listing.getListingData){
        if(listing.getListingData.data)
        this.setState({items:listing.getListingData.data, isLoading:false})
        console.log("::Example dashboard::")
        console.log("sample vin result "+listing.getListingData)
      }
    }
  }


  render() {
    const tabs = [
      {title: 'Listings'},
      {}
    ]
    return (<SafeAreaView>
      <View style={styles.outerview}>
        <View style={styles.intitle}>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: '#ddd', fontSize: 25, marginLeft: 20}}>
            WholeSale
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Icon
            name="bell"
            style={{alignSelf: 'center',color: '#ddd', fontSize: 23}}
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          {this.state.badges != 0 && (
            <Badge
              value={this.state.badges != 0 ? this.state.badges : null}
            />
          )}
          {this.state.badges == 0 && <View style={{marginRight: 18}} />}
          </View>
      </View>
      <View>
        <Text style={styles.heading}>What's New?</Text>
        <ScrollView style={styles.carcontainer}>
          {(Platform.OS == 'ios') &&(
            <>
            <RefreshControl refreshing={this.state.isLoading} onRefresh={()=>{
              this.setState({isLoading:true})
              this.props.getListings()}} style={{color: '#000'}}></RefreshControl>
              <ItemList itemList={this.state.items} navigation={this.props.navigation}/>
            </>
          )}
          {(Platform.OS != 'ios') &&(
            <RefreshControl refreshing={this.state.isLoading} onRefresh={()=>{
              this.setState({isLoading:true})
              this.props.getListings()}} style={{color: '#000'}}>
                <ItemList itemList={this.state.items} navigation={this.props.navigation}/>
              </RefreshControl>
          )}
        </ScrollView>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Image source={logo} style={styles.bottomlogo}/>
        </View>
      </View>
    </SafeAreaView>)
  }
}

var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  safeArea: {
    marginTop: 24,
    paddingTop: 12,
  },
  carcontainer: {
    margin: 15,
    display: 'flex',
    maxHeight: '65%',
    backgroundColor: '#000'
  },
  heading: {
    fontSize:20,
    fontWeight:'bold',
    backgroundColor: '#000',
    padding: 10,
    margin: 15,
    color: '#eee'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intitle:{
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    elevation: 5,
  },
  outerview:{
    backgroundColor: '#000',
    borderWidth: 3,
    borderBottomColor: '#f7601b',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoimg:{
    aspectRatio: 4,
    resizeMode: 'contain',
    marginBottom: -30,
    height: 30,
  },
  bottomlogo: {
    resizeMode: 'stretch',
    width: 330,
    height: 130,
    opacity: 0.5,
    padding: 0,
    margin: 'auto'
  },
  button: {
    borderRadius: 20,
    borderWidth: 3,
    width: 300,
    margin: 10,
    borderColor: '#000',
  },
  styleText: {
    fontSize: 75,
    fontWeight: '400',
    marginLeft: 30,
    marginRight: 30
  },
  spacing: {
    margin: 50,
  },
  roundIcons: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#BBB',
    borderColor: '#BBB',
    color: '000',
    height: 50,
    width: 50,
    borderRadius: 90,
    marginLeft: 10,
    marginRight: 10,
  }
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing
})


const mapActionCteators = {
  getListings
}

export default connect(mapStateToProps, mapActionCteators)(Dashboard)