import React from 'react'
import AppCard from './AppCard'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

export default ({ post, onOpen }) => {
    return (
        <TouchableNativeFeedback onPress={onOpen}>
            <AppCard style={styles.card}>
                <ImageBackground source={{ uri: post.img }} style={{ flex: 1 }}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{post.text}</Text>
                    </View>
                </ImageBackground>
            </AppCard>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0,
        borderStyle: 'solid'
    },
    titleWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5
    },
    title: {
        color: '#fff'
    }
})