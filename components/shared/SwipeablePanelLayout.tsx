// SwipeablePanelLayout.tsx
import { colors } from '@/utils/baseStyles';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

type Props = {
  expandedHeight?: number;
  collapsedHeight?: number;
  topPanel: React.ReactNode;
  bottomPanel: React.ReactNode;
};

const SwipeablePanelLayout = ({
  expandedHeight = 0.8 * windowHeight,
  collapsedHeight = 0.3 * windowHeight,
  topPanel,
  bottomPanel,
}: Props) => {
  const bottomHeight = useRef(new Animated.Value(expandedHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (_, gestureState) => {
        // 👇 Dismiss the keyboard first
        Keyboard.dismiss();

        if (gestureState.dy > 50) {
          Animated.spring(bottomHeight, {
            toValue: collapsedHeight,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy < -50) {
          Animated.spring(bottomHeight, {
            toValue: expandedHeight,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {/* Top Panel */}
      <View style={{ flex: 1 }}>{topPanel}</View>

      {/* Bottom Panel */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomPanel,
          {
            height: bottomHeight,
          },
        ]}
      >
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        <View style={styles.bottomContent}>{bottomPanel}</View>
      </Animated.View>
    </View>
  );
};

export default SwipeablePanelLayout;

const styles = StyleSheet.create({
  bottomPanel: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
  bottomContent: {
    flex: 1,

    padding: 20
  },
});
