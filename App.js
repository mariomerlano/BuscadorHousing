import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import cheerio from './node_modules/cheerio-without-node-native';


export default class App extends React.Component {

  buscarPagina() {
    const searchUrl = "http://www.campingunquehue.com.ar/es/index.php";
    const response = fetch(searchUrl);  // fetch page 
    response.then((value)=>
    { 
    const htmlString = value.text; // get response text
    const $ = cheerio.load(htmlString);
    alert(value.text);
    }       // parse HTML string
    );
   
  }

    render() {
      return (
        <View>
        {this.buscarPagina()}
        </View>
      );
    }
}







/*



async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  const response = await fetch(searchUrl);   // fetch page

  const htmlString = await response.text();  // get response text
}

async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  const response = await fetch(searchUrl);      // fetch page 

  const htmlString = await response.text();     // get response text
  const $ = cheerio.load(htmlString);           // parse HTML string

  const liList = $("#s-results-list-atf > li"); // select result <li>s
}




export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
