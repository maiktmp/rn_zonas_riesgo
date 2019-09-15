import {Dimensions, StyleSheet} from 'react-native';

export default AppStyles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1, padding: 10},
  headline: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
    width: 200,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  fullImage: {
    height: 300,
    width: Dimensions.get('window').width,
  },
});