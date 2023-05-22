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
        listing: []
      };
    }
  
    componentDidMount() {
      console.log("navigation vinscanviewer")
      // console.log(this.props.route.params.data.vin_number)
      // this.props.vinScan(this.props.route.params.data.vin_number)
    }
  

    componentDidUpdate(prevProps) {
      let {listing} = this.props;
      console.log("::Example listing::")
      // console.log(listing)
      // this.setState({isLoading:false})
    }
  
    render() {
      // let { first_name, middle_name, last_name } = this.state
      return (<ScrollView style={{padding: 13, marginBottom: 60, borderTopColor: '#f7601b', borderTopWidth: 3}}>
        <Text>Basic Information</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Make</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Toyota</Text>
          </View>
          <Text style={styles.cardTitle}>Model</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Sienna</Text>
          </View>
          <Text style={styles.cardTitle}>Year</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>2015</Text>
          </View>
          <Text style={styles.cardTitle}>Trim</Text>
          <View style={[styles.innerCard,styles.mb10]}>

          </View>
          <Text style={styles.cardTitle}>Body Type</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>4 Door Passenger Van</Text>
          </View>
          <Text style={styles.cardTitle}>Vehicle Type</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Van</Text>
          </View>
          <Text style={styles.cardTitle}>Vehicle Size</Text>
          <View style={styles.innerCard}></View>
        </View>
        <Text>Transmission</Text>
        <View style={styles.card}>
          <Text style={styles.state}>Transmission Style</Text>
        </View>
        <Text>Restrain</Text>
        <View style={styles.card}>
          <Text style={styles.state}>Dual Air Bag;</Text>
        </View>
        <Text>Dimensions</Text>
        <View style={styles.card}>
          <Text style={styles.state}>Class D:</Text>
        </View>
        <Text>Drivetrain</Text>
        <View style={styles.card}>
          <Text style={styles.state}>Front Wheel Drive</Text>
        </View>
        <Text>Fuel</Text>
        <View style={styles.card}>
          <Text style={styles.state}>Gasoline</Text>
        </View>
        <Text>Engine Description</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Engine Size</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Toyota Motor Mfg., Indiana, Inc.</Text>
          </View>
          <Text style={styles.cardTitle}>Engine Description</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>V6, 3.5L</Text>
          </View>
          <Text style={styles.cardTitle}>Engine capacity</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}></Text>
          </View>
        </View>
        <Text>Manufacturer</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Manufacturer</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Toyota Motor Mfg., Indiana Inc.</Text>
          </View>
          <Text style={styles.cardTitle}>Region</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>Prince</Text>
          </View>
          <Text style={styles.cardTitle}>Country</Text>
          <View style={[styles.innerCard,styles.mb10]}>
            <Text style={styles.state}>United States</Text>
          </View>
          <Text style={styles.cardTitle}>Plant City</Text>
          <View style={styles.innerCard}>
            <Text style={styles.state}>Princeton, IN</Text>
          </View>
        </View>
        <Text>Transmission</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transmission Style</Text>
          <View style={styles.innerCard}>

          </View>
        </View>

      </ScrollView>
      );
    }
  }
  
const mapStateToProps = (state) => ({
  auth: state.auth,
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