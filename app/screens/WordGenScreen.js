import { useState, useEffect } from "react";
import axios from "axios";
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

  const addWord = () => {
    axios
      .get(`https://random-word-api.herokuapp.com/word?number=1`)
      .then((res) => {
        let newResult = words.map((item) => item);
        newResult.push({ word: res.data[0], isEnabled: false });
        setWords(newResult);
      })
      .catch((error) => Alert.alert("Oops", "error loading words"));
  };

  return (
    <View>
      <ScrollView style={{ height: "80%" }}>
        {words?.map((word) => (
          <View style={styles.word} key={word.word}>
            <Switch
              value={word.isEnabled}
              onValueChange={() => toggleSwitch(word)}
            />
            <Text>{word.word}</Text>
            <Button title="Remove" onPress={() => remove(word)} />
          </View>
        ))}
        <Button title="add word" onPress={addWord} />
      </ScrollView>
      <Button title="+" onPress={increase} />
      <Text>{numOfWords}</Text>
      <Button title="-" onPress={decrease} />
      <Button
        accessibilityRole="radio"
        title="Generate Words"
        onPress={getWords}
      />
    </View>
  );
}

export default WordGenScreen;

const styles = StyleSheet.create({
  word: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
