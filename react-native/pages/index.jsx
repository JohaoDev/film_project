import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import axios from "axios";

const API = "http://192.168.10.113:5000/film/pelicula";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    axios
      .get(`${API}?estado=1`)
      .then((response) => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  asyncstorageSave = async (idpelicula) => {
    try {
      await AsyncStorage.setItem("idpelicula", idpelicula.toString());
      this.props.history.push("movie_detail");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { peliculas } = this.state;

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/bg.jpg")}
      >
        <View className="items-center">
          <View className="w-56 h-24 flex justify-center">
            <Text
              className="text-center text-white text-4xl font-bold border-b-4 border-white"
              onPress={() => this.getMovies()}
            >
              CARTELERA
            </Text>
          </View>

          <ScrollView vertical={true}>
            <View className="flex flex-row flex-wrap justify-center">
              {peliculas.map((element) => (
                <TouchableOpacity
                  key={element.id}
                  onPress={() => this.asyncstorageSave(element.id)}
                >
                  <View className="w-48 h-64">
                    <Card
                      title={element.titulo}
                      image={{ uri: `${element.imagen}` }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}