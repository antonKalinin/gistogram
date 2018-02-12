import React from 'react';
import {StyleSheet, Animated, View} from 'react-native';

import GhIcon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});

const Loading = (props) => {
    const opacity = new Animated.Value(0);
    Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    return (
        <Animated.View
            style={[styles.container, {opacity}]}
        >
            <GhIcon name="mark-github" color="#FFF" size={60} />
        </Animated.View>
    );
};

export default Loading;
