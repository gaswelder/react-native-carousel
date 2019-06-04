import React from "react";
import { View, ScrollView } from "react-native";

export class Wheel extends React.Component {
  state = {
    contentSize: undefined
  };

  render() {
    const { scrollPos, children, width = 300 } = this.props;
    const { contentSize } = this.state;

    // Measure the content first.
    if (!contentSize) {
      return (
        <ScrollView
          horizontal
          onContentSizeChange={(w, h) => this.setState({ contentSize: [w, h] })}
          style={{ flexGrow: 0 }}
        >
          {children}
        </ScrollView>
      );
    }

    const i = Math.ceil(scrollPos / contentSize[0]);
    const j = Math.ceil((scrollPos + width) / contentSize[0]);

    const gens = [];
    for (let k = i - 1; k <= j + 1; k++) {
      gens.push(k);
    }

    return (
      <View
        style={{
          height: contentSize[1],
          width,
          overflow: "hidden"
        }}
      >
        {gens.map(function(gen) {
          const left = gen * contentSize[0] - scrollPos;
          return (
            <View
              key={`${gen}`}
              style={{ left: left, top: 0, position: "absolute" }}
            >
              {children}
            </View>
          );
        })}
      </View>
    );
  }
}
