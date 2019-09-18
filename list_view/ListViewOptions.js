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


function Item({id, title, onItemClick}) {
  return (
    <TouchableHighlight onPress={e => {
      onItemClick(id);
    }} underlayColor={'#4d2efa'} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
}

class ListViewOptions extends React.Component {
  componentDidMount(): void {
  }

  onItemClick = (id) => {
    if (id === '1') {
      this.props.navigation.push('ListTowns');
    }
    if (id === '2') {
      this.props.navigation.push('ListZones');
    }
    // const photos = findPhotos(name);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={styles.line}/>
          )}
          data={Info.MainMenu}
          renderItem={({item}) =>
            <Item id={item.id}
                  title={item.name}
                  onItemClick={this.onItemClick}/>
          }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

export default ListViewOptions;