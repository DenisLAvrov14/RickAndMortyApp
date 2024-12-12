import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import CharacterCard from "../components/characterCard/CharacterCard";
import ErrorView from "../components/errorView/ErrorView";
import { fetchCharacters } from "../api/rickAndMortyApi";

const HomeScreen = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    loadCharacters();
  }, [page]);

  const loadCharacters = async () => {
    try {
      setError(null); 
      if (page === 1) setLoading(true);
      else setIsLoadingMore(true);

      const data = await fetchCharacters(page);
      setCharacters((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    } catch (err) {
      setError("Failed to load characters. Please try again.");
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

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 10 }} size="small" />;
  };

  if (error) {
    return <ErrorView message={error} onRetry={() => loadCharacters()} />;
  }

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
      renderItem={({ item }) => <CharacterCard character={item} />}
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
});

export default HomeScreen;
