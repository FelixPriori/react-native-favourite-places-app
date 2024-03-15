import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Elevation } from "../../constants/elevation";

export default function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    text: Colors.primary50,
    ...Elevation
  },
  pressed: {
    opacity: 0.7
  },
  text: {
    textAlign: 'center',
    fontSize: 16
  }
})