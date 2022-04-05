import react, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";

function WordGenScreen(props) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const getWords = () =>
      axios
        .get("https://random-word-api.herokuapp.com/word?number=10")
        .then((res) => setWords(res.data) || console.log(res))
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
