import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import styles from './Estilos/Estilos';
import House from './Componentes/House';

import cheerio from './node_modules/cheerio-without-node-native';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listaHouses: []
        };
    }

    buscarPagina() {
        const searchUrl = "http://www.campingunquehue.com.ar/es/index.php";
        const response = fetch(searchUrl);  // fetch page 
        response.then((value) => {
            const htmlString = value.text; // get response text
            const $ = cheerio.load(htmlString);
            alert(value.text);
        }       // parse HTML string
        );

    }

    cargarHouses() {
        var aux = this.state.lista;
        if (aux.length !== 0) {
            return aux.map((value, index) =>
                <House item={value} key={index}/>
            );
        }
        return (
            <Text style={styles.texto}>No hay elementos cargados</Text>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.agregarBordes}>
                    <House item={item1} />
                    <House item={item1} />
                    <House item={item1} />
              </ScrollView>
          </View>
      );
    }
}

const item = {
    checkIn: "",
    checkOut: "",
    nombre: "",
    lugar: "",
    precio: ""
};

const item1 = {
    checkIn: "15/08/1996",
    checkOut: "20/08/1997",
    nombre: "Agusto",
    lugar: "Breckenridge",
    precio: "1920"
};

