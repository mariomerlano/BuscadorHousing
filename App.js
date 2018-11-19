import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import styles from './Estilos/Estilos';
import House from './Componentes/House';

import cheerio from './node_modules/cheerio-without-node-native';
import htmlparser2 from './node_modules/htmlparser2-without-node-native';
import Moment from 'moment';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.buscarTrivago = this.buscarTrivago.bind(this)
        this.buscarCookiesTrivago = this.buscarCookiesTrivago.bind(this)
        this.parsearItemTrivago = this.parsearItemTrivago.bind(this)
        //this.cambiarUSDTrivago = this.cambiarUSDTrivago.bind(this)
        this.state = {
            listaHouses: [],
            checkin: Moment('2018-12-08'),
            checkout: Moment('2018-12-15'),
        };

        //Moment().add(1, "day").format('ll')
    }

    componentDidMount() {
        this.actualizarLista();

            /*var option = {
                xml: {
                    normalizeWhitespace: true
                }
            };
            console.log(value);
            const dom = htmlparser2.parseDOM(value, option);
            const $ = cheerio.load(dom);
            var lista = $("itemdrop");
            this.setState({
                listaHouses: lista
            }); Descomentar para manejar html con cheerio*/
    }

    parsearItemAirBNB(itemCrudo, checkIn, checkOut) {
        //console.log(itemCrudo.listing.name);
        var personasx = itemCrudo.listing.person_capacity;
        var id = itemCrudo.listing.id;
        var amount = itemCrudo.pricing_quote.price.total.amount;
        var precio = itemCrudo.pricing_quote.price.total.amount_formatted;
        return {
            titulo: itemCrudo.listing.name,
            lugar: itemCrudo.listing.city,
            personas: personasx,
            amount: amount, //Precio sin formatear para poder ordenar
            amountPP: Math.round(amount / personasx), //Amount per person
            precio: precio,
            moneda: itemCrudo.pricing_quote.price.total.currency,
            link: `https://www.airbnb.com.ar/rooms/${id}?adults=${personasx}&children=0&infants=0&guests=${personasx}&toddlers=0&check_in=${checkIn}&check_out=${checkOut}`
        };
    }

    parsearItemTrivago(rawItem) {
        return {
            titulo: rawItem.name,
            lugar: rawItem.distance.pathName,
            personas: 4,
            amount: rawItem.deals.bestPrice.displayPrice, //Precio sin formatear para poder ordenar
            amountPP: Math.round(rawItem.deals.bestPrice.displayPrice / (4*35)), //Amount per person
            precio: "$" + Math.round(rawItem.deals.bestPrice.displayPrice / 35),
            moneda: "USD [TRIVAGO]", //currencyCode es la moneda; en realidad estan en argentinos pero lo ponemos villa
            link: rawItem.homepageLink
        };
    }

    async buscarBNB(personas, checkIn, checkOut, moneda) {
        var link = `https://www.airbnb.com.ar/api/v2/explore_tabs?version=1.3.9&satori_version=1.1.0&_format=for_explore_search_web&experiences_per_grid=20&items_per_grid=10000&guidebooks_per_grid=20&auto_ib=false&fetch_filters=true&has_zero_guest_treatment=false&is_guided_search=true&is_new_cards_experiment=true&luxury_pre_launch=true&query_understanding_enabled=true&show_groupings=true&supports_for_you_v3=true&timezone_offset=-180&client_session_id=ed748e8f-b462-45a5-b75b-51961e10e464&metadata_only=false&is_standard_search=true&refinement_paths%5B%5D=%2Fhomes&selected_tab_id=home_tab&checkin=${checkIn}&checkout=${checkOut}&adults=${personas}&children=0&infants=0&guests=${personas}&toddlers=0&allow_override%5B%5D=&zoom=11&search_by_map=true&sw_lat=39.29977556422909&sw_lng=-106.35805457945469&ne_lat=39.667175182838164&ne_lng=-105.74762672300938&s_tag=sDTmh-LR&screen_size=medium&query=Breckenridge%2C%20Colorado%2C%20Estados%20Unidos&_intents=p1&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&currency=${moneda}&locale=es-419`;
        const response = await fetch(link);
        return await response.json();
    }

    async buscarCookiesTrivago(offset) {
        
        var checkin = this.state.checkin.format("YYYY-MM-DD");
        var checkout = this.state.checkout.format("YYYY-MM-DD");

        var link = `https://www.trivago.com.ar/search/region?iPathId=34329&bDispMoreFilter=false&aDateRange%5Barr%5D=${checkin}&aDateRange%5Bdep%5D=${checkout}&aCategoryRange=0%2C1%2C2%2C3%2C4%2C5&iRoomType=9&aRooms%5B0%5D%5Badults%5D=4&sOrderBy=relevance%20desc&aPartner=&aOverallLiking=1%2C2%2C3%2C4%2C5&iOffset=${offset}&iLimit=25&iIncludeAll=0&bTopDealsOnly=false&iViewType=0&aPriceRange%5Bto%5D=0&aPriceRange%5Bfrom%5D=0&aPathList=34329&aGeoCode%5Blng%5D=-106.046227&aGeoCode%5Blat%5D=39.498184&bIsSeoPage=false&aHotelTestClassifier=&bSharedRooms=false&bIsSitemap=false&rp=&cpt=3432903&iFilterTab=0`;
        const response = fetch(link, {
            credentials: "include"
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Cookies seteadas");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    async buscarTrivago(offset) {
        //this.buscarCookiesTrivago(offset); //falta ajustar las fechas al check in y al check out (state)
        var checkin = this.state.checkin.format("YYYY-MM-DD");
        var checkout = this.state.checkout.format("YYYY-MM-DD");
                var link = `https://www.trivago.com.ar/search/region?iPathId=34329&bDispMoreFilter=false&aDateRange%5Barr%5D=${checkin}&aDateRange%5Bdep%5D=${checkout}&aCategoryRange=0%2C1%2C2%2C3%2C4%2C5&iRoomType=9&aRooms%5B0%5D%5Badults%5D=4&sOrderBy=relevance%20desc&aPartner=&aOverallLiking=1%2C2%2C3%2C4%2C5&iOffset=${offset}&iLimit=25&iIncludeAll=0&bTopDealsOnly=false&iViewType=0&aPriceRange%5Bto%5D=0&aPriceRange%5Bfrom%5D=0&aPathList=34329&aGeoCode%5Blng%5D=-106.046227&aGeoCode%5Blat%5D=39.498184&bIsSeoPage=false&aHotelTestClassifier=&bSharedRooms=false&bIsSitemap=false&rp=&cpt=3432903&iFilterTab=0`;
                const response = await fetch(link, {
                    credentials: "include"
                });
                //this.cambiarUSDTrivago();
                return await response.json();
    }

    cambiarUSDTrivago() { //no se llama nunca por ahora
        var checkin = this.state.checkin.format("YYYY-MM-DD");
        var checkout = this.state.checkout.format("YYYY-MM-DD");
        //const urls = ["www.trivago.com.ar/search/rpc/currency/USD.html", "https://www.trivago.com.ar/search/region?iPathId=34329&bDispMoreFilter=false&aDateRange%5Barr%5D=2018-12-08&aDateRange%5Bdep%5D=2018-12-15&aCategoryRange=0%2C1%2C2%2C3%2C4%2C5&iRoomType=9&aRooms%5B0%5D%5Badults%5D=4&sOrderBy=relevance%20desc&aPartner=&aOverallLiking=1%2C2%2C3%2C4%2C5&iOffset=0&iLimit=25&iIncludeAll=0&bTopDealsOnly=false&iViewType=0&aPriceRange%5Bto%5D=0&aPriceRange%5Bfrom%5D=0&aPathList=34329&aGeoCode%5Blng%5D=-106.046227&aGeoCode%5Blat%5D=39.498184&bIsSeoPage=false&aHotelTestClassifier=&bSharedRooms=false&bIsSitemap=false&rp=&cpt=3432903&iFilterTab=0"]; 
        const urls = [
            'www.trivago.com.ar/search/rpc/currency/USD.html',
            `https://www.trivago.com.ar/search/region?iPathId=34329&bDispMoreFilter=false&aDateRange%5Barr%5D=${checkin}&aDateRange%5Bdep%5D=${checkout}&aCategoryRange=0%2C1%2C2%2C3%2C4%2C5&iRoomType=9&aRooms%5B0%5D%5Badults%5D=4&sOrderBy=relevance%20desc&aPartner=&aOverallLiking=1%2C2%2C3%2C4%2C5&iOffset=0&iLimit=25&iIncludeAll=0&bTopDealsOnly=false&iViewType=0&aPriceRange%5Bto%5D=0&aPriceRange%5Bfrom%5D=0&aPathList=34329&aGeoCode%5Blng%5D=-106.046227&aGeoCode%5Blat%5D=39.498184&bIsSeoPage=false&aHotelTestClassifier=&bSharedRooms=false&bIsSitemap=false&rp=&cpt=3432903&iFilterTab=0`
        ];
        
        var consultasParalelas = async function() {
            try {
                var data = await Promise.all(urls.map(url => fetch(url, {
                    credentials: "include"
                })));
            } catch (err) {
                console.error(err);
            }
            console.log(data);
        }
    }

    cargarHouses() {
        var aux = this.state.listaHouses;
        if (aux.length !== 0) {
            return aux.map((value, index) =>
                <House item={value} key={index} />
            );
        }
    }

    formatDate(date) {
        var moment = Moment(date);
        moment.locale('es');
        return moment.format('ll'); 
    }

    diaSiguiente() {
        this.setState({
            checkin: this.state.checkin.add(1, "day"),
            checkout: this.state.checkout.add(1, "day"),
            listaHouses: []
        });
        this.actualizarLista();
    }

    actualizarLista() {
        var moneda = "USD";
        var checkin = this.state.checkin.format("YYYY-MM-DD");
        var checkout = this.state.checkout.format("YYYY-MM-DD");
            this.buscarBNB(4, checkin, checkout, moneda).then(value => {
                var lista;
                var housings = value.explore_tabs[0].sections[1].listings;
                if (housings === undefined) {// Hay veces que las houses vienen en section[0]
                    housings = value.explore_tabs[0].sections[0].listings;
                }
                var listaAirBNB = housings.map(x => this.parsearItemAirBNB(x));
        
            var listaTotal = [];
            for (var i = 0; i < 10; i++) { 
                var iterator = i*25;
                this.buscarTrivago(iterator).then(valueTri => {
                    var listaTrivago = valueTri.items.map(x => this.parsearItemTrivago(x));
                    console.log(listaTrivago.length);
                    listaTotal = listaAirBNB.concat(listaTrivago);
                    //this.setState({listaHouses: listaAirBNB.concat(listaTrivago)});
                    this.setState({listaHouses: listaTotal.sort((a, b) => a.amountPP >= b.amountPP)}); //Ordena por precio
                    //console.log(this.state.listaHouses.map(x => x.titulo + " => " + x.moneda));
                    //console.log(this.state.listaHouses.map(x => x.lugar + " " + x.amountPP));
                });
            }

            }); 

    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.listaHouses.length === 0 ? <ActivityIndicator style={styles.container} size="large" color="#0000ff" /> : null}
                <View style={[styles.header, styles.agregarBordes, { backgroundColor: '#99ffeb' }]}>
                    <Text style={styles.texto}>{this.formatDate(this.state.checkin)} </Text>
                    <Text style={styles.texto}>----></Text>
                    <TouchableOpacity onPress={this.diaSiguiente.bind(this)}>
                        <Text style={styles.texto}>{this.formatDate(this.state.checkout)}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.cargarHouses()}
                </ScrollView>
          </View>
      );
    }
}

const item = {
    titulo: "",
    lugar: "",
    personas: "",
    link:"",
    precio: "",
    moneda: "",
    fuente:""
};



