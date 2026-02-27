import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BookOpen, Lock, Mail } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const router = useRouter();
    const { t } = useLanguage();

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        try {
            // Check the public.users table for the matching email and password
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email.toLowerCase())
                .eq('password', password)
                .single();

            if (error || !data) {
                throw new Error('Invalid email or password');
            }

            // Success: Save user data and session
            await AsyncStorage.setItem('mockSession', 'true');
            await AsyncStorage.setItem('userData', JSON.stringify(data));

            // Redirect based on whether they've been seen before
            const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
            if (hasOnboarded === 'true') {
                router.replace('/(tabs)');
            } else {
                router.replace('/(onboarding)');
            }
        } catch (error: any) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    }

    async function signUpWithEmail() {
        router.push('/signup');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BookOpen stroke="#1976d2" size={60} style={{ marginBottom: 12 }} />
                <Text style={styles.title}>Pathly</Text>
                <Text style={styles.subtitle}>Your Career, Verified.</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Mail color="#1976d2" size={20} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder={t('email')}
                        placeholderTextColor="#aaa"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Lock color="#1976d2" size={20} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        placeholder={t('password')}
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Signing In...' : t('sign_in')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonOutline} onPress={signUpWithEmail} disabled={loading}>
                    <Text style={styles.buttonOutlineText}>{t('sign_up')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.guestButton}
                    onPress={() => router.replace('/(onboarding)')}
                >
                    <Text style={styles.guestButtonText}>Try as Guest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 30,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0d47a1',
    },
    subtitle: {
        fontSize: 16,
        color: '#1976d2',
        marginTop: 4,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f9ff',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e1efff',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#1976d2',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
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
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonOutlineText: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 16,
    },
    guestButton: {
        marginTop: 16,
        padding: 12,
        alignItems: 'center',
    },
    guestButtonText: {
        color: '#666',
        fontSize: 15,
        fontWeight: '500',
    }
});
