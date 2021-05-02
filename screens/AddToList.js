import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu'
import AppHeader from '../components/AppHeader'
import fs from '../config'
import firebase from 'firebase'

export default class AddToList extends React.Component {
    constructor() {
        super()
        this.state={
            subjects: [["Subject","English","Math","Science","History","Language","Fine Arts","Other"]],
            ratings: [["Rating of Importance","1","2","3"]],
            subject: "",
            rating: "",
            assignment: "",
            date: "",
            userId: firebase.auth().currentUser.email
        }
    }

    addHw=()=>{
        fs.collection("AllHw").add({
            user_id: this.state.userId,
            subject: this.state.subject,
            assignment: this.state.assignment,
            date: this.state.date,
            rating: this.state.rating,
            status: "pending",
            hwId: Math.random().toString(36).substring(6),
            hasNotif: false
        })
        alert("Homework added")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <AppHeader title = "Add To List"/>
                </View>
                <View style={{flex:0.1, width: "80%", justifyContent: "center", alignSelf: "center", marginTop: 10}}>
                    <DropdownMenu data={this.state.subjects}
                    bgColor={"#bcb9ff"}
                    handler={(selection,row)=>{
                        this.setState({subject:this.state.subjects[selection][row]})
                    }}
                    label="subject"/>
                </View>
                {
                    this.state.subject!="" ? (
                    <View style={{flex:0.8,}}>
                        <TextInput placeholder="Assignment" 
                        style={styles.textInput}
                        onChangeText={(text)=>{
                            this.setState({assignment:text})
                        }}/>
                        <TextInput placeholder="Due Date: dd/mm/yyyy" 
                        style={styles.textInput}
                        onChangeText={(text)=>{
                            this.setState({date:text})
                        }}/>
                        <View style={{flex:1, marginTop: 30, width: "80%", justifyContent: "center", alignSelf: "center"}}>
                            <DropdownMenu data={this.state.ratings}
                            bgColor={"#bcb9ff"}
                            handler={(selection,row)=>{
                                this.setState({rating:this.state.ratings[selection][row]})
                            }}
                            label="rating"/>
                        </View>
                        {
                            this.state.rating!="" ? (
                                <TouchableOpacity style={styles.inputBox}
                                onPress={()=>{
                                    this.addHw()
                                }}>
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            ) : null
                        }
                    </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d5dbff',
    },
    textInput: {
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignSelf: "center",
        textAlign:"center",
        backgroundColor: "#bcb9ff",
        fontSize: 20,
        marginTop: 30,
    },
    inputBox: {
        backgroundColor: "#bcb9ff",
        marginBottom: 50,
        width: 300, 
        height: 40, 
        borderWidth: 3,  
        fontSize: 20,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
      }
  });