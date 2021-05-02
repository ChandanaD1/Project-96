import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import fs from '../config'
import firebase from 'firebase'

export default class AppHeader extends React.Component {
  constructor(props){
    super(props)
    this.state={
      value: ""
    }
  }

  render() {
    return (
        <SafeAreaProvider>
            <Header 
            centerComponent={{text:this.props.title, style:{color: "#a2adff", fontSize: 30, fontWeight:'bold', fontFamily:"Cochin"}} }
            backgroundColor= "#7b75ff"
            containerStyle={{height:50}}/>
        </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
