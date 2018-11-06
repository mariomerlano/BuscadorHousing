import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../Estilos/Estilos';

export default class House extends React.Component {
	constructor(props){	
		super(props);
	}
    render() {
        return (
            <View style={[styles.agregarBordes, { padding: 30 }]}>
                <Text>Lugar: {this.props.item.lugar}</Text>
                <Text>Nombre: {this.props.item.nombre}</Text>
                <Text>Precio: {this.props.item.precio}</Text>
                <Text>Check In: {this.props.item.checkIn}</Text>
                <Text>Check Out: {this.props.item.checkOut}</Text>
            </View>
           
            );
    }
}
