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
  Pressable,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign"
import infoText from "./infoText";
import {RANDOM_WORD_API} from "@env"

function WordGenScreen(props) {
  const [words, setWords] = useState([]);
  const [numOfWords, setNumOfWords] = useState(3);
  const [info, setInfo] = useState(true);
  console.log(`${RANDOM_WORD_API}number=${numOfWords}`)
  const getWords = () =>
    axios
      .get(`${RANDOM_WORD_API}number=${numOfWords}`)
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
      .get(`${RANDOM_WORD_API}number=1`)
      .then((res) => {
        let newResult = words.map((item) => item);
        newResult.push({ word: res.data[0], isEnabled: false });
        setWords(newResult);
      })
      .catch((error) => Alert.alert("Oops", "error loading words"));
  };

  const showInfo = () => {
    setInfo(!info)
  }

  return (
    <View>
      {/* info button */}
      <Pressable onPress={showInfo} style={{width:20}}>
        <Icon name={'infocirlceo'} size={20} color={'blue'}/>
      </Pressable>
      {/* INFO WINDOW */}
      {info?<View style={styles.info}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Pressable onPress={showInfo} style={{position:'absolute',right:1}}>
            <Icon name={'closecircle'} size={20} color={'white'}/>
          </Pressable>
          <Text style={{color:'white', }}>Hello </Text>
        </View>
        {/* border */}
        <View style={{borderBottomColor: 'white', borderBottomWidth: 2, margin:10}}/>
        <Text style={{color:'white'}}>{infoText} </Text>
      </View>:<></>}

      {/* words list */}
      <ScrollView style={{ height: "75%" }}>
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
      
      {/* Genn Control Area */}
      <View >
        <Button title="+" onPress={increase} />
        <Text style={{ textAlign: "center" }}>{numOfWords}</Text>
        <Button title="-" onPress={decrease} />
        <Pressable style={styles.button} onPress={getWords}>
          <Text style={{ color: "white", width: "100%", textAlign: "center" }}>
            Generate Words
          </Text>
        </Pressable>
      </View>
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
  button: {
    alignSelf: "center",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "dodgerblue",
  },
  info: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'blue',
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    top:20,
    elevation:5,
    zIndex:5
  }
});
