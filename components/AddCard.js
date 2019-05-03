import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { orange } from "../utils/colors";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  resetData = () => {
    this.setState({ question: "", answer: "" });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          style={styles.textInput}
          value={this.state.question}
          placeholder="Question"
          onChangeText={text => this.setState({ question: text })}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.answer}
          placeholder="Answer"
          onChangeText={text => this.setState({ answer: text })}
        />
        <View style={styles.buttonSection}>
          <Button
            onPress={() =>
              this.props.screenProps.addCard(
                this.props.navigation.state.params.deckName,
                this.state.question,
                this.state.answer,
                this.resetData
              )
            }
            title="Submit"
            color="#f26f28"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "30%"
  },
  textInput: {
    borderColor: orange,
    borderWidth: 1,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  buttonSection: {
    alignItems: "center",
    marginTop: 40
  }
});

export default AddCard;
