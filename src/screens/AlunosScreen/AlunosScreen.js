import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput, Button as PaperButton, Provider, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AlunosScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const cadastrarAluno = async () => {
    try {
      const novoAluno = { nome, peso, altura };
      const alunosData = await AsyncStorage.getItem('alunos');
      const alunos = alunosData ? JSON.parse(alunosData) : [];
      alunos.push(novoAluno);
      await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao cadastrar aluno: ', error);
    }
  }

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Cadastro de Aluno" />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          label="Peso"
          value={peso}
          onChangeText={text => setPeso(text)}
        />
        <TextInput
          label="Altura"
          value={altura}
          onChangeText={text => setAltura(text)}
        />
        <PaperButton
          mode="contained"
          onPress={cadastrarAluno}
          style={{ marginTop: 20 }}
        >
          Cadastrar Aluno
        </PaperButton>
      </View>
    </Provider>
  );
}

export default AlunosScreen;


