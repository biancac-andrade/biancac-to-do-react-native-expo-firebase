import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { auth } from "../config";

const Add = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [form, setForm] = React.useState({
    birthDay: "",
  });

  // const handleForm = (key, value) => {
  //   setForm((currentForm) => ({
  //     ...currentForm,
  //     [key]: value,
  //   }));
  // };

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(navigation.navigate("Login Screen"))
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, description, date } = doc.data();
        todos.push({
          id: doc.id,
          heading,
          description,
          date,
        });
      });
      setTodos(todos);
      //console.log(users)
    });
  }, []);

  const addTodo = () => {
    if (
      (addData && addData.length > 0) ||
      (addDescription && addDescription.length > 0)
    ) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        description: addDescription,
        date: form,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          setAddDescription("");
          setForm("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Add description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(description) => setAddDescription(description)}
          value={addDescription}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <MaskedTextInput
          mask="99/99/9999"
          placeholder="MM/DD/YYYY"
          onChangeText={(date) => setForm("birthDay", date)}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "column",
    height: 200,
    marginLeft: 50,
    marginRight: 40,
    marginTop: 120,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },

  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  containerButton: {
    alignItems: "flex-end",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
});

export default Add;
