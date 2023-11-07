import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocalStorageApp() {
  const [inputText, setInputText] = useState('');
  const [storedText, setStoredText] = useState([]);
  const [textList, setTextList] = useState([]);

  useEffect(() => {
    // Carrega os textos armazenados ao iniciar o aplicativo
    loadStoredText();
  }, []);

  const loadStoredText = async () => {
    try {
      const text = await AsyncStorage.getItem('storedText');
      if (text !== null) {
        setStoredText(JSON.parse(text));
      }
    } catch (error) {
      console.error('Erro ao carregar texto armazenado: ', error);
    }
  };

  const saveText = async () => {
    try {
      const newText = [...storedText, inputText];
      await AsyncStorage.setItem('storedText', JSON.stringify(newText));
      setStoredText(newText);
      setInputText('');
    } catch (error) {
      console.error('Erro ao salvar texto: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite algo..."
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="Salvar" onPress={saveText} />
      <FlatList
        data={storedText}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>Texto armazenado: {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
