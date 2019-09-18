import React from 'react';
import {Button, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import createStackNavigator from 'react-navigation-stack/src/navigators/createStackNavigator';
import ListViewTowns from '../list_view/ListViewTowns';
import ListViewZones from '../list_view/ListViewZones';
import Place from '../place/Place';
import TownView from '../town/TownView';
import UpdateTown from '../town/UpdateTown';
import CreateTown from '../town/CreateTown';
import ListViewOptions from '../list_view/ListViewOptions';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.onValidateLogin = this.onValidateLogin.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.username = 'alu_14280487';
    this.password = 'pw0000';
    this.state = {
      logged: false,
      username: undefined,
      password: undefined,
      error: undefined,
    };
  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.onContinue();
      }
    });
  }

  onValidateLogin() {
    this.setState({error: undefined});
    if (this.state.username === undefined || this.state.password === undefined) {
      this.setState({error: 'Verifique sus credenciales.'});
      return null;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        this.onContinue();
      })
      .catch(error => this.setState({error: error.message}));
  }

  onContinue = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'MainList'}),
      ],
    }));
  };

  render() {
    return (
      <View style={{
        padding: 50,
        display: 'flex',
        alignContent: 'center',
        height: '80%',
        justifyContent: 'center',
      }}>
        <TextField
          label='Usuario'
          onChangeText={(username) => this.setState({username: username})}
        />
        <TextField
          label='Contraseña'
          secureTextEntry={true}
          error={this.state.error}
          onChangeText={(password) => this.setState({password: password})}
        />
        <Button
          title="LOGIN"
          onPress={this.onValidateLogin}
        />
      </View>
    );
  }
}

const _toolbarConfig = ({navigation}) => ({
  headerStyle: {backgroundColor: '#2c4370'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold'},
  headerRight: (
    <Icon.Button
      name="md-exit"
      color="#FFF"
      size={25}
      backgroundColor={'rgba(255,255,255,0)'}
      onPress={e => {
        firebase.auth().signOut().then(() => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Login'})],
          });
          navigation.dispatch(resetAction);
        });
      }}/>
  ),
});

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  ListTowns: {
    screen: ListViewTowns,
    navigationOptions: _toolbarConfig,
  },
  ListZones: {
    screen: ListViewZones,
    navigationOptions: _toolbarConfig,
  },
  Place: {
    screen: Place,
    navigationOptions: _toolbarConfig,
  },
  MainList: {
    screen: ListViewOptions,
    navigationOptions: _toolbarConfig,
  },
  ViewTown: {
    screen: TownView,
    navigationOptions: _toolbarConfig,
  },
  UpdateTown: {
    screen: UpdateTown,
    navigationOptions: _toolbarConfig,
  },
  CreateTown: {
    screen: CreateTown,
    navigationOptions: _toolbarConfig,
  },
}, {
  initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);