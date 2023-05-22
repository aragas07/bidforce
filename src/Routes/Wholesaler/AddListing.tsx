
import React, { Ref } from "react";
import { StretchyScrollView } from "react-native-stretchy";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import {Card} from 'react-native-paper'
import { Camera, CameraType } from "expo-camera";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import { ImageGallery } from "@georstat/react-native-image-gallery";
import Carousel, {Pagination} from 'react-native-snap-carousel'
import { postListing, statecleanup_listing } from "../../stores/modules/listing";
import { connect } from "react-redux";
import StepIndicator from 'react-native-step-indicator-v2';
import Textarea from 'react-native-textarea';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH )
var permission;
var cameraInstance;
const mediaProperties:ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: .4,
  base64:true,
  allowsMultipleSelection:true,
}
const steps = [
  { title: 'Front Side', name: "images_front", type: "images", },
  { title: 'Driver Side', name: "images_driver", type: "images" },
  { title: 'Passenger Side', name: "images_passenger", type: "images" },
  { title: 'Back Side', name: "images_back", type: "images" },
  { title: 'Vehicle Interior', name: "images_interior", type: "images" },
  { title: 'Miscellaneous', name: "images_misc", type: "images" },
  { title: 'Vehicle Information', name: "vehicle_information", type: "information" },
  { title: 'Summary', name: "summary", type: "summary" },
];

export class CreateListing extends React.Component{
    camera: Ref<Camera>;
    constructor(props: any) {
        super(props);
        this.state = {
        mode: CameraType.back,
        permissionError: null,
        cameraState: null,
        // step: -1,
        step: 0,
        images_front: [],
        selectedIndex: 0,
        images_driver: [],
        images_passenger: [],
        images_back: [],
        images_interior: [],
        images_misc: [],
        viewGallery: false,
        isSubmittingData:false,
        make_of_vehicle:'',
        name:'',
        year_of_vehicle:'',
        trim:'',
        milage:'',
        vin_number:'',
        disclaimers:'',

        };
        this.camera = React.createRef();
    }

    componentDidMount() {
        this.setState({ loaded: true });
        permission = Camera.requestCameraPermissionsAsync();
        // permission = Camera.useCameraPermissions();
        if (!permission) {
        this.setState({ permissionError: "NO PERMIT" });
        }
        // this.setState({cameraState: })
    }
    
    navigateToDashboard(){
        this.props.statecleanup_listing()
        this.props.navigation.navigate('dashboard')
    }

    componentDidUpdate(prevProps) {
        if(prevProps!=this.props){
        let {listing} = this.props

        if(listing.postListingSuccess){
            this.setState({isSubmittingData:false})
            Alert.alert("Post Success!",
            "Your Listing has been successfully uploaded and have yet to be reviewed by the admins. Check your notifications for updates.", 
            [{text:"OK", onPress:()=> this.navigateToDashboard() }], ()=> this.navigateToDashboard)
        }
        }
    }
    capture() {
        console.log(this.camera);
        console.log(cameraInstance);
        var vv = <Camera></Camera>;
        console.log(vv);
        // let v = this.camera.takePictureAsync()
        // console.log(v)
    }

    afterchangeCallback(index) {
        console.log(index);
        // this.setState({ selectedIndex: index })
    }
    
    toggleCameraType() {
        let curr = this.state.mode;
        this.setState({
          mode: curr == CameraType.back ? CameraType.front : CameraType.back,
        });
    }
    
    cameraCallBack(data) {
        console.log(data);
    }
    
