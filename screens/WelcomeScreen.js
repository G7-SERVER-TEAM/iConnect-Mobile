import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // After 4 seconds, navigate to the next screen
            navigation.navigate('Login');
        }, 4000);

        // Clear the timeout if the component unmounts or if navigation occurs before the timeout
        return () => {
            setIsLoading(false); // Reset loading state to false if navigating before timeout
            clearTimeout(timeoutId);
        };
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require('../assets/images/WelcomePicture.png')} style={{ width: 250, height: 250 }} />
                </View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: themeColors.text, fontSize: 50, margin: 20 }}>
                    iConnect
                </Text>
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity
                        disabled={true} // Disable the button
                        style={{
                            paddingVertical: 15,
                            paddingHorizontal: 10,
                            margin: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        {isLoading ? (
                            <LottieView
                                source={require('../assets/animations/loading.json')} // replace with your Lottie animation file
                                autoPlay
                                loop
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        ) : <Text>.....</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
