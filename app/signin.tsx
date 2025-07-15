import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import CustomKeyboardView from "@/components/CustomKeyboardView";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import useAuthStore from "@/store/useAuthStore";

const isIphone = Platform.OS === "ios";

const SignInScreen = () => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onLoginWithEmailAndPassword = async () => {
    try {
      if (!email || !password) {
        if (isIphone) {
          Toast.show({
            onPress: () => Toast.hide(),
            type: "error",
            position: "top",
            text1: "Вхід не вдався",
            text2: "Будь ласка, заповніть всі поля",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 50,
          });
        } else {
          ToastAndroid.show(
            "Будь ласка, введіть електронну пошту та пароль",
            ToastAndroid.LONG
          );
        }
        return;
      }
      setLoading(true);
      const { success } = await login(email.trim(), password);
      if (success) {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      switch (errorCode) {
        case "auth/invalid-credential":
          if (isIphone) {
            Toast.show({
              onPress: () => Toast.hide(),
              type: "error",
              position: "top",
              text1: "Вхід не вдався",
              text2: "Невірні дані для входу",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show("Невірні дані для входу", ToastAndroid.LONG);
          }
          break;

        case "auth/weak-password":
          if (isIphone) {
            Toast.show({
              onPress: () => Toast.hide(),
              type: "error",
              position: "top",
              text1: "Вхід не вдався",
              text2: "Пароль має містити щонайменше 6 символів",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show(
              "Пароль має містити щонайменше 6 символів",
              ToastAndroid.LONG
            );
          }
          break;

        case "auth/invalid-email":
          if (isIphone) {
            Toast.show({
              onPress: () => Toast.hide(),
              type: "error",
              position: "top",
              text1: "Вхід не вдався",
              text2: "Некоректна електронна пошта",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show("Некоректна електронна пошта", ToastAndroid.LONG);
          }
          break;

        default:
          const formattedMessage = errorCode
            .replace("auth/", "")
            .replace(/-/g, " ");
          if (isIphone) {
            Toast.show({
              onPress: () => Toast.hide(),
              type: "error",
              position: "top",
              text1: "Вхід не вдався",
              text2: formattedMessage,
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show(formattedMessage, ToastAndroid.LONG);
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <StatusBar style="dark" />
      <CustomKeyboardView>
        <View style={{ padding: 25 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(500).springify()}
            style={{
              marginTop: 15,
              fontFamily: "outfit-bolt",
              fontSize: hp(3.5),
            }}
          >
            Увійдіть до свого акаунту
          </Animated.Text>

          {/* Email */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: hp(2) }}>Електронна пошта</Text>
            <TextInput
              onChangeText={value => setEmail(value)}
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Введіть електронну пошту"
            />
          </View>

          {/* Password */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: hp(2) }}>Пароль</Text>
            <TextInput
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Введіть пароль"
            />
          </View>
          <View
            style={{ marginTop: 10, display: "flex", alignItems: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() => {
                router.dismissAll();
                router.push("/restorePassword");
              }}
            >
              <Text style={{ fontSize: hp(2), color: "gray" }}>
                Відновити пароль
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {/* Sign In  Btn*/}
            {loading ? (
              <View
                style={{
                  marginTop: hp(3),
                  padding: 15,
                  backgroundColor: "black",
                  borderRadius: 99,
                }}
              >
                <Loading color="white" size={hp(3.2)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => onLoginWithEmailAndPassword()}
                style={{
                  marginTop: hp(3),
                  padding: 15,
                  backgroundColor: "black",
                  borderRadius: 99,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.white,
                    fontFamily: "outfit",
                    fontSize: wp(5),
                  }}
                >
                  Увійти
                </Text>
              </TouchableOpacity>
            )}

            {/* Create Account Btn*/}
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
              <Text style={styles.loginTxt}>Ще не маєте акаунту? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.dismissAll();
                  router.push("/signup");
                }}
              >
                <Text style={styles.loginTxtSpan}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: hp(1.8),
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
  },
  placeholder: {
    color: "#D3D3D3",
  },
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
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default SignInScreen;
