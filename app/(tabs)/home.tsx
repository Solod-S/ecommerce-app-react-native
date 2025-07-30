import Categories from "@/components/Categories";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { CategoryType, ProductType } from "@/types/type";
import axios from "axios";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const URL = `http://192.168.0.158:8000/products`;
      const response = await axios.get(URL);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getProducts`, error);
    }
  };

  const getCategories = async () => {
    try {
      const URL = `http://192.168.0.158:8000/categories`;
      const response = await axios.get(URL);

      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getCategories`, error);
    }
  };

  const getSaleProducts = async () => {
    try {
      const URL = `http://192.168.0.158:8000/saleProducts`;
      const response = await axios.get(URL);

      setSaleProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(`error in getSaleProducts`, error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    // getSaleProducts();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        // backgroundColor: Colors.white,
        flex: 1,
      }}
      edges={["top", "bottom"]}
    >
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView>
        <Categories categories={categories} />
        {/* <FlashSale products={saleProducts} /> */}
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Image
            source={require("@/assets/images/sale-banner.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 15 }}
          />
        </View>
        <ProductList products={products} flatList={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
