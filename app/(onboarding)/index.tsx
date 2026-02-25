import { useRouter } from 'expo-router';
import { ArrowRight, Globe } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingIndex() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Globe color="#1976d2" size={48} />
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.title}>CareerGuide</Text>
                <Text style={styles.subtitle}>Let's find the best path for your future</Text>
            </View>

            <View style={styles.bottomSection}>
                <Text style={styles.label}>Select your language</Text>
                <View style={styles.languageBox}>
                    <Text style={styles.langText}>English</Text>
                </View>

                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/(onboarding)/profile')}
                >
                    <Text style={styles.btnText}>Get Started</Text>
                    <ArrowRight color="#fff" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff', padding: 24, justifyContent: 'space-between' },
    topSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bottomSection: { paddingBottom: 40 },
    welcomeText: { fontSize: 20, color: '#666', marginTop: 20 },
    title: { fontSize: 36, fontWeight: 'bold', color: '#0d47a1', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#1976d2', textAlign: 'center' },
    label: { fontSize: 14, color: '#666', marginBottom: 8, textAlign: 'center' },
    languageBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 16, marginBottom: 24, alignItems: 'center' },
    langText: { fontSize: 16, color: '#333' },
    primaryBtn: { backgroundColor: '#1976d2', padding: 18, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
    btnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});
