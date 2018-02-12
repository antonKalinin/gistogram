import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
    button: {
        marginBottom: 25,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#ae1484',
        borderRadius: 20,
        shadowOpacity: 0.9,
        shadowRadius: 10,
        shadowColor: '#680c4f',
        shadowOffset: {height: 5, width: 0},
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 2,
        textAlign: 'center',
        textShadowOffset: {height: 0.2, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
});

const ShadowButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.text}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

export default ShadowButton;
