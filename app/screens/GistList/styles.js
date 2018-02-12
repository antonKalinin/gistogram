import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 25,
    },
    header: {
        backgroundColor: 'transparent',
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    menu: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        backgroundColor: 'transparent',
        marginTop: 5,
        marginBottom: 15,
        color: '#fff',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    footer: {
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
    },
    gistList: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginBottom: 25,
        borderRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowColor: '#222',
        shadowOffset: {height: 2, width: 0},
        overflow: 'hidden',
    },
    gistItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#aaa',
    },
    gistItem_first: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    gistItem_last: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    gistItemTitle: {
        fontSize: 15,
        fontWeight: '700',
        paddingBottom: 7,
    },
    gistItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gistItemCreatedAt: {
        color: '#777',
    },
    gistItemVisibility: {
        color: '#777',
    },
    empty: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 28,
        backgroundColor: 'transparent',
        color: '#fff',
        textShadowOffset: {height: 0.3, width: 0},
        textShadowColor: '#222',
        textShadowRadius: 2,
    },
    editGistButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4568DC',
    },
    deleteGistButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B06AB3',
    },
});