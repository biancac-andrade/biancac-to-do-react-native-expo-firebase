import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../config";

const Detail = () => {
  const todoRef = firebase.firestore().collection("todos");
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [form, setForm] = React.useState({
    birthDay: "",
  });
  const navigation = useNavigation();
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

  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("Deleted successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(navigation.navigate("Login Screen"))
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          style={{}}
          data={todos}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.containerTask}>
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
              <FontAwesome
                name="edit"
                color="red"
                onPress={() => navigation.navigate("Editor", { item })}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
                <Text style={styles.itemHeading}>{item.description}</Text>
                <Text style={styles.itemHeading}>{item.date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#0de065",
  },
  containerTask: {
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
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  formContainer: {
    alignItems: "flex-end",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Detail;
