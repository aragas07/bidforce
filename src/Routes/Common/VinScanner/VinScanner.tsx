import React, {useEffect} from 'react';
import { Text, Image, View, Pressable, Keyboard, StyleSheet, Button, TextInput, Alert, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import frame from '../../../assets/scanner_frame.png'
export class VinScanner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasPermission: null,
            setHasPermission: null,
            scanned: false,
            setScanned: false,
            vin: null,
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
        this.setState({setScanned:true, vin:data})
        this.props.navigation.navigate('vinscan')
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
                    <View style={{position: 'absolute',top:0, left:0, height: '100%',width: '100%', justifyContent: 'center'}}>
                        <Image source={frame} style={{height: 570, width: 570, alignSelf: 'center'}}/>
                    </View>
                    {this.props.hasPermission == false &&(
                        <Text>No access to camera</Text>
                    )}
                    {this.props.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({setScanned:false})} />}
                </View>
                <View style={{height: 190, width: '100%', backgroundColor: 'white', backgroundColor: '#eee'}}>
                    <TextInput placeholder="Search Vin" value={this.state.vin} onChange={(v)=>this.setState({vin:v})}
                    style={{margin: 7,
                    padding: 5,
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    fontSize: 19}}/>
                    <Pressable onPress={(data)=>{this.handleBarCodeScanned(data)}} style={{padding: 10, width: '50%', borderColor: '#0f56fc', borderWidth: 1, backgroundColor: '#306dfc', alignSelf:'center', borderRadius: 7}}>
                        <Text style={{fontSize:19, fontWeight: 700, color: 'white', textAlign: 'center'}}>Search</Text>
                    </Pressable>
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
  
export default connect(mapStateToProps, mapActionCteators)(VinScanner)