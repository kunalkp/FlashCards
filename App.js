import React from "react";
import { Platform, View, StatusBar } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import AddCard from "./components/AddCard";
import { getDecks, saveDeckTitle, addCardToDeck } from "./utils/api";
import { setLocalNotification } from "./utils/helpers";

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-list-box" size={30} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
// Platform.OS === 'ios'
//   ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
//   : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Dashboard: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        title: "Flash Cards",
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    },
    IndividualDeck: {
      screen: DeckView,
      navigationOptions: ({ navigation }) => ({
        title:
          navigation.state.params && navigation.state.params.title
            ? navigation.state.params.title
            : navigation.state.routeName,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    },
    AddCardToDeck: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        title:
          navigation.state.params && navigation.state.params.title
            ? navigation.state.params.title
            : navigation.state.routeName,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    },
    StartQuiz: {
      screen: QuizView,
      navigationOptions: ({ navigation }) => ({
        title:
          navigation.state.params && navigation.state.params.title
            ? navigation.state.params.title
            : navigation.state.routeName,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    }
  })
);

export default class App extends React.Component {
  state = {
    decks: {}
  };

  addDeck = (title, callback) => {
    saveDeckTitle(title)
      .then(() => {
        this.setState(prevState => ({
          decks: {
            ...prevState.decks,
            [title]: {
              title: title,
              questions: []
            }
          }
        }));
        callback();
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Deck could not be added");
      });
  };

  addCard = (deckName, question, answer, callback) => {
    addCardToDeck(deckName, { question, answer })
      .then(() => {
        this.setState(prevState => ({
          decks: {
            ...prevState.decks,
            [deckName]: {
              ...prevState.decks[deckName],
              questions: prevState.decks[deckName].questions.concat({
                question,
                answer
              })
            }
          }
        }));
        callback();
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Card could not be added");
      });
  };

  componentDidMount() {
    setLocalNotification()
    getDecks().then(decks => {
      if (decks !== null) {
        this.setState({ decks });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <FlashcardStatusBar backgroundColor={purple} barStyle='light-content' /> */}
        <MainNavigator
          screenProps={{
            decks: this.state.decks,
            addDeck: this.addDeck,
            addCard: this.addCard
          }}
        />
      </View>
    );
  }
}
