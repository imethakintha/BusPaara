import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';

import routesData from '../../data/bus-routes.json';

interface RouteInfo {
  name: string;
  stops: string[];
}

export default function App() {
  const [input, setInput] = useState('');

  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const handleSearch = () => {
    Keyboard.dismiss();

    const route = (routesData as { [key: string]: RouteInfo })[input];
    if (route) {
      setRouteInfo(route);
    } else {
      setRouteInfo(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bus Paara (බස් පාර)</Text>
        <Text style={styles.subtitle}>Enter a route number to find its path</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g., 138"
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {routeInfo ? (
        <View style={styles.resultContainer}>
          <Text style={styles.routeName}>{input}: {routeInfo.name}</Text>
          <FlatList
            data={routeInfo.stops}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.stopItem}>
                 <Text style={styles.stopNumber}>{index + 1}.</Text>
                 <Text style={styles.stopText}>{item}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>Please enter a route number and search.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50, 
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  button: {
    marginLeft: 10,
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  routeName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  stopItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  stopNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginRight: 10,
  },
  stopText: {
    fontSize: 18,
    color: '#555',
    flex: 1, 
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 18,
    color: '#888',
  },
});