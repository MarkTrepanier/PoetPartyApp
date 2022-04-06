import react, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";

function WordGenScreen(props) {
  const [words, setWords] = useState([]);
  const [numOfWords, setNumOfWords] = useState(3);
  useEffect(() => {
    const getWords = () =>
      axios
        .get(`https://random-word-api.herokuapp.com/word?number=${numOfWords}`)
        .then((res) => {
          setWords(res.data, res.data.length);
        })
        .catch((error) => Alert.alert("error loading words"));
    getWords();
  }, []);

  return (
    <ScrollView>
      {words?.map((word) => (
        <Text key={word}>{word}</Text>
      ))}
    </ScrollView>
  );
}

export default WordGenScreen;
