import React, {useEffect} from 'react';
import { Text, Image, View, Pressable, Keyboard, StyleSheet, Button, TextInput, Alert, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import frame from '../../../assets/scanner_frame.png'
export class QRScanner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasPermission: null,
            setHasPermission: null,
            scanned: false,
            setScanned: false,
            vin_number: null,
            number: 0
        }
    }

    useEffect(){
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          this.setState({setHasPermission:status==='granted'})
        };
    
        getBarCodeScannerPermissions();
    }

    handleBarCodeScanned({type,data}){
        this.setState({setScanned:true, vin_number:data})
        console.log(data+" sample scanning")
        if(this.state.number == 0)
        this.props.navigation.navigate('addlisting', {data})
        this.setState({number: 1})
        // Alert.alert('Bar code with type '+type, 'Data'+data+' has been scanned!')
    }
    render(): React.ReactNode {
        
        return(<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
                <View style={{flex:1}}>
                    <BarCodeScanner
                        onBarCodeScanned={(data)=>{this.props.scanned ? undefined : this.handleBarCodeScanned(data)}}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={{position: 'absolute', height: '100%',width: '100%', justifyContent: 'center'}}>
                        <Image source={frame} style={{height: 470, width: 470, alignSelf: 'center'}}/>
                    </View>
                    {this.props.hasPermission == false &&(
                        <Text>No access to camera</Text>
                    )}
                    {this.props.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({setScanned:false})} />}
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>)
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
})
  
  
const mapActionCteators = {
    
}
  
export default connect(mapStateToProps, mapActionCteators)(QRScanner)