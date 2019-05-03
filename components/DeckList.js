import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { gray, orange } from "../utils/colors";

export default class DeckList extends React.Component {
  navigateToDeck = (key, title) => {
    this.props.navigation.navigate("IndividualDeck", {
      deckName: key,
      title: title
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(this.props.screenProps.decks).map(key => ({
            key: this.props.screenProps.decks[key].title,
            title: this.props.screenProps.decks[key].title,
            questions: this.props.screenProps.decks[key].questions
          }))}
          renderItem={({ item }) => (
            <View style={[styles.deck]}>
              <TouchableOpacity
                onPress={() => this.navigateToDeck(item.key, item.title)}
              >
                <View>
                  <Text style={styles.deckTitle}>{item.title}</Text>
                  <Text style={styles.deckSubtitle}>
                    {item.questions.length} cards
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deck: {
    borderTopColor: "#cccccc",
    borderTopWidth: 1,
    paddingBottom: 18,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18
  },
  deckTitle: {
    fontSize: 20,
    paddingBottom: 3,
    color: orange
  },
  deckSubtitle: {
    color: gray
  }
});
