import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Info from './data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#ffffffff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(31,10,76,0.5)',
  },
});

function Item({title, onPlaceClick}) {
  return (
    <TouchableHighlight onPress={e => {
      onPlaceClick(title);
    }} underlayColor="white" style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
}


class ListViewZones extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={styles.line}/>
          )}
          data={Info.Zones}
          renderItem={({item}) =>
            <Item title={item.name}
                  onPlaceClick={this.onPLaceClick}/>
          }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

export default ListViewZones;
