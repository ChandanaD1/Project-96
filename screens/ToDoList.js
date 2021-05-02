import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import AppHeader from '../components/AppHeader'
import fs from '../config'
import firebase from 'firebase'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class ToDoList extends React.Component {
    constructor(){
        super()
        this.state={
            allHw: [],
            userId: firebase.auth().currentUser.email,
            docId: ""
        }
    }

    sendNotification=async(status,data)=>{
        var message = ""
        if(data.hasNotif==false) {
            if(status==1){
                message = "You have one day left to complete the assignment: " + data.assignment
            } else if(status==0) {
                message = "Today is the due date for the assignment: " + data.assignment
            }
            await fs.collection("Notifications").add({
                message: message,
                target_id: data.user_id,
                hw_id: data.hwId,
                assignment: data.assignment,
                dueDate: data.date,
                notification_status: "unread",
            })
            await fs.collection("AllHw").doc(data.docId).update({
                hasNotif: true
            })
        }
    }

    getAllHw=async()=>{
        await fs.collection("AllHw").where("user_id", "==", this.state.userId).where("status","==","pending").onSnapshot(snapshot=>{
            var data = []
            snapshot.docs.map(doc=>{
                var hw = doc.data()
                hw["docId"]=doc.id
                data.push(hw)
            })
            this.setState({allHw: data})
            this.state.allHw.map(data=>{
                var dueDate = data.date
                var date = dueDate.toString()
                var day = date.slice(0,2)
                var month = date.slice(3,5)
                var year = date.slice(6,10)
                console.log(day)
                console.log(month)
                console.log(year)
                var currentDay = new Date().getDate()
                var currentMonth = new Date().getMonth() + 1
                var currentYear = new Date().getFullYear()
                console.log(currentDay)
                console.log(currentMonth)
                console.log(currentYear)
                if (currentYear == year && currentMonth == month) {
                    if(currentDay == day-1) {
                        this.sendNotification(1,data)
                    }
                    else if(currentDay == day) {
                        this.sendNotification(0,data)
                    }
                }
            })
        })
    }

    changeStatus=async(item)=>{
        await fs.collection("AllHw").where("hwId","==",item.hwId).onSnapshot(snapshot=>{
            snapshot.docs.map(doc=>{
                this.setState({docId: doc.id})
            })
        })
        await fs.collection("AllHw").doc(this.state.docId).update({
            status: "completed"
        })
    }

    renderItem=({item,i})=>{
        return(
            <View style={styles.container}>
                <SafeAreaProvider>
                <Card>
                    <Text>{item.assignment}</Text>
                    <Card>
                        <Text>{item.subject}</Text>
                    </Card>
                    <Card>
                        <Text>{item.date}</Text>
                    </Card>
                    <Card>
                        <Text>{item.rating}</Text>
                    </Card>
                    <TouchableOpacity onPress={()=>{
                        this.changeStatus(item)
                    }}>
                        <Text>Mark as Completed</Text>
                    </TouchableOpacity>
                </Card>
                </SafeAreaProvider>
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
                    <AppHeader title = "To Do List"/>
                </View>
                <View style={{flex:0.7}}>
                    {
                        this.state.allHw.length==0 ? (
                            <Text style={{textAlign:"center",fontSize:20}}>There are no homeworks listed</Text>
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