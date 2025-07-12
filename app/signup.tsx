import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import InputField from "@/components/InputField";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const SignUpScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Створити акаунт",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <InputField
          placeholder="Електронна пошта"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField
          placeholder="Пароль"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
        />
        <InputField
          placeholder="Підтвердьте пароль"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Зареєструватися</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
            flexWrap: "wrap",
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.loginTxt}>Вже маєте обліковий запис? </Text>
          <TouchableOpacity
            onPress={() => {
              router.dismissAll();
              router.push("/signin");
            }}
          >
            <Text style={styles.loginTxtSpan}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  inputField: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    borderRadius: 5,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },

  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 20,
    marginTop: 20,
  },
});
