import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { orange, black } from "../utils/colors";

class AddDeck extends React.Component {
  state = {
    deckName: ""
  };

  navigateToDeck = () => {
    const deckName = this.state.deckName;
    this.setState({ deckName: "" });
    this.props.navigation.navigate("IndividualDeck", {
      deckName: deckName,
      title: this.props.screenProps.decks[deckName].title
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          value={this.state.deckName}
          placeholder="Deck Title"
          onChangeText={text => this.setState({ deckName: text })}
        />
        <View style={styles.loginButtonSection}>
          <Button
            onPress={() =>
              this.props.screenProps.addDeck(
                this.state.deckName,
                this.navigateToDeck
              )
            }
            style={styles.loginButton}
            title="Create Deck"
            color="#f26f28"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: black,
    fontSize: 24,
    textAlign: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  textInput: {
    borderColor: orange,
    borderWidth: 1,
    padding: 10,
    margin: 30
  },
  loginButtonSection: {
    width: "100%",
    height: "30%",
    alignItems: "center"
  },
  loginButton: {
    padding: 50
  }
});

export default AddDeck;