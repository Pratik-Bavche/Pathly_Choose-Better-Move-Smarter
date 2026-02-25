import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignUp() {
        setLoading(true);
        // Simulate sign up
        setTimeout(async () => {
            setLoading(false);
            await AsyncStorage.setItem('mockSession', 'true');
            router.replace('/(onboarding)');
        }, 800);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeft color="#1976d2" size={24} />
            </TouchableOpacity>

            <View style={styles.header}>
                <BookOpen stroke="#1976d2" size={64} style={{ marginBottom: 20 }} />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join CareerGuide to start your journey.</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <User color="#888" size={20} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={setName}
                        value={name}
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Mail color="#888" size={20} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email address"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Lock color="#888" size={20} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#888"
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footer} onPress={() => router.back()}>
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.linkText}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 24,
        paddingTop: 60,
        flexGrow: 1,
    },
    backButton: {
        marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
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
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#1976d2',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    linkText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
});
