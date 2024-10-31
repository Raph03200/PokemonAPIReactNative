import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const fetchPokemon = async () => {
    setLoading(true);
    setError('');
    setPokemon(null);
    if(name != ""){
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        if (response.data.erro) {
          setError('Pokemon não encontrado.');
        } else {
          setPokemon(response.data);
        } 
      } catch (err) {
        setError('Erro ao buscar o pokemon.');
      } finally {
        setLoading(false);
      }
    }
    else {
      setError('Erro ao buscar o pokemon.');
    }
  };
 
  function pokeTypes(pokemon){
    if(pokemon.types.length > 1){
      return pokemon.types[0].type.name + ' ' + pokemon.types[1].type.name
    }
    else{
      return pokemon.types[0].type.name
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procure seu Pokemon na Pokedéx!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do pokemon"
        keyboardType="default"
        value={name.toLowerCase()}
        onChangeText={setName}
      />
      <Button title="Buscar" onPress={fetchPokemon} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}


      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : pokemon ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Nome: {pokemon.name}</Text>
          <Text style={styles.resultText}>Número na Pokedéx: #{pokemon.id}</Text>
          <Text style={styles.resultText}>Tipos: {pokeTypes(pokemon)}</Text>
          <Image style={styles.tinyLogo} source={{uri:pokemon.sprites.front_default}}></Image>
        </View>
      ) : null}
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
