import React from "react";
import { FlatList, Image, View, Text, ScrollView } from "react-native";
import axios from "axios";
import {
  Button,
  Card,
  Paragraph,
  Searchbar,
  Surface,
  Title,
} from "react-native-paper";
import { COLOR } from "../pallet";

export default class FoodSearch extends React.Component {
  state = {
    searchTerm: "",
    data: [],
  };
  getData = () => {
    axios
      .request({
        method: "GET",
        url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
        params: { ingr: this.state.searchTerm },
        headers: {
          "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
          "X-RapidAPI-Key":
            "260a9302d4msh609bc87b86a7f23p155185jsn400074edb05a",
        },
      })
      .then((response) => {
        console.log(response.data.hints);
        this.setState({
          data: response.data.hints,
        });
      });
  };
  render() {
    return (
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => {
            this.setState({
              searchTerm: text,
            });
          }}
          value={this.state.searchTerm}
        />
        <Button
          style={{
            padding: 15,
            margin: 5,
          }}
          color={COLOR.PRIMARY_LIGHT}
          mode="contained"
          onPress={() => {
            this.getData();
          }}
        >
          Search
        </Button>
        <FlatList
          style={{ height: 600 }}
          data={this.state.data}
          renderItem={({ item }) => {
            let data = item.food;
            return (
              <Card
                style={{
                  margin: 5,
                }}
              >
                <Card.Title title={`${data.label} (${data.category}`} />
                <Card.Content>
                  <Paragraph>CHOCDF: {data.image}</Paragraph>
                  <Paragraph>CHOCDF: {data.nutrients.CHOCDF}</Paragraph>
                  <Paragraph>ENERC_KCAL: {data.nutrients.ENERC_KCAL}</Paragraph>
                  <Paragraph>FAT: {data.nutrients.FAT}</Paragraph>
                  <Paragraph>FIBTG: {data.nutrients.FIBTG}</Paragraph>
                  <Paragraph>PROCNT: {data.nutrients.PROCNT}</Paragraph>
                </Card.Content>
                {data.image !== undefined ? (
                  <Card.Cover source={{ uri: data.image }} />
                ) : null}
              </Card>
            );
          }}
        />
      </View>
    );
  }
}
