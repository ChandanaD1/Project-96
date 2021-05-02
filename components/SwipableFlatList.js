import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import { SwipeListView } from 'react-native-swipe-list-view'
import fs from '../config'
import firebase from 'firebase'
import Animated from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class SwipableFlatList extends React.Component {
  constructor(props){
    super(props)
    this.state={
      allNotifications: this.props.allNotifications
    }
    console.log(this.state.allNotifications)
  }
  renderItem=({item,i})=>(
      <Animated.View>
          <SafeAreaProvider>
                <Card bottomDivider>
                    <Text>{item.assignment}</Text>
                    <Card>
                        <Text>{item.dueDate}</Text>
                    </Card>
                    <Card>
                        <Text>{item.message}</Text>
                    </Card>
                </Card>
            </SafeAreaProvider>
      </Animated.View>
  )
  renderHiddenItem=()=>(
      <View style = {styles.rowBack}>
        <View style = {[styles.backRightBtn,styles.backRightBtnRight]}>
          <Text styles = {styles.backTextWhite}>Mark as Read</Text>
        </View>
      </View>
  )
  updateMarkAsRead=(notification)=>{
    fs.collection("Notifications").doc(notification.doc_id).update({
      notification_status: "read"
    })
  }
  onSwipeValueChange=(swipeData)=>{
    var notes = this.state.allNotifications
    const {key,value} = swipeData
    if (value<-Dimensions.get("window").width){
      const newdata = [...notes]
      this.updateMarkAsRead(notes[key])
      newdata.splice(key,1)
      this.setState({
        allNotifications: newdata
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <SwipeListView 
        disableRightSwipe
        data = {this.state.allNotifications}
        renderItem = {this.renderItem}
        renderHiddenItem = {this.renderHiddenItem}
        rightOpenValue = {-Dimensions.get('window').width}
        previewRowKey = {'0'}
        previewOpenValue = {-40}
        previewOpenDelay = {3000}
        keyExtractor = {(item,index)=>index.toString()} 
        onSwipeValueChange = {this.onSwipeValueChange}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: "white", 
    flex: 1 
  }, 
  backTextWhite: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 15, 
    textAlign: "center", 
    alignSelf: "flex-start" 
  }, 
  rowBack: { 
    alignItems: "center", 
    backgroundColor: "#29b6f6", 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingLeft: 15 
  }, 
  backRightBtn: { 
    alignItems: "center", 
    bottom: 0, 
    justifyContent: "center", 
    position: "absolute", 
    top: 0, 
    width: 100 
  }, 
  backRightBtnRight: { 
    backgroundColor: "#29b6f6", 
    right: 0 
  }, 
});