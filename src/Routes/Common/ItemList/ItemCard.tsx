import {Card} from 'react-native-paper'
import { Avatar } from 'react-native-elements';
import { View, Text, Image, TouchableOpacity, ImageBackground, } from 'react-native'
import React from "react"
import moment from 'moment';
import { HomeStyles } from "../HomeStyles"
// import { API_URL } from '@env';
const API_URL = 'http://165.22.48.133:3333';
import noimage from './no-image.png'

interface listingData {
    name: string;
    description: string;
    address: string;
    make_of_vehicle: string;
    year_of_vehicle: string;
    model: string;
    trim: string;
    mileage: string;
    vin_number: string;
    created_at: Date;
    updated_at: Date;
    id: number;
}

interface inputs {
    data: listingData
    viewItemCallback: Function
    style: object
}
export default class ItemCard extends React.Component<inputs> {
    data: listingData;
    index: number;
    style: object
    // viewItemCallback:Function

    constructor(props: any) {
        super(props)
        this.data = props;
        this.index = props.index;
        this.viewItemCallback = props.viewItemCallback
        this.style = props.style

    }

    componentDidMount() {
        console.log("ITEMCARD")
        console.log(this.props)
    }

    viewItem() {
        // console.log('item click')
        if (this.props.viewItemCallback) {
            this.props.viewItemCallback(this.data.data)
        }
    }

    render() {
        const data = this.props.data
        var hiddenStyle= {  }
        // console.log("ITEMCARD")
        // console.log(data)

        var uri = this.props.data.attachments && this.props.data.attachments.length > 0 ? `${API_URL}/${this.props.data.attachments[0].uri_path}` : noimage
        console.log(uri)
        return (<TouchableOpacity onPress={() => this.viewItem()} style={this.style}>
            <Card style={{width: 145, backgroundColor: '#222', borderColor: '#444', borderRadius: 3}}>
                <Card.Content>
                    <ImageBackground style={{ height: 100, }} source={{ 'uri': `${uri}` }} >
                        {data.has_ended && (
                            <Text style={{
                                position:'absolute', fontSize:40,
                                top:0, left:0, right:0, bottom:0, justifyContent:'center',alignItems:'center', alignSelf:'center', marginTop:30, marginLeft:10,
                            }}>Closed</Text>
                        )}
                        {data.hidden && (
                            <Text style={{
                                position:'absolute', fontSize:40,
                                top:0, left:0, right:0, bottom:0, justifyContent:'center',alignItems:'center', alignSelf:'center', marginTop:30, marginLeft:10,
                            }}>{data.status == "PENDING" ? "Pending" : "Hidden"}</Text>
                        )}
                    </ImageBackground>
                </Card.Content>   
                <Card.Content style={{marginTop: 7}}>
                        <Text style={HomeStyles.listingCards}>
                            {data.name}
                        </Text>
                        <Text style={[HomeStyles.listingCards, HomeStyles.listingCardsDesc]}>
                            {data.make_of_vehicle}
                        </Text>
                        <Text style={{ alignSelf: 'flex-end', color: '#aaa' }}>
                            {moment(new Date(data.created_at)).fromNow()}
                        </Text>
                </Card.Content>
            </Card>
            {/* <Card style={{width: 150, backgroundColor: '#111', borderColor: '#444'}}>
                <Card.Header style={HomeStyles.notificationBody}/>
            </Card> */}
        </TouchableOpacity>)
    }
}