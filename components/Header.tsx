import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.logo}>ARMORS</Text>
      <Link href={"/explore"} asChild>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchTxt}>Пошук</Text>
          <Ionicons name="search-outline" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    paddingBottom: 10,
    // marginBottom: 10,
    gap: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.black,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchTxt: {
    color: Colors.gray,
  },
});
