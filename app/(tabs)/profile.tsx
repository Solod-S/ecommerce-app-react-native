import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import useAuthStore from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const isIphone = Platform.OS === "ios";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuthStore();
  console.log(`user`, user);

  const handleLogout = () => {
    Vibration.vibrate(200); // Vibrate for 100ms before showing the Alert
    Alert.alert("Logout?", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            setLoading(true);
            await logout();
          } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

            const formattedMessage = errorCode
              .replace("auth/", "")
              .replace(/-/g, " ");
            // .replace(/\b\w/g, char => char.toUpperCase());
            if (isIphone) {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Login Failed",
                text2: formattedMessage,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
              });
            } else {
              ToastAndroid.show(formattedMessage, ToastAndroid.LONG);
            }
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.userName}> {user?.fullName} </Text>
          <Image
            source={
              user?.photoURL
                ? {
                    uri: user?.photoURL,
                  }
                : require("@/assets/images/ava.png")
            }
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.userName}> {user?.email} </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="person-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Your Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="heart-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Your Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="gift-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Reward Points</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={Colors.black}
            />
            <Text style={styles.buttonText}>Customer Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="pencil-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="settings-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          {loading ? (
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={handleLogout}
            >
              <Loading color="white" size={hp(3)} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={hp(3)}
                color={Colors.white}
              />
              <Text style={styles.buttonLogoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "space-between",
  },
  userName: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.black,
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
  buttonLogout: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(3),
    padding: 15,
    backgroundColor: "black",
    borderRadius: 99,
  },
  buttonLogoutText: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: "outfit",
    fontSize: wp(5),
  },
});
