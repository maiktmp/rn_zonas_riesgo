import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Info from '../list_view/data';
import firebase from 'react-native-firebase';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';

const styles = StyleSheet.create({
  fullImage: {
    height: 300,
    width: Dimensions.get('window').width,
  },
  container: {backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
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
    this.ref = firebase.firestore().collection('municipios');

    this.state = {
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
        });
      });
  }

  fetchTableDta() {
    let table = [];
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

  render() {
    this.getTownInfo();
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
      <Text style={styles.headline}>Información</Text>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Rows data={this.fetchTableDta()} textStyle={styles.text}/>
      </Table>
    </View>);
  }
}

export default TownView;