import React from "react";
import { PanResponder, View } from "react-native";
import { inertia } from "./physics";
import { Wheel } from "./Wheel";

export class Carousel extends React.Component {
  state = {
    x: 0
  };
  startX = 0;

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.startX = this.state.x;
    },
    onPanResponderMove: (evt, gestureState) => {
      this.setState({ x: this.startX - gestureState.dx });
    },
    onPanResponderRelease: (evt, gestureState) => {
      inertia(
        gestureState.dx,
        gestureState.vx,
        (this.props.friction || 1) / 100,
        info => {
          this.setState({ x: this.startX + info.x });
        }
      );
    }
  });

  render() {
    return (
      <View {...this.panResponder.panHandlers}>
        <Wheel scrollPos={this.state.x}>{this.props.children}</Wheel>
      </View>
    );
  }
}
