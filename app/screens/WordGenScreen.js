import react, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  Switch,
} from "react-native";

function WordGenScreen(props) {
  const [words, setWords] = useState([]);
  const [numOfWords, setNumOfWords] = useState(3);

  const getWords = () =>
    axios
      .get(`https://random-word-api.herokuapp.com/word?number=${numOfWords}`)
      .then((res) => {
        setWords(
          res.data.map((item) => {
            return { word: item, isEnabled: false };
          })
        );
      })
      .catch((error) => Alert.alert("Oops", "error loading words"));

  useEffect(() => {
    getWords();
  }, []);

  const increase = () => {
    setNumOfWords(numOfWords + 1);
  };
  const decrease = () => {
    numOfWords <= 1
      ? Alert.alert("Oops!", "minimum, 1 word")
      : setNumOfWords(numOfWords - 1);
  };

  const remove = (word) => {
    setWords(words.filter((item) => item.word !== word.word));
  };

  const toggleSwitch = (word) => {
    setWords(
      words.map((item) => {
        return word.word === item.word
          ? { word: word.word, isEnabled: !item.isEnabled }
          : item;
      })
    );
  };

  return (
    <View>
      <Button title="button" onPress={getWords} />
      <Button title="+" onPress={increase} />
      <Text>{numOfWords}</Text>
      <Button title="-" onPress={decrease} />
      <ScrollView>
        {words?.map((word) => (
          <View>
            <Switch
              value={word.isEnabled}
              onValueChange={() => toggleSwitch(word)}
            />
            <Text key={word.word}>{word.word}</Text>
            <Button title="Remove" onPress={() => remove(word)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default WordGenScreen;
