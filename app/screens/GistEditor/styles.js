import {StyleSheet} from 'react-native';

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
    title: {
        fontSize: 34,
        fontWeight: '700',
        backgroundColor: 'transparent',
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 10,
        color: '#FFF',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    form: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    params: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    visibilityButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        padding: 10,
        backgroundColor: 'rgba(8, 17, 45, 0.35)',
    },
    visibilityButtonText: {
        paddingLeft: 5,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
    filename: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});