    async launchCamera(type?) {
        let result = await ImagePicker.launchCameraAsync(mediaProperties);
    
        console.log(result);
    
        if (!result.cancelled) {
          console.log("Not cancelled?");
          // console.log(result);
          // console.log(type);
    
          if(type!=null){
            if(result.selected){ // If multiple images
              console.log('Group of pictures!')
              this.setState(state => {
                if(state[`${type.name}`].length==0) state[`${type.name}`] = result.selected
                else state[`${type.name}`].push(result.selected)
              })
            }else if(result){ // <- If image is single
              console.log('single image!')
              this.setState(state => {
                console.log("states : "+state)
                if(state[`${type.name}`].length==0) state[`${type.name}`] = [result]
                else state[`${type.name}`].push(result)
              })
            }
    
            this.setState({step:this.state.step})
          }
          // setImage(result.uri);
        }
    }

    async launchImagePicker(type?) {
        let result = await ImagePicker.launchImageLibraryAsync(mediaProperties);
    
        console.log(result);
    
        if (!result.cancelled) {
          console.log("Not cancelled?");
          // console.log(result);
          // console.log(type);
    
          if(type!=null){
            console.log("grouping selected image")
            console.log(result)
            if(result.selected){ // If multiple images
              console.log('Group of pictures!')
              this.setState(state => {
                if( !state[`${type.name}`] || state[`${type.name}`].length==0) state[`${type.name}`] = result.selected
                else state[`${type.name}`].push(result.selected)
              })
            }else if(result.base64){ // <- If image is single
              console.log('single image! '+result.base64)
              this.setState(state => {
                if(state[`${type.name}`].length==0) state[`${type.name}`] = [result]
                else state[`${type.name}`].push(result)
              })
            }
    
            this.setState({step:this.state.step})
          }
          // setImage(result.uri);
        }
    }
    
    submitData() {
        let { name, description, make_of_vehicle, model, year_of_vehicle, trim, mileage, vin_number, disclaimers, accidents } = this.state
        var data = {
        name, description, make_of_vehicle, model, year_of_vehicle, trim, mileage, vin_number, disclaimers, accidents,
        images: []
        }

        steps.map(entry =>{
        if(entry.type == 'images'){
            this.state[`${entry.name}`].map(entry2=>{
            data.images.push({type:entry.name, data:entry2})
            })
        }
        })

        // this.setState({isSubmittingData:true})
        this.props.postListing(data)
    }

    setImagesCallback(arrayname: string) {
        // this.setState({[arrayname]:})
    }
  // launchCamera(null, this.cameraCallBack)

    removeImage(index, state){
        console.log(index)
        console.log(state)
        this.setState(mainState=>{
        var k = mainState[`${state}`]
        k.splice(index, 1)
        mainState[`${state}`] = k
        return mainState
        })
    }

