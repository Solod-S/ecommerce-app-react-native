import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SocialLoginButtons = () => {
  return (
    <View style={styles.socialLoginWrapper}>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={"/signin"} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={25} color={Colors.white} />
            <Text style={styles.btnText}>Увійти по email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      {/* <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("./../assets/images/google-logo.png")}
            style={{ width: 20, height: 20, borderRadius: 20 }}
          />
          <Text style={styles.btnText}>Google-вхід</Text>
        </TouchableOpacity>
      </Animated.View> */}

      {/* <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text style={styles.btnText}>Apple-вхід</Text>
        </TouchableOpacity>
      </Animated.View> */}
    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    // padding: 10,
    // borderColor: Colors.gray,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    marginTop: hp(4),
    padding: 15,
    backgroundColor: "black",
    borderRadius: 99,
  },
  btnText: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: "outfit",
    fontSize: wp(5),
  },
});
