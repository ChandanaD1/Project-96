import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import fs from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component {

    constructor() {
        super()
        this.state={
            loginState: false,
            signupState: false,
            emailId: "",
            password: "",
            confirmPassword: "",
            name: ""
        }
    }
  
    loginModal=()=>{
        return(
            <Modal 
            animationType="slide" 
            transparent={true}
            visible={this.state.loginState}>
                <View>
                    <TextInput 
                    keyboardType="email-address" 
                    placeholder="Email ID" 
                    style={styles.inputBox} 
                    value={this.state.emailId} 
                    onChangeText={(text=>{this.setState({emailId:text})})}/>
                    <TextInput 
                    secureTextEntry={true} 
                    placeholder="Password" 
                    style={styles.inputBox} 
                    value={this.state.password} 
                    onChangeText={(text=>{this.setState({password:text})})}/>
                    <View>
                        <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                            <Text>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={()=>{
                            this.setState({loginState: false})
                        }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    signupModal=()=>{
        return(
            <Modal 
            animationType="slide" 
            transparent={true}
            visible={this.state.signupState}>
                <View>
                    <TextInput 
                    placeholder="Name" 
                    style={styles.inputBox} 
                    value={this.state.name} 
                    onChangeText={(text=>{this.setState({name:text})})}/>
                    <TextInput 
                    keyboardType="email-address" 
                    placeholder="Email ID" 
                    style={styles.inputBox} 
                    value={this.state.emailId} 
                    onChangeText={(text=>{this.setState({emailId:text})})}/>
                    <TextInput 
                    secureTextEntry={true} 
                    placeholder="Password" 
                    style={styles.inputBox} 
                    value={this.state.password} 
                    onChangeText={(text=>{this.setState({password:text})})}/>
                    <TextInput 
                    secureTextEntry={true} 
                    placeholder="Confirm Password" 
                    style={styles.inputBox} 
                    value={this.state.confirmPassword} 
                    onChangeText={(text=>{this.setState({confirmPassword:text})})}/>
                    <View>
                        <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={()=>{this.userSignup(this.state.emailId,this.state.password, this.state.confirmPassword)}}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={()=>{
                            this.setState({signupState: false})
                        }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    userLogin=async(email,password)=>{
        if(email&&password) {
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response) {
                    alert("Log in successful")
                    this.props.navigation.navigate("ToDo")
                }
            }
            catch(error){
                alert(error.code)
            }
        } else {
            alert("Enter Email And Password")
        }
    }

    userSignup=async(email,password,confirm)=>{
        if(password!=confirm){
            return(
                alert("The password doesn't match")
            )
        } else {
            firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            fs.collection("Users").add({
                name: this.state.name,
                email_id: this.state.emailId,
            })
            return(
                alert("Sign up successful")
            )
        })
        .catch(function(error){
            return(
                alert(error.code)
            )
        })
        }
    }
  
    render() {
        if(this.state.loginState==true) {
            return(
                <View>
                    {this.loginModal()}
                </View>
            )
        } else if(this.state.signupState==true) {
            return(
                <View>
                    {this.signupModal()}
                </View>
            )
        }
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Title</Text>
            <Image source={require('../assets/hwimg.png')} style={styles.image}/>
            <TouchableOpacity style={styles.inputBox} onPress={()=>{
                this.setState({loginState: true})
            }}>
                <Text styles={styles.text}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBox} onPress={()=>{
                this.setState({signupState: true})
            }}>
                <Text styles={styles.text}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5dbff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      fontFamily: "Symbol",
      fontSize: 100,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: -100,
      color: "#7b75ff",
  },
  text: {
    fontFamily: "Chalkduster",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  image: {
    width: 200,
    height: 200,
  },
  inputBox: {
    backgroundColor: "#bcb9ff",
    marginTop: 20,
    width: 300, 
    height: 40, 
    borderWidth: 3,  
    fontSize: 20,
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center"
  }
});