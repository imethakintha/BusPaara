import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import routesData from '../../data/bus-routes.json';

const { width, height } = Dimensions.get('window');

interface RouteInfo {
  name: string;
  stops: string[];
}

export default function BusPaaraApp() {
  const [input, setInput] = useState('');
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!input.trim()) {
      Alert.alert('Error', 'Please enter a route number');
      return;
    }
    
    Keyboard.dismiss();
    setIsSearching(true);
    
    setTimeout(() => {
      const route = (routesData as { [key: string]: RouteInfo })[input];
      if (route) {
        setRouteInfo(route);
      } else {
        setRouteInfo(null);
        Alert.alert('Route Not Found', `No route found for "${input}". Please try a different route number.`);
      }
      setIsSearching(false);
    }, 800);
  };

  const renderStop = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.stopContainer}>
      <View style={styles.stopNumberContainer}>
        <LinearGradient
          colors={['#3B82F6', '#8B5CF6']}
          style={styles.stopNumber}
        >
          <Text style={styles.stopNumberText}>{index + 1}</Text>
        </LinearGradient>
      </View>
      <View style={styles.stopContent}>
        <Text style={styles.stopText}>{item}</Text>
      </View>
      {index < (routeInfo?.stops.length || 0) - 1 && (
        <View style={styles.connectionLine} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <View style={styles.busIcon}>
              <Text style={styles.busIconText}>🚌</Text>
            </View>
            <Text style={styles.title}>Bus Paara</Text>
          </View>
          <Text style={styles.sinhalaTitle}>බස් පාර</Text>
          <Text style={styles.subtitle}>Enter a route number to find its path</Text>
        </View>
      </LinearGradient>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g., 138"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={input}
              onChangeText={setInput}
              maxLength={10}
            />
            <Text style={styles.inputIcon}>🔍</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.searchButton, isSearching && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={isSearching}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isSearching ? ['#9CA3AF', '#6B7280'] : ['#3B82F6', '#8B5CF6']}
              style={styles.searchButtonGradient}
            >
              {isSearching ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.searchButtonText}>Search</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultsSection}>
        {routeInfo ? (
          <View style={styles.resultsContainer}>
            
            <LinearGradient
              colors={['#10B981', '#3B82F6']}
              style={styles.routeHeader}
            >
              <View style={styles.routeHeaderContent}>
                <Text style={styles.busIconSmall}>🚌</Text>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeNumber}>Route {input}</Text>
                  <Text style={styles.routeName}>{routeInfo.name}</Text>
                </View>
              </View>
            </LinearGradient>

            
            <View style={styles.stopsHeader}>
              <Text style={styles.mapIcon}>📍</Text>
              <Text style={styles.stopsTitle}>Bus Stops</Text>
            </View>

            
            <FlatList
              data={routeInfo.stops}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderStop}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.stopsList}
            />
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIcon}>
              <Text style={styles.emptyStateIconText}>🚌</Text>
            </View>
            <Text style={styles.emptyStateTitle}>Ready to Search</Text>
            <Text style={styles.emptyStateSubtitle}>
              Enter a route number above to find its stops and path
            </Text>
          </View>
        )}
      </View>

      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Find your bus route easily with Bus Paara</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  busIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  busIconText: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  sinhalaTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -15,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 18,
    color: '#1F2937',
  },
  inputIcon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  searchButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  searchButtonGradient: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  routeHeader: {
    padding: 20,
  },
  routeHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIconSmall: {
    fontSize: 24,
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  routeName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  stopsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mapIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  stopsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  stopsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stopContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    position: 'relative',
  },
  stopNumberContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  stopNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 12,
    marginTop: 4,
  },
  stopText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  connectionLine: {
    position: 'absolute',
    left: 19,
    top: 45,
    width: 2,
    height: 25,
    backgroundColor: '#3B82F6',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    margin: 20,
    padding: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#DBEAFE',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyStateIconText: {
    fontSize: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});