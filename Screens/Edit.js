import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { auth } from "../config";

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  const [textDescription, onChangeDescriptionText] = useState(
    route.params.item.description
  );
  const [textDate, onChangeDateText] = useState(route.params.item.date, {
    birthDay: "",
  });
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
          description: textDescription,
          date: textDate,
        })
        .then(() => {
          navigation.navigate("Detail");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
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
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update Text"
      />
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeDescriptionText}
        value={textDescription}
        placeholder="Update Description"
      />
      <MaskedTextInput
        mask="99/99/9999"
        placeholder="MM/DD/YYYY"
        onChangeText={onChangeDateText}
        keyboardType="numeric"
        style={styles.textfield}
      />
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateTodo();
        }}
      >
        <Text>UPDATE USER</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
