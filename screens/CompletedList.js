import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import AppHeader from '../components/AppHeader'
import fs from '../config'
import firebase from 'firebase'

export default class CompletedList extends React.Component {
    constructor(){
        super()
        this.state={
            allHw: [],
            userId: firebase.auth().currentUser.email,
            docId: ""
        }
    }
    
    getAllHw=()=>{
        fs.collection("AllHw").where("user_id", "==", this.state.userId).where("status","==","completed").onSnapshot(snapshot=>{
            var data = snapshot.docs.map(doc=>doc.data())
            this.setState({allHw: data})
            console.log(this.state.allHw)
        })
    }

    changeStatus=async(item)=>{
        await fs.collection("AllHw").where("hwId","==",item.hwId).onSnapshot(snapshot=>{
            snapshot.docs.map(doc=>{
                this.setState({docId: doc.id})
            })
        })
        fs.collection("AllHw").doc(this.state.docId).update({
            status: "completed"
        })
    }

    renderItem=({item,i})=>{
        var rating=parseInt(item.rating)
        return(
            <View style={styles.container}>
                <Text>{item.assignment}</Text>
                <Text>{item.subject+"\n"+item.rating}</Text>
            </View>  
        )
    }

    componentDidMount=()=>{
        this.getAllHw()
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={{flex:0.3}}>
            <AppHeader title = "Completed List"/>
            </View>
            <View style={{flex:0.7}}>
                {
                    this.state.allHw.length==0 ? (
                        <Text style={{textAlign:"center",fontSize:20}}>There are no homeworks completed</Text>
                    ) : (
                        <FlatList data={this.state.allHw} 
                        renderItem={this.renderItem} 
                        keyExtractor={this.keyExtractor}/>
                    )
                }
            </View>
            </View>
        );
    }
    }

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#d5dbff',
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
  width: 70, 
  height: 40, 
  borderRadius: 10,
  borderWidth: 3,  
  fontSize: 20,
  textAlign: 'center',
}
});