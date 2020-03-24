import React from "react";
import {
    View,
    Text,
    SectionList,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList,
    Dimensions,
    Platform,
    Linking,

} from "react-native";
import {Header,Icon} from 'react-native-elements'
import { EDColors } from "../assets/Colors";
import { apiPost } from "../api/APIManager";
import {
  CHECK_WALLET
} from "../utils/Constants";
import { getUserToken, saveUserLogin } from "../utils/AsyncStorageHelper";
export default class Wallet extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      amount:0
    };
  }
  componentDidMount(){
    getUserToken(
      success => {
        userObj = success;
        let param = {
          user_id:userObj.UserID
        }
        apiPost(
          CHECK_WALLET,
          param,
          onSuccess => {
              console.log("CHECK API SUCCESS ::::::: ", onSuccess)
              if(onSuccess.status === 0){
               // this.setState({isLoading: false})
               // alert("Please select pickup option delivery service is not available at this moment")
              }else{
                this.setState({amount:onSuccess.wallet.amount})
              }
              
          },
          onFailure => {
            console.log("CHECK API FAILURE ::::::: ", onFailure)
            this.setState({isLoading: false})
          }
    
        )
      
      },
      failure => {
        showValidationAlert(Messages.loginValidation);
      }
    );

  }
  

    render(){
        return(
       <View style={{flex:1}}>
       <Header  
       centerComponent={<Text style={{color:'black',fontSize:20,marginBottom:10}}>My Wallet</Text>}
       
       containerStyle={{backgroundColor:EDColors.primary,height:70}}
       />
       <Text style={{textAlign:'center',fontSize:40,fontWeight:'bold',marginBottom:10,borderBottomColor:'lightgray',borderBottomWidth:1,paddingBottom:10,marginTop:10}}>Rs. {this.state.amount}</Text>
       <View style={{width:"100%",alignItems:'center',marginTop:15}}>
    
  
        
   

       </View>
       </View>
        );
    }
}