import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions, Image, } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.25;


export default class hubcenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempoCronometro: 0.0,
      rodando: false,
      ultimoTempo: '',
      idCronometro: null,
      statusBotao: 'Iniciar'
    };

    this.iniciaCronometro = this.iniciaCronometro.bind(this);

  }

  iniciaCronometro() {
    if (!this.state.rodando) {
      // Inicia o cronômetro
      let idCronometro = setInterval(() => {
        this.setState(prevState => ({
          tempoCronometro: Math.ceil((prevState.tempoCronometro + 0.1) * 10) / 10
        }));
      }, 100);

      this.setState({
        rodando: true,
        idCronometro: idCronometro,
        statusBotao: 'Parar'
      });
    } else {
      // Para o cronômetro
      clearInterval(this.state.idCronometro);

      this.setState({
        rodando: false,
        ultimoTempo: this.state.tempoCronometro.toFixed(1), 
        tempoCronometro: 0.0,
        idCronometro: null,
        statusBotao: 'Iniciar'
      });
    }
  }


  render() {
    return (

      <View style={styles.container}>

        <Image source={require('./src/cronometro.png')} style={styles.img}></Image>

        <Text style={styles.texto}>
          {this.state.tempoCronometro}
        </Text>

        <TouchableOpacity style={styles.botao} onPress={this.iniciaCronometro}>
          <View>
            <Text style={styles.botaoTexto}>
              {this.state.statusBotao}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.texto}>
          Último tempo:
        </Text>

        <Text style={styles.textoUltimoTempo}>
          {this.state.ultimoTempo}
        </Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    margin: 10,
  },
  input: {
    marginTop: 50,
    height: 45,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    color: '#eee', width: screenWidth * 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },

  texto: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 50,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoUltimoTempo: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 2,
    color: '#eee',
    fontWeight: 'bold'
  },
  botao: {
    margin: 30,
    width: buttonWidth,
    height: buttonWidth,
    backgroundColor: 'transparent',
    borderColor: '#eee',
    borderWidth: 1,
    color: '#eee',
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

/*
flexDirection: 'column',
justifyContent:'center'
*/ 