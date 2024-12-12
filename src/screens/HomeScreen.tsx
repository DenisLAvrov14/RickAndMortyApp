import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { fetchCharacters } from "../api/rickAndMortyApi";

const HomeScreen = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    loadCharacters();
  }, [page]);

  const loadCharacters = async () => {
    try {
      if (page === 1) setLoading(true);
      else setIsLoadingMore(true);

      const data = await fetchCharacters(page);
      setCharacters((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
    } catch (error) {
      console.error("Error loading characters:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await loadCharacters();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      default:
        return "gray";
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 10 }} size="small" />;
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={() => setPage((prev) => prev + 1)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomeScreen;
