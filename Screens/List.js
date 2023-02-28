import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config";

const AddList = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
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
        const { heading } = doc.data();
        todos.push({
          id: doc.id,
          heading,
        });
      });
      setTodos(todos);
      //console.log(users)
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Add");
          }}
        >
          <Text style={styles.buttonText}>+ Tarefas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{}}
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate("Detail")}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
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
});

export default AddList;
