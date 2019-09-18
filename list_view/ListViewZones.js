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

function Item({id, title, onZoneCLick}) {
  return (
    <TouchableHighlight onPress={e => {
      onZoneCLick(id);
    }} underlayColor="white" style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
}


class ListViewZones extends React.Component {
  constructor(props) {
    super(props);
    this.onZoneClick = this.onZoneClick.bind(this);
  }

  onZoneClick(id) {
    this.props.navigation.push('ListTowns', {
      zones: [id],
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={styles.line}/>
          )}
          data={Info.Zones}
          renderItem={({item}) =>
            <Item id={item.id}
                  title={item.name}
                  onZoneCLick={this.onZoneClick}/>
          }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

export default ListViewZones;
