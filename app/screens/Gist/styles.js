import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        marginTop: 10,
    },
    headerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    headerButtonText: {
        padding: 5,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    markdown: {
        flex: 1,
    },
    info: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    text: {
        padding: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        backgroundColor: 'transparent',
        marginTop: 5,
        marginBottom: 10,
        color: '#fff',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    attributes: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    date: {
        flex: 1,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    secret: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    secretIcon: {
        backgroundColor: 'transparent',
    },
});
