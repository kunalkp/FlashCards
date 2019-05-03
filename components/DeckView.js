import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { black, gray } from "../utils/colors";

class DeckView extends Component {
  render() {
    const { title, questions } = this.props.screenProps.decks[
      this.props.navigation.state.params.deckName
    ];
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{questions.length} Cards</Text>
        </View>
        <View style={styles.buttonSection}>
          <Button
            onPress={() =>
              this.props.navigation.navigate("AddCardToDeck", {
                deckName: this.props.navigation.state.params.deckName,
                title: "Add Card"
              })
            }
            title="Add Card"
            color="#f26f28"
          />
          <Button
            onPress={() =>
              this.props.navigation.navigate("StartQuiz", {
                deckName: this.props.navigation.state.params.deckName,
                title: "Start Quiz"
              })
            }
            title="Start Quiz"
            color="#f26f28"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: "center",
    padding: 12
  },
  subtitle: {
    color: gray,
    fontSize: 16,
    textAlign: "center",
    padding: 5
  },
  buttonSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 80,
    justifyContent: "space-around"
  }
});

export default DeckView;