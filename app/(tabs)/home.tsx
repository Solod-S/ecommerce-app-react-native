import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { CategoryType, ProductType } from "@/types/type";
import axios from "axios";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/products`;

      const response = await axios.get(URL);

      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getProducts`, error);
    }
  };

  const getCategories = async () => {
    try {
      const URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/categories`;
      const response = await axios.get(URL);

      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getCategories`, error);
    }
  };

  const getSaleProducts = async () => {
    try {
      const URL = `${process.env.EXPO_PUBLIC_SERVER_URL}/saleProducts`;
      const response = await axios.get(URL);

      setSaleProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getSaleProducts`, error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([getProducts(), getCategories(), getSaleProducts()]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#fff",
        }}
      >
        <Categories categories={categories} />
        <FlashSale products={saleProducts} />
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Image
            source={require("@/assets/images/sale-banner.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 15 }}
          />
        </View>
        <ProductList products={products} flatList={false} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