    listingEntryTemplate = (props)=>{
        return(<Card style={{marginHorizontal: 7}}>
          <Card.Content>
            <Text style={{fontSize: 17,fontWeight: 870}}>Listing Information</Text>
          </Card.Content>
          <Card.Content style={{marginTop: 15}}>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Name </Text>
              <TextInput placeholder="Enter name" onChangeText={(v)=>this.setState({name:v})} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Description </Text>
              <Textarea
                style={styles.input}
                onChangeText={(v)=>this.state({description:v})}
                defaultValue={this.state.description}
                maxLength={500}
                placeholder={'Enter Description'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Make</Text>
              <TextInput placeholder="Enter Details" onChangeText={(v)=>{this.setState({make_of_vehicle:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Model</Text>
              <TextInput placeholder="Enter Model" onChangeText={(v)=>{this.setState({model:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Year</Text>
              <TextInput placeholder="Enter Model" onChangeText={(v)=>{this.setState({year_of_vehicle:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Trim</Text>
              <TextInput placeholder="Enter Trim" onChangeText={(v)=>{this.setState({trim:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Mileage</Text>
              <TextInput placeholder="Enter Mileage" onChangeText={(v)=>{this.setState({mileage:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Vin Number</Text>
              <TextInput placeholder="Enter Model" onChangeText={(v)=>{this.setState({vin_number:v})}} style={styles.input}/>
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Disclaimers</Text>
              <Textarea
                style={styles.input}
                onChangeText={(v)=>this.state({disclaimers:v})}
                defaultValue={this.state.disclaimers}
                maxLength={500}
                placeholder={'Enter Description'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <View style={styles.formgroup}>
              <Text style={styles.formtitle}>Accident</Text>
              <Textarea
                style={styles.input}
                onChangeText={(v)=>this.state({accidents:v})}
                defaultValue={this.state.accidents}
                maxLength={500}
                placeholder={'Enter Accident'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
            </View>
          </Card.Content>
        </Card>)
    }

    CarouseladdItem = ({item, index}) => {
      const image = "data:image/*;base64,"+item[0].base64
      return (
        <View style={styles.container} key={index}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          <Icon name="trash" onPress={()=>this.removeImage(index,item[1])} size={23} style={styles.icon}/>
        </View>
      )
    }
    
    cardViewTemplate = (props)=>{
      let { setData, images, state } = props;
      if(images && images.length > 0){
          return(<View>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                data={images.map((entry)=>{return [entry,state]})}
                renderItem={this.CarouseladdItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
                onSnapToItem={(index) => {this.setState({selectedIndex:index})}}
            />
            <Pagination
                dotsLength={images.length}
                activeDotIndex={this.state.selectedIndex}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  marginVertical: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
          </View>)
      }else{
          return(<View style={{height:200, display: 'flex', justifyContent: 'center'}}>
              <Text
                style={{
                  alignContent: "stretch",
                  textAlign: "center",
                  fontSize: 17
                }}
              >
                Add an image to get started
              </Text>
          </View>)
      }
    }

    render(): React.ReactNode {
        
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
        ];
        const customStyles = {
          stepIndicatorSize: 25,
          currentStepIndicatorSize:30,
          separatorStrokeWidth: 2,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: '#fe7013',
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: '#fe7013',
          stepStrokeUnFinishedColor: '#aaaaaa',
          separatorFinishedColor: '#fe7013',
          separatorUnFinishedColor: '#aaaaaa',
          stepIndicatorFinishedColor: '#fe7013',
          stepIndicatorUnFinishedColor: '#ffffff',
          stepIndicatorCurrentColor: '#ffffff',
          stepIndicatorLabelFontSize: 13,
          currentStepIndicatorLabelFontSize: 13,
          stepIndicatorLabelCurrentColor: '#fe7013',
          stepIndicatorLabelFinishedColor: '#ffffff',
          stepIndicatorLabelUnFinishedColor: '#aaaaaa',
          labelColor: '#999999',
          labelSize: 13,
          currentStepLabelColor: '#fe7013',
          borderRadiusSize: 17
        }
        const loader = (
          <>
            <ActivityIndicator />
            <Text>Loading...</Text>
          </>
        );
        return(<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
          <ScrollView style={{borderTopColor: '#f7601b', borderTopWidth: 3}}>
              <View style={{paddingHorizontal: 19, paddingVertical: 10, marginBottom: 17, backgroundColor: '#ddd'}}>
                <ImageGallery
                    close={() => this.setState({ viewGallery: false })}
                    isOpen={this.state.viewGallery}
                    images={images}/>
                  <Pressable style={styles.debugbtn} onPress={()=>console.log(this.state)}>
                      <Text style={{color: '#ddd', textAlign: 'center', fontSize: 17}}>Debug Log</Text>
                  </Pressable>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: '#111' }}>
                      In order to validate your entry, we require you to at least submit
                      the required information of each category.{" "}
                  </Text>
              </View>
              <StepIndicator
                  customStyles={customStyles}
                  stepCount={8}
                  currentPosition={this.state.step}
              />
              
              <Text style={{textAlign:'center', color: '#555', fontWeight:'bold', fontSize:18, marginVertical: 10}} >{steps[this.state.step].title}</Text>
              {steps.map((entry, index) => {
                  if (entry.type == "images" && index == this.state.step) {
                    return (
                      <this.cardViewTemplate
                        state={entry.name}
                        images={this.state[`${entry.name}`]}
                      ></this.cardViewTemplate>
                    );
                  }else if(index == this.state.step && entry.type === "information"){
                    console.log('what')
                    return (<this.listingEntryTemplate/>)
                  }
              })}
              {this.state.step < steps.length && steps[this.state.step].type == 'images' &&(
                <View style={[styles.row]}>
                  <Pressable style={[styles.addimage,styles.btn]} onPress={()=> this.launchImagePicker(steps[this.state.step])}>
                    <Text style={styles.textCenter}>Add Image(s)</Text>
                  </Pressable>
                  <Pressable style={[styles.addimage,styles.btn]} onPress={()=> this.launchCamera(steps[this.state.step])}>
                    <Text style={styles.textCenter}>Take a picture</Text>
                  </Pressable>
                </View>
              )}
              <View style={[styles.row,styles.mb50]}>
                <Pressable style={styles.next} disabled={this.state.step == 0} onPress={()=>{
                  console.log("example clicking previus")
                  if(this.state.step >= 0){
                    console.log("exampel eeee"+this.state.step)
                    this.setState((state)=>{
                      state.step = state.step -1;
                      return state;
                    })
                  }
                }}>
                  <Text style={styles.textNext}><Icon style={{fontSize: 17}} name="arrow-left"/> Back</Text>
                </Pressable>
                {this.state.step < 7 &&(
                  <Pressable style={styles.next} onPress={()=>{
                    console.log("example clicking next")
                    if(this.state.step < 7){
                      console.log("exampel eeee"+this.state.step)
                      this.setState((state)=>{
                        state.step = state.step +1;
                        return state;
                      })
                    }
                  }}>
                    <Text style={styles.textNext}>Next <Icon style={{fontSize: 17}} name="arrow-right"/></Text>
                  </Pressable>
                )}
                {this.state.step > 6 &&(
                  <Pressable style={styles.btn} onPress={()=>{
                    Alert.alert('Ready to Submit', 'Ready to submit data?', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.submitData()},
                    ]);
                  }}>
                    <Text style={styles.textNext}>Submit</Text>
                  </Pressable>
                )}
                <Modal transparent popup visible={this.state.isSubmittingData} closable={false}>
                  <View style={styles.modalForm}>
                    <Text><ActivityIndicator/> Submitting Data</Text>
                  </View>
                </Modal>
              </View>
          </ScrollView>
        </KeyboardAvoidingView>)
    }
}

const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  color: '#fff'
};

const styles = StyleSheet.create({
    modalForm:{
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    debugbtn:{
        padding: 10,
        backgroundColor: '#272727',
        marginVertical: 10,
        borderRadius: 4,
        borderColor: '#efefef',
        borderWidth: 1
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15
    },
    btn:{
      padding: 15,
      width: '49%',
      borderWidth: 1,
      borderRadius: 7
    },
    addimage: {
      backgroundColor: 'white',
      borderColor: '#998',
    },
    next:{
      padding: 15,
      width: '49%',
    },
    textCenter: {
      textAlign: 'center',
      fontWeight: 600
    },icon:{
      backgroundColor: '#ffffff91',
      color: '#000',
      position: 'absolute',
      top: 3,
      left: 3,
      padding: 5,
      borderRadius: 4
  },
  input: {
      flex: 1,
      padding: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
  },
  mb50:{
    marginBottom: 50
  },
  formgroup: {
    marginBottom: 10
  },
  textNext: {
    fontSize: 17,
    fontWeight: 700,
    textAlign: 'center',
    color: '#333'
  },
  container: {
      backgroundColor: 'white',
      borderRadius: 8,
      width: ITEM_WIDTH,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
  },
  image: {
      width: ITEM_WIDTH,
      height: 300,
  }
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing
})


const mapActionCteators = {
  postListing,
  statecleanup_listing
}

export default connect(mapStateToProps, mapActionCteators)(CreateListing)