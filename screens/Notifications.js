import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ListItem, Icon} from 'react-native-elements'
import AppHeader from '../components/AppHeader'
import SwipableFlatList from '../components/SwipableFlatlist.js'
import firebase from 'firebase'
import fs from '../config'

export default class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: []
    }
  }

  getAllNotifications=()=>{
    fs.collection("Notifications").where("target_id","==",this.state.userId).where("notification_status","==","unread").get()
    .then(snapShot=>{
      var notification = []
        snapShot.forEach(doc=>{
          var data = doc.data()
          data["doc_id"]=doc.id
          notification.push(data)
        }) 
      this.setState({
        allNotifications: notification
      })
    })
  }
  
  componentDidMount=()=>{
    this.getAllNotifications()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:0.3}}>
        <AppHeader title="Notification Screen" navigation={this.props.navigation}/> 
        </View>
        <View style={{flex:0.7}}>
          {
            this.state.allNotifications.length == 0 ? (
              <View>
                <Text style={{textAlign:"center",fontSize:20}}>You have no notifications</Text>
              </View>
            ):(
              <SwipableFlatList allNotifications={this.state.allNotifications}/>
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
});
