import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height,
        paddingTop: 15,
    },
});

const GradientContainer = (props) => {
    return (
        <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.container}>
            {props.children}
        </LinearGradient>
    );
};

export default GradientContainer;
