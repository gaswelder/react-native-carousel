import React from "react";
import { Alert, Button, View } from "react-native";
import { Carousel, Friction } from "./src/react-native-carousel";

const range = n =>
  Array(n)
    .fill(0)
    .map((zero, i) => i);

export default function HomeScreen(props) {
  return (
    <React.Fragment>
      <Carousel friction={Friction.gold}>
        <Lots of="Gold" />
      </Carousel>
      <Carousel friction={Friction.silver}>
        <Lots of="Silver" />
      </Carousel>
      <Carousel friction={Friction.glass}>
        <Lots of="Glass" />
      </Carousel>
      <Carousel friction={Friction.oil}>
        <Lots of="Oil" />
      </Carousel>
    </React.Fragment>
  );
}

function Lots(props) {
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      {range(12).map(i => (
        <View key={i} style={{ width: 100 }}>
          <Button
            title={props.of + "-" + i}
            onPress={() => Alert.alert(props.of + "-" + i)}
          />
        </View>
      ))}
    </View>
  );
}
