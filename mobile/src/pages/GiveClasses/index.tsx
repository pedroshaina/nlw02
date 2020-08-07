import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'

export default function GiveClasses() {
    const { goBack } = useNavigation()

    function handleGoBack() {
        goBack()
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain"
                source={giveClassesBackgroundImage} 
                style={styles.content}
            >

                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>Para começar, voce precisa se cadastrar como professor em nossa plataforma web.</Text>

                <RectButton 
                    style={styles.okButton}
                    onPress={handleGoBack}
                >
                    <Text style={styles.okButtonText}>Tudo bem</Text>
                </RectButton>
            </ImageBackground>
        </View>
    )
}