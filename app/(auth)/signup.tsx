import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, ChevronRight, GraduationCap, Heart, Lock, Mail, MapPin, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

const { height } = Dimensions.get('window');

export default function SignUpScreen() {
    const router = useRouter();
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

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [qualification, setQualification] = useState('');
    const [stream, setStream] = useState('');
    const [marksType, setMarksType] = useState('Marks %');
    const [marks, setMarks] = useState('');
    const [interests, setInterests] = useState('');

    async function handleSignUp() {
        if (!name || !email || !password) {
            Alert.alert('Required Fields', 'Please provide your name, email, and a password.');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        full_name: name,
                        email: email.toLowerCase().trim(),
                        password: password,
                        location,
                        education_level: qualification,
                        stream,
                        marks,
                        interests: interests ? interests.split(',').map(i => i.trim()).filter(i => i) : [],
                    }
                ])
                .select();

            if (error) throw error;

            Alert.alert(
                'Account Created',
                'Your account has been successfully created. Please log in to continue.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]
            );
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <View style={styles.inner}>
                <View style={styles.topSection}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ArrowLeft color="#1976d2" size={24} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <BookOpen stroke="#1976d2" size={32} />
                        </View>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Start your pathly journey today</Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.formSection}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                >
                    <View style={styles.inputWrapper}>
                        <User color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setName}
                            value={name}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Mail color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email Address"
                            placeholderTextColor="#888"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Lock color="#1976d2" size={18} style={styles.inputIcon} />
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

                    <View style={styles.inputWrapper}>
                        <MapPin color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setLocation}
                            value={location}
                            placeholder="City, State"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <GraduationCap color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setQualification}
                            value={qualification}
                            placeholder="Qualification"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <GraduationCap color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setStream}
                            value={stream}
                            placeholder="Stream (e.g. Science, Commerce)"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <GraduationCap color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setMarks}
                            value={marks}
                            placeholder={marksType === 'CGPA' ? "CGPA (e.g. 8.5)" : "Marks % (e.g. 85)"}
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setMarksType(prev => prev === 'Marks %' ? 'CGPA' : 'Marks %')}
                        >
                            <Text style={styles.toggleButtonText}>{marksType}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Heart color="#1976d2" size={18} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={setInterests}
                            value={interests}
                            placeholder="Interests (e.g. Tech, Business)"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />
                    </View>
                </ScrollView>

                {!isKeyboardVisible && (
                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Setting up...' : 'Create Account'}</Text>
                            {!loading && <ChevronRight color="#ffffff" size={22} />}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footer} onPress={() => router.back()}>
                            <Text style={styles.footerText}>
                                Already have an account? <Text style={styles.linkText}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8faff',
    },
    inner: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 40,
        paddingBottom: 24,
    },
    topSection: {
        marginBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginBottom: height > 800 ? 15 : 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    header: {
        alignItems: 'center',
        marginBottom: height > 800 ? 20 : 10,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#e1efff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0d47a1',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#1976d2',
        fontWeight: '500',
        marginTop: 4,
    },
    formSection: {
        maxHeight: height > 800 ? 340 : 290, // Roughly 5 fields
    },
    scrollContent: {
        paddingBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: height > 800 ? 54 : 48,
        marginBottom: height > 800 ? 12 : 8,
        borderWidth: 1,
        borderColor: '#e1efff',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: height > 800 ? 15 : 14,
        color: '#333',
        fontWeight: '500',
    },
    bottomSection: {
        paddingTop: 20,
        // Removed marginTop: 'auto' so the buttons stay directly below the form
    },
    button: {
        backgroundColor: '#1976d2',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        elevation: 4,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#90caf9',
        elevation: 0,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.5,
    },
    footer: {
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    linkText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    toggleButton: {
        backgroundColor: '#e1efff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 8,
    },
    toggleButtonText: {
        color: '#1976d2',
        fontWeight: '600',
        fontSize: 12,
    },
});
