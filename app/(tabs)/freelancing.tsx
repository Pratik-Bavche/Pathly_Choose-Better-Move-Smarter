import { Bot, Plus, Send, User, Briefcase, Calendar, MapPin, Search, ChevronRight, Layout, Globe, Star, MessageSquare } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../context/LanguageContext';

interface Post {
    id: string;
    userName: string;
    role: string;
    description: string;
    timestamp: number;
    skills: string[];
}

export default function FreelancingScreen() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'posts' | 'create'>('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    
    // Form state
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const stored = await AsyncStorage.getItem('freelance_posts');
            if (stored) {
                setPosts(JSON.parse(stored));
            } else {
                // Initial dummy posts
                const initial = [
                    {
                        id: '1',
                        userName: 'Pratik B.',
                        role: 'React Native Developer',
                        description: 'Looking for mobile app projects. 2 years of experience in Expo and Firebase.',
                        timestamp: Date.now() - 3600000,
                        skills: ['React Native', 'Expo', 'TypeScript']
                    },
                    {
                        id: '2',
                        userName: 'Snehal S.',
                        role: 'UI/UX Designer',
                        description: 'Specialized in Figma and intuitive dashboard designs.',
                        timestamp: Date.now() - 86400000,
                        skills: ['Figma', 'UI Design', 'Canva']
                    }
                ];
                setPosts(initial);
                await AsyncStorage.setItem('freelance_posts', JSON.stringify(initial));
            }
        } catch (e) {}
    };

    const handleCreatePost = async () => {
        if (!role.trim() || !description.trim()) {
            Alert.alert('Error', 'Please fill all mandatory fields');
            return;
        }

        try {
            const userDataStr = await AsyncStorage.getItem('userData');
            const userData = userDataStr ? JSON.parse(userDataStr) : {};
            
            const newPost: Post = {
                id: Date.now().toString(),
                userName: userData.full_name || userData.name || 'Anonymous User',
                role: role.trim(),
                description: description.trim(),
                timestamp: Date.now(),
                skills: skills.split(',').map(s => s.trim()).filter(s => s !== '')
            };

            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts);
            await AsyncStorage.setItem('freelance_posts', JSON.stringify(updatedPosts));

            // Reset form
            setRole('');
            setDescription('');
            setSkills('');
            setActiveTab('posts');
            Alert.alert('Success', 'Your post has been published!');
        } catch (e) {
            Alert.alert('Error', 'Failed to save post');
        }
    };

    const renderPostItem = ({ item }: { item: Post }) => (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <View style={styles.avatar}>
                    <User color="#0d47a1" size={20} />
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.roleText}>{item.role}</Text>
                </View>
            </View>
            
            <Text style={styles.postDesc}>{item.description}</Text>
            
            <View style={styles.skillsRow}>
                {item.skills.map((skill, idx) => (
                    <View key={idx} style={styles.skillTag}>
                        <Text style={styles.skillTagText}>{skill}</Text>
                    </View>
                ))}
            </View>
            
            <View style={styles.postFooter}>
                <Text style={styles.timeText}>{new Date(item.timestamp).toLocaleDateString()}</Text>
                <TouchableOpacity style={styles.contactBtn}>
                    <MessageSquare color="#1976d2" size={16} />
                    <Text style={styles.contactBtnText}>Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Freelancing Hub</Text>
                <Text style={styles.headerSub}>Find projects or showcase your skills</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'posts' && styles.activeTab]} 
                    onPress={() => setActiveTab('posts')}
                >
                    <Globe size={18} color={activeTab === 'posts' ? '#0d47a1' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Browse Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'create' && styles.activeTab]} 
                    onPress={() => setActiveTab('create')}
                >
                    <Plus size={18} color={activeTab === 'create' ? '#0d47a1' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>Create Post</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'posts' ? (
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={renderPostItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Briefcase color="#ccc" size={48} />
                            <Text style={styles.emptyText}>No posts yet. Be the first to post!</Text>
                        </View>
                    }
                />
            ) : (
                <ScrollView style={styles.formArea} showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>What is your professional role?</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="e.g. Graphic Designer, Freelance Writer"
                            value={role}
                            onChangeText={setRole}
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tell us about your services & experience</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe what you can do for clients..."
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Skills (Comma separated)</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="e.g. Logo Design, Photoshop, Copywriting"
                            value={skills}
                            onChangeText={setSkills}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.submitBtn} onPress={handleCreatePost}>
                        <Text style={styles.submitBtnText}>Publish Post</Text>
                    </TouchableOpacity>
                    
                    <View style={{ height: 40 }} />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fb' },
    header: { backgroundColor: '#0d47a1', padding: 24, paddingTop: 60, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#ffffff' },
    headerSub: { fontSize: 14, color: '#e3f2fd', marginTop: 4, opacity: 0.9 },
    tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, margin: 16, padding: 4, elevation: 4 },
    tab: { flex: 1, paddingVertical: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderRadius: 12 },
    activeTab: { backgroundColor: '#e3f2fd' },
    tabText: { fontSize: 14, color: '#666', fontWeight: '600' },
    activeTabText: { color: '#0d47a1' },
    listContent: { padding: 16, paddingBottom: 100 },
    postCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, elevation: 2, borderWidth: 1, borderColor: '#eee' },
    postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    headerInfo: { flex: 1 },
    userName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    roleText: { fontSize: 13, color: '#1976d2', fontWeight: '600', marginTop: 2 },
    postDesc: { fontSize: 15, color: '#555', lineHeight: 22, marginBottom: 16 },
    skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
    skillTag: { backgroundColor: '#f0f4f8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    skillTagText: { fontSize: 12, color: '#444', fontWeight: '500' },
    postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16 },
    timeText: { fontSize: 12, color: '#888' },
    contactBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f8faff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#e1efff' },
    contactBtnText: { fontSize: 13, fontWeight: 'bold', color: '#1976d2' },
    emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100, opacity: 0.5 },
    emptyText: { marginTop: 16, fontSize: 16, color: '#666' },
    formArea: { padding: 20 },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 16, color: '#333', borderWidth: 1, borderColor: '#e1efff', elevation: 1 },
    textArea: { height: 120, textAlignVertical: 'top' },
    submitBtn: { backgroundColor: '#0d47a1', padding: 18, borderRadius: 16, alignItems: 'center', elevation: 4, marginTop: 10 },
    submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
