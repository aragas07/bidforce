
import React from "react"
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler"
import { HomeStyles } from "../Common/HomeStyles";
import {View, Text, RefreshControl, ScrollView} from 'react-native'
import moment from 'moment'
import avatarimg from '../../assets/avatar.png'
import { getBids, } from "../../stores/modules/admin";
import { getMyBids } from "../../stores/modules/auth";
import { connect } from "react-redux";
import {Card} from 'react-native-paper'
export class MyBids extends React.Component{
    constructor(props:any){
        super(props)
        this.state={
            isFetching:false,
            has_fetched:false,
            data: [],
            error: null,
            adminView:false,
        }

    }

    componentDidMount(){
        console.log('mounted')
        console.log(this.props.route)

        this.fetchBids();
        // this.setState({data: testBids})
        // Fetch Notifications
    }

    

    componentDidUpdate(prevProps){
      console.log("PREVPROPS")
      console.log(prevProps)
      console.log(prevProps!=this.props)
      let { admin, auth, route} = this.props
      if(prevProps!=this.props){
        console.log('update?')
        if( route.params &&  route.params.listing_id){
          console.log('admin')
          console.log(admin)
          this.setState({data:admin.getBidsData, isFetching:false})
        }else{
          console.log("else admin")
          this.setState({data:auth.getMyBidsData, isFetching:false})
        }
      }
    }

    viewBid(data){
      console.log('tap')
      console.log("viewBid Data")
      console.log(data)
      // if(this.state.adminView){

      // }else{ 
      //   this.props.navigation.navigate("viewListing")
      // }
        
    }

    fetchBids(){
      if(this.props.route.params && this.props.route.params.listing_id){
        //this is fetching the bids of the listing id
        this.props.getBids(this.props.route.params.listing_id)

      }else{
        // this is probably us looking at our bids
        this.props.getMyBids();
      }
    }

    renderBidCard(data, index){
        let returnString = ""
        console.log("my bidding list")
        console.log(data)

        if(!this.props.route.params){
          returnString = `$${data.value} - ${data.listing.name} ${data.listing.make_of_vehicle} ${data.listing.model}`
        }else{
          returnString = `${data.user.firstname} ${data.user.lastname} has bid $${data.value} - ${data.listing.name} ${data.listing.make_of_vehicle} ${data.listing.model}`
        }

        return (<TouchableOpacity key={index} style={{margin: 5}} onPress={()=>{}}>
            <Card key={index}>
                <Card.Title 
                style={HomeStyles.notificationBody} 
                title={<View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    textAlign: 'justify',
                    marginRight: 30,
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  {returnString}
                </Text>
                </View>}/>
                <Card.Content>
                    <Text style={{alignSelf: 'flex-end', marginRight: 10}}>
                        {moment(data.created_at).fromNow()}
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>)
    }

    render(){
        return (  <View style={{borderTopColor: '#f7601b', borderTopWidth: 3}}>
            <ScrollView >
                {(Platform.OS == 'ios') &&(
                    <>
                        <RefreshControl 
                        refreshing={this.state.isFetching}
                        onRefresh={() => {
                        this.setState({isFetching: true});
                        this.fetchBids()
                        }}></RefreshControl>
                        <View>
                          {this.state.data.map((entry:Object, index:number) =>
                            this.renderBidCard(entry, index),
                          )}
                          {this.state.data.length == 0 && (
                            <View style={{alignSelf: 'center', alignContent: 'center'}}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  marginTop: '70%',
                                  fontWeight: 'bold',
                                }}>
                                No Bids yet.
                              </Text>
                            </View>
                          )}
                        </View>
                    </>
                )}
                {(Platform.OS != 'ios') &&(
                  <RefreshControl
                  refreshing={this.state.isFetching}
                  onRefresh={() => {
                  this.setState({isFetching: true});
                  this.fetchBids()
                  }}>
                  <View>
                    {this.state.data.map((entry:Object, index:number) =>
                      this.renderBidCard(entry, index),
                    )}
                    {this.state.data.length == 0 && (
                      <View style={{alignSelf: 'center', alignContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: '70%',
                            fontWeight: 'bold',
                          }}>
                          No Bids yet.
                        </Text>
                      </View>
                    )}
                  </View>
                  </RefreshControl>
                )}
            </ScrollView>
          </View>)
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing,
  admin: state.admin,
})


const mapActionCteators = {
  getBids,
  getMyBids
}

export default connect(mapStateToProps, mapActionCteators)(MyBids)