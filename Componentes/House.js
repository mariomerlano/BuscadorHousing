import React from 'react';
import { Text, View, Linking, TouchableOpacity } from 'react-native';
import styles from '../Estilos/Estilos';

export default class House extends React.Component {
	constructor(props){	
        super(props);
    }
    abrirLink() {
        Linking.openURL(this.props.item.link).catch(err => console.error('An error occurred', err));
    }
    render() {
        return (
            <TouchableOpacity style={styles.agregarBordes} onPress={this.abrirLink.bind(this)}>
                <Text style={[styles.title, {alignSelf:'center'}]}>{this.props.item.titulo}</Text>
                <View style={styles.house}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>{this.props.item.personas} personas</Text>
                        <Text style={{ alignSelf:'center' }}>(${this.props.item.amountPP})</Text>
                    </View>
                    <Text>{this.props.item.precio + " " + this.props.item.moneda}</Text>
                    <View style={[styles.agregarBordes, { padding: 10, backgroundColor: "#b3d1ff" }]}>
                        <Text>{this.props.item.lugar}</Text>
                    </View>
                </View>
              
            </TouchableOpacity>
           
            );
    }
}
