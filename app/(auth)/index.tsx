import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function signInWithEmail() {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            await AsyncStorage.setItem('mockSession', 'true');
            router.replace('/(onboarding)');
        }, 800);
        /*
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        // If there is an error but it's not real, we will mock navigation for MVP if needed,
        // but here we wait for real Auth. If Supabase fails due to wrong keys, let's allow "Guest" login.
        if (error) {
            Alert.alert('Sign In Failed', error.message + '\n\nContinuing as Guest for MVP.', [
                { text: 'OK', onPress: () => router.replace('/(onboarding)') }
            ]);
        } else {
            router.replace('/(onboarding)');
        }
        */
    }

    async function signUpWithEmail() {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            await AsyncStorage.setItem('mockSession', 'true');
            router.replace('/(onboarding)');
        }, 800);
        /*
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            Alert.alert('Sign Up Failed', error.message + '\n\nContinuing as Guest for MVP.', [
                { text: 'OK', onPress: () => router.replace('/(onboarding)') }
            ]);
        } else {
            Alert.alert('Check your email for the login link!');
            router.replace('/(onboarding)');
        }
        */
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BookOpen stroke="#1976d2" size={64} style={{ marginBottom: 20 }} />
                <Text style={styles.title}>Your Career Roadmap</Text>
                <Text style={styles.subtitle}>Discover paths that match your passion.</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email address"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#888"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonOutline} onPress={signUpWithEmail} disabled={loading}>
                    <Text style={styles.buttonOutlineText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.replace('/(onboarding)')}>
                    <Text style={styles.guestText}>Continue as Guest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8faff',
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0d47a1',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#1976d2',
        marginTop: 8,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#bbdefb',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#1976d2',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderColor: '#1976d2',
        borderWidth: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonOutlineText: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 16,
    },
    guestText: {
        color: '#0d47a1',
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    }
});
