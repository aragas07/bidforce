import {Card} from 'react-native-paper'
import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Pressable,
    View,
    SafeAreaView,
    Text,
    Alert,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    RefreshControl
} from 'react-native';
import Modal from "react-native-modal";
import { StretchyScrollView } from 'react-native-stretchy';
// import LinearGradient from 'react-native-linear-gradient';
import { ImageGallery, ImageObject } from '@georstat/react-native-image-gallery';
import { getListing } from '../../stores/modules/listing';
import { connect } from 'react-redux';
import { getBids,actionListing } from '../../stores/modules/admin';
import { HomeStyles } from './HomeStyles';
import { bid,statecleanup_bid } from '../../stores/modules/listing';
import Carousel, {Pagination} from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './ItemList/CarouselCardItem'
// import {API_URL} from '@env';
const API_URL = 'http://165.22.48.133:3333';

const sampleItem = {
  name: "Test Item 2",
  description: "Item test aaa",
  address: "item address",
  make_of_vehicle: "Mitsuboshi",
  year_of_vehicle: "2009",
  model: "L123",
  trim: "AB",
  mileage: "1000",
  disclaimers: "wtf",
  user_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
  lastBid: 1000,
  attachments: [
      {
          filename: "test.jpg",
          path: "public/test",
          type: "listing",
          uploaded_by: 1,
          message_id: null,
          listing_id: 1,
          created_at: new Date(),
          updated_at: new Date()
  },
  ]
}

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/2347011/pexels-photo-2347011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/1624360/pexels-photo-1624360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
]
export class ViewListing extends React.Component{
    carousel: null | Carousel
    constructor(props:any){
        super(props)
        this.state = {
            selectedIndex: 0,
            loaded:false,
            refreshing: false,
            data: [],
            bidDialogue:false,
            bidValue: 0,
            lastBidValue: 0,
            isBidding:false,
            viewGallery:false,
            images:[],
            fetchingBids:false,
            bidData:null,
        }
    }
            

    componentDidMount(){
        console.log('navigation props')
        console.log(this.props.navigation)
        if(this.props.route.params && this.props.route.params.data){
          this.props.getListing(this.props.route.params.data.id)

          if(this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "ADMIN"){
            this.setState({fetchingBids:true})
            this.props.getBids(this.props.route.params.data.id)
          }
        }
    }

    componentDidUpdate(prevProps){
      if(this.props!=prevProps){
        let {listing, admin} = this.props

        if(listing.bidError){
          this.setState({isBidding:false, bidValue:0,})
          Modal.alert("Error", listing.bidError, [{text:"OK"}])
          this.props.statecleanup_bid()
        }

        if(listing.getItemSuccess && listing.getItemData){
          this.setState( state=> {
            let {data} = state
            let images = listing.getItemData.attachments
            let images2 = []
            if(images && images.length > 0){ images.map(entry => {
              entry.url = `${API_URL}/${entry.uri_path}`
              images2.push(entry)
            })}
            
            data.attachments = undefined;
            state.data = listing.getItemData
            state.images = images2
            state.loaded = true
            state.refreshing = false;
            
            return state
          })
        }
        if(admin.getBidsData){
          console.log(admin.getBidsData)
          this.setState({bidData: admin.getBidsData, fetchingBids:false})
        }
        if(admin.timeProp!=prevProps.admin.timeProp && admin.actionListingSuccess){
          this.props.getListing(this.props.route.params.data.id)
        }
        if(listing.bidSuccess && listing.bidData && listing.bidData.value == this.state.bidValue){
          this.setState({isBidding:false, bidValue:0,})
          Modal.alert("Success", "Bid Success.")
        }
      }
    }

    componentWillUnmount(){
      this.props.statecleanup_bid()
    }

    afterchangeCallback(index){
        selectedInd = index;
    }

    renderItemdata(data){
        return (
            <></>
        )
    }

    actionListingLocal(action){
      let data = {
        id: this.state.data.id,
        action: action
      }

      this.props.actionListing(data)
    }

    bid(){
      console.log("Bid")
      this.setState({isBidding:true, bidDialogue:false})

      let request = {
        bid_value: this.state.bidValue,
        listing_id:this.state.data.id
      }

      this.props.bid(request)
    }

    renderFooterComponent = (image: ImageObject, currentIndex: number) => {
      console.log(image)
      console.log(currentIndex)
      return <>
        <Text>Footer</Text>
      </>
    }

