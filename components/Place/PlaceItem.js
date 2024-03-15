import { Image, Text, View, Pressable, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"
import { Elevation } from "../../constants/elevation"

export function PlaceItem({ id, title, imageUri, address, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, id)}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    ...Elevation
  },
  pressed: {
    opacity: 0.9
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700
  },
  address: {
    fontSize: 12,
    color: Colors.gray700
  }
})