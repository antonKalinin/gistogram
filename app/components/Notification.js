import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    Notification: {
        position: 'absolute',
        width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Notification_top: {
        top: 70,
    },
    Notification_middle: {
        top: height / 2,
    },
    Notification_bottom: {
        top: height - 70,
    },
    Notification__bubble: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: '#000',
    },
    Notification__text: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 8,
        fontSize: 12,
    },
});

const FADE_ANIM_DURATION = 400;

type PropsType = {
    notification: any,
};

class Notification extends Component<PropsType> {
    constructor(props) {
        super(props);

        this.timer = null;
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps || !nextProps.notification) {
            return;
        }

        const {notification} = nextProps;
        const fadeToValue = (toValue = 0) => {
            Animated
                .timing(this.state.fadeAnim, {toValue, duration: FADE_ANIM_DURATION})
                .start();
        };

        fadeToValue(0.8);

        if (!isNaN(notification.duration) && notification.duration >= FADE_ANIM_DURATION * 2) {
            this.timer = setTimeout(fadeToValue, notification.duration - FADE_ANIM_DURATION * 2);
        }
    }

    render() {
        const {notification} = this.props;

        if (!notification || !notification.text) {
            return null;
        }

        return (
            <Animated.View
                style={[
                    styles.Notification,
                    styles[`Notification_${notification.position || 'bottom'}`],
                    {opacity: this.state.fadeAnim},
                ]}
            >
                <View style={styles.Notification__bubble}>
                    <Text style={styles.Notification__text}>{notification.text}</Text>
                </View>
            </Animated.View>
        );
    }
}


export default connect(state => ({
    notification: state.ui.notification,
}))(Notification);
