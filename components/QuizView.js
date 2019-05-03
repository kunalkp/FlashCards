import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { black, white, lightPurp, blue } from "../utils/colors";
import CardFlip from "react-native-card-flip";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

class QuizView extends Component {
  state = {
    questions: [],
    questionCounter: 0,
    score: 0,
    viewAnswer: false
  };

  componentDidMount() {
    this.setState({
      questions: this.props.screenProps.decks[
        this.props.navigation.state.params.deckName
      ].questions
    });
    clearLocalNotification().then(setLocalNotification)
  }

  flipCard = () => {
    this.setState(prevState => ({
      viewAnswer: !prevState.viewAnswer
    }));
  };

  handleAnswer = correct => {
    if (correct) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }));
    }
    if (this.state.viewAnswer) {
      this.card.flip();
    }
    this.setState(prevState => ({
      questionCounter: prevState.questionCounter + 1,
      viewAnswer: false
    }));
  };

  render() {
    const questionCounter = this.state.questionCounter;
    const quizLength = this.state.questions.length;
    return (
      <View style={styles.container}>
        {this.state.questionCounter < this.state.questions.length ? (
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.counter}>
              {questionCounter}/{quizLength}
            </Text>
            <View style={styles.quizContainer}>
              <CardFlip
                style={styles.cardContainer}
                ref={card => (this.card = card)}
              >
                <TouchableOpacity
                  style={[styles.card, styles.flipHide]}
                  onPress={() => {
                    this.card.flip();
                    this.flipCard();
                  }}
                >
                  <Text style={styles.cardText}>
                    {this.state.questions[this.state.questionCounter].question}
                  </Text>
                  <Text style={styles.hint}>Tap for Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.card, styles.flipShow]}
                  onPress={() => {
                    this.card.flip();
                    this.flipCard();
                  }}
                >
                  <Text style={styles.cardText}>
                    {this.state.questions[this.state.questionCounter].answer}
                  </Text>
                  <Text style={styles.hint}>Tap for Question</Text>
                </TouchableOpacity>
              </CardFlip>
            </View>
            <View style={styles.buttonSection}>
              <Button
                onPress={() => this.handleAnswer(true)}
                title="Correct"
                color="#008000"
              />
              <Button
                onPress={() => this.handleAnswer(false)}
                title="Incorrect"
                color="#FF0000"
              />
            </View>
          </View>
        ) : (
          <View style={{ flexGrow: 1 }}>
            {this.state.questions.length === 0 ? (
              <View style={[styles.quizContainer, { flexGrow: 1 }]}>
                <Text style={styles.title}>No Cards available. Please add cards to play quiz !!!</Text>
              </View>
            ) : (
              <View style={{ flexGrow: 1 }}>
                <View style={[styles.quizContainer, { flexGrow: 1 }]}>
                  <Text style={styles.title}>
                    You scored {this.state.score}/{this.state.questions.length}
                  </Text>
                  <Text style={styles.title}>
                    Percentage -{" "}
                    {(this.state.score / this.state.questions.length) * 100}%
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  counter: {
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20
  },
  buttonSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
    justifyContent: "space-around"
  },
  quizContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    width: 320,
    height: 350
  },
  card: {
    width: 320,
    height: 320,
    backgroundColor: lightPurp,
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  flipHide: {
    backgroundColor: lightPurp
  },
  flipShow: {
    backgroundColor: blue
  },
  cardText: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "System",
    color: white
  },
  hint: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "System",
    color: white
  }
});

export default QuizView;
