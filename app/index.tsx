import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function IndexScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAppLaunch();
    }, []);

    const checkAppLaunch = async () => {
        try {
            // const { data: { session } } = await supabase.auth.getSession();
            const session = await AsyncStorage.getItem('mockSession');
            const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');

            if (session === 'true') {
                if (hasOnboarded === 'true') {
                    router.replace('/(tabs)');
                } else {
                    router.replace('/(onboarding)');
                }
            } else {
                router.replace('/(auth)');
            }
        } catch (e) {
            console.error('Error checking launch:', e);
            router.replace('/(auth)');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1976d2" />
                <Text style={styles.loadingText}>Loading Career Dashboard...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Redirecting...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#1976d2',
        fontFamily: 'System', // Fallback to system fonts
    },
});
