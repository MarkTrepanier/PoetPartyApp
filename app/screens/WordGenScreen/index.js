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
import {RANDOM_WORD_API, WORD_DEF_API, DEF_HOST, DEF_KEY} from "@env"

function WordGenScreen(props) {
  const [words, setWords] = useState([]);
  const [numOfWords, setNumOfWords] = useState(3);
  const [info, setInfo] = useState(true);
  const [defWindow, setDefWindow]= useState(false);
  const [def, setDef] = useState("no definition found")


  //todo add define/setdefine useState and define window connected to words-api. connect words api with .env
  const getDefinition = (word) =>{
    axios.get(`${WORD_DEF_API}${word}/definitions`,{
          headers: {
            'X-RapidAPI-Host':DEF_HOST,
            'X-RapidAPI-Key':DEF_KEY
          }
         }).then(res=>{setDef(`${word}: ${res.data.definitions[0].definition}`)})
         .catch(()=>setDef(`${word}: sorry, definition not found`))
  }
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

  // useEffect(() => {
  //   getWords();
  // }, []);

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

  const addWord = async () => {
    axios
      .get(`${RANDOM_WORD_API}number=1`)
      .then((res) => {
        let newResult = words.map((item) => item);
        newResult.push({ word: res.data[0], isEnabled: false });
        setWords(newResult);
      })
      .catch((error) => Alert.alert("Oops", "error loading words"));
      console.log(words)
  };

  const toggleInfo = () => {
    setInfo(!info)
  }

  const toggleDef = () => {
    setDefWindow(!defWindow)
  }

  const handleDef = (word)=>{
    toggleDef()
    getDefinition(word)
  }

  return (
    <View>
      {/* info button */}
      <Pressable onPress={toggleInfo} style={{width:20}}>
        <Icon name={'infocirlceo'} size={20} color={'blue'}/>
      </Pressable>
      {/* INFO WINDOW */}
      {info?<View style={styles.info}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Pressable onPress={toggleInfo} style={{position:'absolute',right:1}}>
            <Icon name={'closecircle'} size={20} color={'white'}/>
          </Pressable>
          <Text style={{color:'white', }}>Hello </Text>
        </View>
        {/* border */}
        <View style={{borderBottomColor: 'white', borderBottomWidth: 2, margin:10}}/>
        <Text style={{color:'white'}}>{infoText} </Text>
      </View>:<></>}

      {defWindow?<View style={styles.info}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Pressable onPress={toggleDef} style={{position:'absolute',right:1}}>
            <Icon name={'closecircle'} size={20} color={'white'}/>
          </Pressable>
          <Text style={{color:'white', }}>definition</Text>
        </View>
        {/* border */}
        <View style={{borderBottomColor: 'white', borderBottomWidth: 2, margin:10}}/>
        <Text style={{color:'white'}}>{def} </Text>
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
            <Pressable onPress={()=>handleDef(word.word)} style={{width:20, position: "absolute", right:100,top:15}}>
              <Icon name={'questioncircleo'} size={20} color={'blue'}/>
            </Pressable>
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
    borderRadius:10,
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