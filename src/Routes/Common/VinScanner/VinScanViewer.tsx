import React, {Component} from 'react';
import moment from 'moment';
import {Rating} from 'react-native-elements';
import {View, Text, ScrollView, Image, ActivityIndicator, StyleSheet} from 'react-native';
import {vinScan} from './../../../stores/modules/listing'
import { connect } from 'react-redux';
import { transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';


export default class VinScanViewer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: null,
        mode: 'default',
        details: []
      };
    }
  
    componentDidMount() {
      console.log("component did mount in vin scan viewer")
      console.log("component did mount "+this.props.route.params.data)
      this.props.vinScan(this.props.route.params.data)
    }
  

    componentDidUpdate(prevProps) {
      let {listing} = this.props;
      console.log("componentdidupdate")
      if(prevProps!=this.props){
        if(listing.getVinError){
          this.setState({isLoading:false})
        }
        if(listing.getVinData){
          this.setState({details:listing.getVinData.data, isLoading:false})
          console.log("componentdidupdate data ")
          console.log(listing.getVinData.data)
        }
      }
    }
  

    render() {
      // let { first_name, middle_name, last_name } = this.state
      return (<ScrollView style={{padding: 13, marginBottom: 60, borderTopColor: '#f7601b', borderTopWidth: 3}}>
        {!this.state.isLoading &&(<><Text>Basic Information</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Make</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.make}</Text>
          </View>
          <Text style={styles.cardTitle}>Model</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.model}</Text>
          </View>
          <Text style={styles.cardTitle}>Year</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.year}</Text>
          </View>
          <Text style={styles.cardTitle}>Trim</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.trim}</Text>
          </View>
          <Text style={styles.cardTitle}>Body Type</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.body_type}</Text>
          </View>
          <Text style={styles.cardTitle}>Vehicle Type</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.basic.vehicle_type}</Text>
          </View>
          <Text style={styles.cardTitle}>Vehicle Size</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}>{this.state.details.basic.vehicle_size}</Text>
          </View>
        </View>
        <Text>Transmission</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transmission style</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.transmission.transmission_style}</Text>
          </View>
        </View>
        <Text>Restraint</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Others</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}>{this.state.details.restraint.others}</Text>
          </View>
        </View>
        <Text>Dimensions</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>GVWR</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.dimensions.gvwr}</Text>
          </View>
        </View>
        <Text>Drivetrain</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Drive type</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.drivetrain.drive_type}</Text>
          </View>
        </View>
        <Text>Fuel</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Highway mileage</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.fuel.highway_mileage}</Text>
          </View>
        </View>
        <Text>Engine</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Engine Size</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.engine.engine_size}</Text>
          </View>
          <Text style={styles.cardTitle}>Engine Description</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.engine.engine_description}</Text>
          </View>
          <Text style={styles.cardTitle}>Engine capacity</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}>{this.state.details.engine.engine_capacity}</Text>
          </View>
        </View>
        <Text>Manufacturer</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Manufacturer</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.manufacturer.manufacturer}</Text>
          </View>
          <Text style={styles.cardTitle}>Region</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.manufacturer.region}</Text>
          </View>
          <Text style={styles.cardTitle}>Country</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>{this.state.details.manufacturer.country}</Text>
          </View>
          <Text style={styles.cardTitle}>Plant City</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}>{this.state.details.manufacturer.plant_country_name}</Text>
          </View>
        </View></>)}
      </ScrollView>
      );
    }
  }
  
const mapStateToProps = (state) => ({
  listing: state.listing
})


const mapActionCteators = {
  vinScan
}
const styles = StyleSheet.create({
  state: {
    fontSize: 17,
    fontWeight: 550,
  },
  card: {
    padding: 7,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 3
  },
  cardTitle:{
    fontSize: 13,
    marginBottom: 5
  },
  innerCard:{
    paddingLeft: 7,
  },
  mb10:{
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 10
  }
})
export default connect(mapStateToProps, mapActionCteators)(VinScanViewer)