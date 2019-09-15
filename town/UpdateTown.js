import React from 'react';
import {View, ScrollView, Text, Button, ActivityIndicator} from 'react-native';
import AppStyles from '../styles/AppStyles';
import {TextField} from 'react-native-material-textfield';
import ToggleSwitch from 'toggle-switch-react-native';
import firebase from 'react-native-firebase';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class UpdateTown extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdateTown = this.onUpdateTown.bind(this);
    this.state = {
      isLoading: false,
      id: this.props.navigation.getParam('id'),
      image: this.props.navigation.getParam('image'),
      altitud: this.props.navigation.getParam('altitud'),
      cabecera: this.props.navigation.getParam('cabecera'),
      clima: this.props.navigation.getParam('clima'),
      cuerposA: this.props.navigation.getParam('cuerposA'),
      derrumbe: this.props.navigation.getParam('derrumbe'),
      deslave: this.props.navigation.getParam('deslave'),
      elevaciones: this.props.navigation.getParam('elevaciones'),
      igecem: this.props.navigation.getParam('igecem'),
      incendio: this.props.navigation.getParam('incendio'),
      indust: this.props.navigation.getParam('indust'),
      inundacion: this.props.navigation.getParam('inundacion'),
      latitud: this.props.navigation.getParam('latitud'),
      longitud: this.props.navigation.getParam('longitud'),
      masExtenso: this.props.navigation.getParam('masExtenso'),
      masPoblado: this.props.navigation.getParam('masPoblado'),
      menosExtenso: this.props.navigation.getParam('menosExtenso'),
      nombre: this.props.navigation.getParam('nombre'),
      rios: this.props.navigation.getParam('rios'),
      significado: this.props.navigation.getParam('significado'),
      sismo: this.props.navigation.getParam('sismo'),
      superficie: this.props.navigation.getParam('superficie'),
      vulcanismo: this.props.navigation.getParam('vulcanismo'),
    };
  }

  onUpdateTown() {
    this.setState({isLoading: true});
    const doc = firebase
      .firestore()
      .collection('municipios')
      .doc(this.state.id);

    doc.update({
      altitud: this.state.altitud,
      cabecera: this.state.cabecera,
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
    })
      .then(() => {
        this.setState({isLoading: false});
        console.log('Document successfully updated!');
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[AppStyles.container, AppStyles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>);
    }
    return (
      <View style={AppStyles.container}>
        <ScrollView>
          <Text style={AppStyles.headline}> Localización </Text>
          <MapView
            style={AppStyles.fullImage}
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
            <Marker draggable
                    coordinate={{latitude: this.state.latitud, longitude: this.state.longitud}}
                    onDragEnd={(e) => this.setState({
                      latitud: e.nativeEvent.coordinate.latitude,
                      longitud: e.nativeEvent.coordinate.longitude,
                    })}
            />
          </MapView>
          <Text style={AppStyles.headline}> Datos principales </Text>
          <TextField
            label='Nombre'
            value={this.state.nombre}
            onChangeText={(nombre) => this.setState({nombre: nombre})}
          />

          <TextField
            label='Significado'
            value={this.state.significado}
            onChangeText={(significado) => this.setState({significado: significado})}
          />

          <TextField
            label='Cabecera Municipal'
            value={this.state.cabecera}
            onChangeText={(cabecera) => this.setState({cabecera: cabecera})}
          />

          <TextField
            label='Superficie(km2)'
            value={this.state.superficie}
            onChangeText={(superficie) => this.setState({superficie: superficie})}
          />

          <TextField
            label='Altitud'
            value={this.state.altitud}
            onChangeText={(altitud) => this.setState({altitud: altitud})}
          />

          <TextField
            label='Clima'
            value={this.state.clima}
            onChangeText={(clima) => this.setState({clima: clima})}
          />

          <TextField
            label='Elevaciónes'
            value={this.state.elevaciones}
            onChangeText={(elevaciones) => this.setState({elevaciones: elevaciones})}
          />

          <TextField
            label='Rios'
            value={this.state.rios}
            onChangeText={(rios) => this.setState({rios: rios})}
          />

          <TextField
            label='Cuerpos de Agua'
            value={this.state.cuerposA}
            onChangeText={(cuerposA) => this.setState({cuerposA: cuerposA})}
          />


          <TextField
            label='Población'
            value={this.state.masPoblado}
            onChangeText={(masPoblado) => this.setState({masPoblado: masPoblado})}
          />

          <TextField
            label='Extensión'
            value={this.state.masExtenso}
            onChangeText={(masExtenso) => this.setState({masExtenso: masExtenso})}
          />

          <TextField
            label='Industrializado'
            value={this.state.indust}
            onChangeText={(indust) => this.setState({indust: indust})}
          />

          <Text style={AppStyles.headline}> Riesgos </Text>

          <ToggleSwitch
            isOn={this.state.inundacion !== ''}
            onColor="green"
            offColor="red"
            label="Inundación"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({inundacion: isOn ? 'Si' : ''})}
          />

          <ToggleSwitch
            isOn={this.state.deslave !== ''}
            onColor="green"
            offColor="red"
            label="Deslave"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({deslave: isOn ? 'Si' : ''})}
          />


          <ToggleSwitch
            isOn={this.state.sismo !== ''}
            onColor="green"
            offColor="red"
            label="Zona sísmica"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({sismo: isOn ? 'Si' : ''})}
          />


          <ToggleSwitch
            isOn={this.state.incendio !== ''}
            onColor="green"
            offColor="red"
            label="Incendio forestal"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({incendio: isOn ? 'Si' : ''})}
          />

          <ToggleSwitch
            isOn={this.state.vulcanismo !== ''}
            onColor="green"
            offColor="red"
            label="Zona volcánica"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({vulcanismo: isOn ? 'Si' : ''})}
          />

          <ToggleSwitch
            isOn={this.state.derrumbe !== ''}
            onColor="green"
            offColor="red"
            label="Derrumbes"
            labelStyle={{color: 'black', fontWeight: '900', marginBottom: 10}}
            size="small"
            onToggle={isOn => this.setState({derrumbe: isOn ? 'Si' : ''})}
          />
          <Button style={{margin: 10}} title={'Actualizar'} onPress={this.onUpdateTown}/>
        </ScrollView>
      </View>);
  }
}

export default UpdateTown;