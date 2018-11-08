import { Platform, StyleSheet } from 'react-native';
import { Constants } from 'expo';
const color = 'skyblue';
const align = Platform.OS === "android" ? 'flex-end' : 'center';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight:'bold',
        backgroundColor: color,
        alignSelf: 'center'
    },
    texto: {
        fontSize: 20,
        alignSelf: 'center'
    },
    house: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    agregarBordes: {
        borderWidth: 1,
        borderRadius: 4
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: Constants.statusBarHeight * 2,
        paddingBottom: Constants.statusBarHeight
    }
});