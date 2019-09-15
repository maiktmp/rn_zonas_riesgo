import React from 'react';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Info from '../list_view/data';
import firebase from 'react-native-firebase';
import {Rows, Table} from 'react-native-table-component';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AppStyles from '../styles/AppStyles';


const styles = StyleSheet.create({
  fullImage: {
    height: 250,
    width: Dimensions.get('window').width,
  },
  container: {backgroundColor: '#fff', flex: 1},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  table: {borderWidth: 2, borderColor: '#c8e1ff', marginBottom: 2},
  text: {margin: 6},
  headline: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
    width: 200,
  },
});

class TownView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('cabecera', 'Municipio'),
  });

  constructor(props) {
    super(props);
    this.onUpdateTown = this.onUpdateTown.bind(this);
    this.ref = firebase.firestore().collection('municipios');
    console.disableYellowBox = true;
    this.state = {
      isLoading: true,
      id: this.props.navigation.getParam('id'),
      image: undefined,
      altitud: undefined,
      cabecera: undefined,
      clima: undefined,
      cuerposA: undefined,
      derrumbe: undefined,
      deslave: undefined,
      elevaciones: undefined,
      igecem: undefined,
      incendio: undefined,
      indust: undefined,
      inundacion: undefined,
      latitud: undefined,
      longitud: undefined,
      masExtenso: undefined,
      masPoblado: undefined,
      menosExtenso: undefined,
      nombre: undefined,
      rios: undefined,
      significado: undefined,
      sismo: undefined,
      superficie: undefined,
      vulcanismo: undefined,
    };
  }

  componentDidMount(): void {
    this.setState({image: Info.TownImage.filter(town => town.id === this.state.id)[0].image_url});
  }

  getTownInfo() {
    const doc = this.ref.doc(this.state.id).get();
    if (!this.state.isLoading) {
      return null;
    }
    doc
      .then(response => {
        const town = response.data();
        console.log(town);
        this.setState({
          cabecera: town.cabecera,
          altitud: town.altitud,
          clima: town.clima,
          cuerposA: town.cuerposA,
          derrumbe: town.derrumbe,
          deslave: town.deslave,
          elevaciones: town.elevaciones,
          igecem: town.igecem,
          incendio: town.incendio,
          indust: town.indust,
          inundacion: town.inundacion,
          latitud: town.latitud,
          longitud: town.longitud,
          masExtenso: town.masExtenso,
          masPoblado: town.masPoblado,
          menosExtenso: town.menosExtenso,
          nombre: town.nombre,
          rios: town.rios,
          significado: town.significado,
          sismo: town.sismo,
          superficie: town.superficie,
          vulcanismo: town.vulcanismo,
          isLoading: false,
        });
      });
  }

  fetchRiskZone() {
    let table = [];

    table.push(['Sismo', this.state.sismo !== '' ? 'Si' : 'No']);


    table.push(['Inundación', this.state.inundacion !== '' ? 'Si' : 'No']);


    table.push(['Deslave', this.state.deslave !== '' ? 'Si' : 'No']);


    table.push(['Incendio', this.state.incendio !== '' ? 'Si' : 'No']);


    table.push(['Vulcanismo', this.state.vulcanismo !== '' ? 'Si' : 'No']);


    table.push(['Derrumbe', this.state.derrumbe !== '' ? 'Si' : 'No']);

    return table;
  }

  fetchTableDta() {
    let table = [];
    if (this.state.igecem !== '') {
      table.push(['Nombre', this.state.nombre]);
    }

    if (this.state.igecem !== '') {
      table.push(['Cabecera', this.state.cabecera]);
    }

    if (this.state.igecem !== '') {
      table.push(['IGECEM', this.state.igecem]);
    }
    if (this.state.significado !== '') {
      table.push(['Significado', this.state.significado]);
    }
    if (this.state.superficie !== '') {
      table.push(['Superficie', this.state.superficie]);
    }
    if (this.state.clima !== '') {
      table.push(['Clima', this.state.clima]);
    }
    if (this.state.elevaciones !== '') {
      table.push(['Elevaciones', this.state.elevaciones]);
    }
    if (this.state.rios !== '') {
      table.push(['Rios', this.state.rios]);
    }
    if (this.state.cuerposA !== '') {
      table.push(['Cuerpo de agua', this.state.cuerposA]);
    }
    if (this.state.masExtenso !== '') {
      table.push(['Municipio más extenso', this.state.masExtenso]);
    }
    if (this.state.masPoblado !== '') {
      table.push(['Municipio más poblado', this.state.masPoblado]);
    }
    if (this.state.indust !== '') {
      table.push(['Municipio más industrializado', this.state.indust]);
    }
    return table;
  }

  onUpdateTown() {
    this.props.navigation.push('UpdateTown', {
      id: this.state.id,
      cabecera: this.state.cabecera,
      altitud: this.state.altitud,
      clima: this.state.clima,
      cuerposA: this.state.cuerposA,
      derrumbe: this.state.derrumbe,
      deslave: this.state.deslave,
      elevaciones: this.state.elevaciones,
      igecem: this.state.igecem,
      incendio: this.state.incendio,
      indust: this.state.indust,
      inundacion: this.state.inundacion,
      latitud: this.state.latitud,
      longitud: this.state.longitud,
      masExtenso: this.state.masExtenso,
      masPoblado: this.state.masPoblado,
      menosExtenso: this.state.menosExtenso,
      nombre: this.state.nombre,
      rios: this.state.rios,
      significado: this.state.significado,
      sismo: this.state.sismo,
      superficie: this.state.superficie,
      vulcanismo: this.state.vulcanismo,
    });
  }

  render() {
    this.getTownInfo();
    if (this.state.isLoading) {
      return (
        <View style={[AppStyles.container, AppStyles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>);
    }
    return (<View style={styles.container}>

      <FastImage
        style={styles.fullImage}
        source={{
          uri: this.state.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <ScrollView>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.fullImage}
          region={{
            latitude: this.state.latitud,
            longitude: this.state.longitud,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          initialRegion={{
            latitude: this.state.latitud,
            longitude: this.state.longitud,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          <Marker
            coordinate={{latitude: this.state.latitud, longitude: this.state.longitud}}
            title={this.state.cabecera}
          />
        </MapView>
        <Text style={styles.headline}>Información</Text>
        <Table borderStyle={styles.table}>
          <Rows data={this.fetchTableDta()} textStyle={styles.text}/>
        </Table>
        <Text style={styles.headline}>Riesgo</Text>
        <Table borderStyle={styles.table}>
          <Rows data={this.fetchRiskZone()} textStyle={styles.text}/>
        </Table>
      </ScrollView>
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={this.onUpdateTown}
        renderIcon={() => <Icon name="md-create" color="#FFF" size={20}/>}
      />
    </View>);
  }
}

export default TownView;