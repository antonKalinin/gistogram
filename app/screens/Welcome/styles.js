import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        backgroundColor: 'transparent',
        marginTop: 60,
        marginBottom: 15,
        color: '#fff',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    about: {
        flexGrow: 1,
    },
    aboutText: {
        fontSize: 24,
        color: '#FFF',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    footer: {
        marginBottom: 40,
        alignItems: 'center',
    },
});