    render(): React.ReactNode {
      var isWholesaler = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "WHOLESALER")
      var isAdmin = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "ADMIN")
      var isUser = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "USER")
      var listingStatus;

      if(this.state.data.hidden){
        listingStatus = "Hidden";
      }
      if(!this.state.data.hidden){
        listingStatus = "Active";
      }
      if(this.state.data.has_ended){
        listingStatus = "Ended";
      }
      
        return(<View style={{borderTopColor: '#f7601b', borderTopWidth: 3}}><ScrollView>
        <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={this.state.isCarousel}
            data={this.state.images.map(entry=>{return entry})}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={(index) => {this.setState({selectedIndex:index})}}
        />
        <Pagination
            dotsLength={this.state.images.length}
            activeDotIndex={this.state.selectedIndex}
            carouselRef={this.state.isCarousel}
            dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
        />

        {!this.state.loaded && (
            <View style={{height:'100%', marginTop:100,alignContent:'center'}}><ActivityIndicator/><Text style={{textAlign:'center'}}>Loading...</Text></View>
        )}
        {this.state.loaded &&(
            <>
                <Text style={HomeStyles.listingTitle}>{this.state.data.name}</Text>
                <Text style={HomeStyles.listingManuf}>{this.state.data.make_of_vehicle}<Text style={HomeStyles.listingYear}> {this.state.data.model} ({this.state.data.year_of_vehicle})</Text> </Text>
                <Text>{this.state.data.hidden && "This listing is currently hidden."}</Text>
                <Text>{this.state.data.has_ended && "This listing has ended."}</Text>
                <View style={HomeStyles.grid}>
                    <Pressable style={HomeStyles.primary} disabled={this.props.auth.loginData && this.props.auth.loginData.id == this.state.data.user_id} type='primary' onPress={()=> this.setState({bidDialogue:true})}>
                        <Text style={HomeStyles.vlTextwhite}>{this.props.auth.loginData.id == this.state.data.user_id ? "You can't bid here" : "Bid Now"}</Text>
                    </Pressable>
                    <Pressable style={HomeStyles.vlbutton} type='ghost' onPress={()=> this.props.navigation.navigate('vinscan', {data: this.state.data})}>
                      <Text style={HomeStyles.vlText}>Query VIN</Text>
                    </Pressable>
                </View>
              {!isWholesaler && (
                <>
                  <Text>Address:</Text>
                  <Text>{this.state.data.address}</Text>
                </>
              )}
              
              <Text>Description:</Text>
              <Text>{this.state.data.description}</Text>

              <Text>Milage:</Text>
              <Text>{this.state.data.mileage}</Text>

              <Text>Trim:</Text>
              <Text>{this.state.data.trim}</Text>

              <Text>Disclaimers:</Text>
              <Text>{this.state.data.disclaimers}</Text>
              <View><Pressable style={HomeStyles.addNote}><Text style={HomeStyles.addNoteText}>Add Notes</Text></Pressable></View>
            </>
        )}

        {!isAdmin &&(
          <View style={{marginBottom: 60}}></View>
        )}

        {isAdmin &&(
          <>  
            <Card style={{marginBottom: 60, margin: 10, backgroundColor: 'white'}}>
              <Card.Title title='Admin Corner'/>
              <Card.Content>
                {this.state.fetchingBids && (
                  <View><Text style={{alignSelf:'center'}}><ActivityIndicator/>  Fetching Bids...</Text></View>
                )}
                {this.state.bidData &&  !this.state.fetchingBids && (
                  <View style={{marginLeft:10}}>
                  <Text>Listing Status: {listingStatus}</Text>
                  <Text>Total Bids: {this.state.bidData.length}</Text>
                  <Text>Current Bid Amount: {this.state.bidData.length > 0 ? '$' + this.state.bidData[0].value : "None"}</Text>
                  </View>
                )}
              </Card.Content>
              <Card.Content>
                <Pressable style={HomeStyles.bidControll} onPress={()=>this.props.navigation.navigate("myBids",{listing_id:this.state.data.id})}><Text style={HomeStyles.bidControllText}>View Bids</Text></Pressable>
                {this.state.data.has_ended ? (<Pressable style={HomeStyles.bidControll} onPress={()=>this.actionListingLocal("OPEN")}><Text style={HomeStyles.bidControllText}>Open Listing</Text></Pressable>) 
                : (<Pressable style={HomeStyles.bidControll} onPress={()=>this.actionListingLocal("CLOSE")}><Text style={HomeStyles.bidControllText}>Close Listing</Text></Pressable>)}
                
                {!this.state.data.hidden ? (<Pressable style={HomeStyles.bidControll} onPress={()=>this.actionListingLocal("HIDE")}><Text style={HomeStyles.bidControllText}>Hide Listing</Text></Pressable>) : 
                (<Pressable style={HomeStyles.bidControll} onPress={()=>this.actionListingLocal("SHOW")}><Text style={HomeStyles.bidControllText}>Show Listing</Text></Pressable>)}
              </Card.Content>
            </Card>  
          </>
        )}


          <Modal transparent popup visible={this.state.bidDialogue}>
            <View style={{ flex: 1, backgroundColor: '#fdfdfd', borderRadius: 4, width: '98%', position:'absolute', }}>
              <View style={{ padding: 10}}>
                <Text style={{fontSize: 18}}>How much do you bid?</Text>
                <Text style={{fontSize: 18}}>Minimum: ${this.state.data.lastBid}</Text>
                <TextInput style={{borderBottomColor: '#e0e0e0', fontSize: 19, borderWidth: 1, padding: 4,marginBottom: 10, borderRadius: 3}} keyboardType='numeric' onChangeText={(val)=>this.setState({bidValue:val})}/>
              </View>
              <View style={HomeStyles.gridnopad}>
                <Pressable onPress={()=>this.setState({bidDialogue:false})} style={HomeStyles.modalButton}>
                  <Text style={HomeStyles.modalButtonText}>Cancel</Text>
                </Pressable>
                <Pressable onPress={()=>this.bids()} style={HomeStyles.modalButton}>
                  <Text style={HomeStyles.modalButtonText}>Bid!</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        
    </ScrollView>
    </View>)
    }
}



const mapStateToProps = (state:any) => ({
    // user: state.user,
    listing: state.listing,
    auth: state.auth,
    admin: state.admin,
  });
  
  const mapActionCreators = {
    getListing,
    getBids,
    bid,
    statecleanup_bid,
    actionListing
  };
  
  // export default 
  
  export default connect(mapStateToProps, mapActionCreators)(ViewListing);
  