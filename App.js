/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
  }

  componentDidMount(){
    return fetch("https://api.fda.gov/drug/enforcement.json?search=status:Ongoing&limit=50")
           .then((response)=>response.json())
           .then((responseJson)=>{
              // alert(responseJson.results[0].reason_for_recall)
              var items = []
              responseJson.results.forEach(function(item){
                items.push(item);
              })

              this.setState({
                isLoading: false,
                data: items
              })
            })
           .catch((error)=>{
            console.error(error);
           })        
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>MedRx Callback</Text>
            {this.state.data.map((item, i)=>
              <Text key={i} style={styles.card}>
                <Text style={styles.title}>Code Info: </Text>{"\n"}
                <Text>{item.code_info}</Text>{"\n"}
                <Text style={styles.title}>Recalling firm: </Text>{"\n"}
                <Text>{item.recalling_firm}</Text>{"\n"}
                <Text style={styles.title}>Report Date</Text>{"\n"}
                <Text>{item.report_date}</Text>{"\n"}
                <Text style={styles.title}>Reason for Recall:</Text>{"\n"}
                <Text>{item.reason_for_recall}</Text>{"\n"}
                <Text style={styles.title}>Location:</Text>{"\n"}
                <Text>{item.address_1}, {item.city}, {item.state} </Text>
              </Text>
            )}
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#97d8b2',
    padding: 10
  },
  heading:{
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#4000ff'

  },
  card:{
    margin: 10,
    backgroundColor: '#ecdcb0',
    padding: 10
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0080' 
  }
});
