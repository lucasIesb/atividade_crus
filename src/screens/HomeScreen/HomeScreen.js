import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const loadAlunos = async () => {
      try {
        const alunosData = await AsyncStorage.getItem('alunos');
        if (alunosData !== null) {
          setAlunos(JSON.parse(alunosData));
        }
      } catch (error) {
        console.error('Erro ao carregar alunos: ', error);
      }
    };
    
    // Atualiza a lista de alunos quando a página é carregada
    loadAlunos();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Alunos Cadastrados:</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            Nome: {item.nome}, Peso: {item.peso}, Altura: {item.altura}
          </Text>
        )}
      />
      <Button
        title="cadastrar novo"
        onPress={() => navigation.navigate('Alunos')}
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
});

export default HomeScreen;

