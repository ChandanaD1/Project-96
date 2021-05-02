import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import ToDoList from './screens/ToDoList'
import AddToList from './screens/AddToList'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import CompletedList from './screens/CompletedList';
import Notifications from './screens/Notifications'
import firebase from 'firebase'

export default class App extends React.Component {

  constructor(){
    super()
    this.state={
      details: [],
      userId: firebase.auth().currentUser.email,
    }
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const tabNavigator = createBottomTabNavigator ({
  ToDo: {screen: ToDoList},
  Add: {screen: AddToList},
  Completed: {screen: CompletedList},
  Notifications: {screen: Notifications}
},
{
  defaultNavigationOptions: ({navigation})=> ({
    tabBarIcon: ({})=> {
      const routeName= navigation.state.routeName
      if(routeName=="ToDo") {
        return(
          <Image style={{width:40,height:30}} source={require('./assets/checklist.png')}></Image>
        )
      } else if(routeName=="Add") {
        return(
          <Image style={{width:40,height:30}} source={require('./assets/plus.png')}></Image>
        ) 
      } else if(routeName == "Completed") {
        return(
          <Image style={{width:40,height:30}} source={require('./assets/check.png')}></Image>
        ) 
      } else if(routeName == "Notifications") {
        return(
          <Image style={{width:40,height:30}} source={require('./assets/bell.png')}></Image>
        ) 
      }
    }
  })
})

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen:WelcomeScreen},
  tabNavigator: {screen:tabNavigator}
})

const AppContainer = createAppContainer (switchNavigator)