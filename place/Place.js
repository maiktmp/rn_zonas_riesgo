import React from 'react';
import {View, Text} from 'react-native';

class Place extends React.Component {
  static navigationOptions = {
    title: 'Municipio',
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    );
  }

}

export default Place;