import CustomKeyboardView from "@/components/CustomKeyboardView";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import useAuthStore from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
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

export default function RestorePassword() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const { resetPassword } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      if (!email) {
        Toast.show({
          onPress: () => Toast.hide(),
          type: "info",
          position: "top",
          text2: "Будь ласка, заповніть всі поля",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        return;
      }
      setIsLoading(true);
      const { success } = await resetPassword(email.trim());

      if (success) router.replace("emailReset");
    } catch (error) {
      Toast.show({
        onPress: () => Toast.hide(),
        type: "error",
        position: "top",
        text1: "Помилка",
        text2: "Сталася помилка при відновленні паролю.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View style={{ padding: 25 }}>
          <View>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Animated.Text
              entering={FadeInDown.delay(100).duration(500).springify()}
              style={{
                marginTop: 15,
                fontFamily: "outfit-bolt",
                fontSize: hp(3.5),
              }}
            >
              Відновлення паролю
            </Animated.Text>

            <View style={{ marginTop: 40, gap: 8 }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "bold",
                  color: "#4B5563",
                }}
              >
                Електронна пошта
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={styles.placeholder.color}
                style={styles.input}
                placeholder="Введіть електронну пошту"
              />
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            {isLoading ? (
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
              <View>
                <TouchableOpacity
                  onPress={handleLogin}
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
                    Відновити
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </CustomKeyboardView>
      <Toast />
    </SafeAreaView>
  );
}

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
});
