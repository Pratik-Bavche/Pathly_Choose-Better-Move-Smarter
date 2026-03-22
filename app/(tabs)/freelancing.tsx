import { Bot, Plus, Send, User, Briefcase, Globe, Phone, Linkedin, MessageSquare, Trash2, Pencil } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../context/LanguageContext';

interface Post {
    id: string;
    userName: string;
    role: string;
    description: string;
    timestamp: number;
    skills: string[];
    mobile: string;
    linkedin: string;
}

export default function FreelancingScreen() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'posts' | 'create'>('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    
    // Form state
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [mobile, setMobile] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        loadPosts();
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const userDataStr = await AsyncStorage.getItem('userData');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                setCurrentUser(userData.full_name || userData.name || 'Anonymous User');
            }
        } catch (e) {}
    };

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
                        skills: ['React Native', 'Expo', 'TypeScript'],
                        mobile: '9876543210',
                        linkedin: 'https://linkedin.com/in/pratikb'
                    },
                    {
                        id: '2',
                        userName: 'Snehal S.',
                        role: 'UI/UX Designer',
                        description: 'Specialized in Figma and intuitive dashboard designs.',
                        timestamp: Date.now() - 86400000,
                        skills: ['Figma', 'UI Design', 'Canva'],
                        mobile: '9123456789',
                        linkedin: 'https://linkedin.com/in/snehals'
                    }
                ];
                setPosts(initial);
                await AsyncStorage.setItem('freelance_posts', JSON.stringify(initial));
            }
        } catch (e) {}
    };

    const handleCreateOrUpdatePost = async () => {
        if (!role.trim() || !description.trim() || !mobile.trim()) {
            Alert.alert(t('error'), t('fill_mandatory_fields'));
            return;
        }

        try {
            const userDataStr = await AsyncStorage.getItem('userData');
            const userData = userDataStr ? JSON.parse(userDataStr) : {};
            const authorName = userData.full_name || userData.name || 'Anonymous User';
            
            let updatedPosts;
            if (editingId) {
                // Update existing post
                updatedPosts = posts.map(p => {
                    if (p.id === editingId) {
                        return {
                            ...p,
                            role: role.trim(),
                            description: description.trim(),
                            skills: skills.split(',').map(s => s.trim()).filter(s => s !== ''),
                            mobile: mobile.trim(),
                            linkedin: linkedin.trim(),
                            timestamp: Date.now() // Optional: update timestamp on edit
                        };
                    }
                    return p;
                });
                Alert.alert(t('success'), t('update_success'));
            } else {
                // Create new post
                const newPost: Post = {
                    id: Date.now().toString(),
                    userName: authorName,
                    role: role.trim(),
                    description: description.trim(),
                    timestamp: Date.now(),
                    skills: skills.split(',').map(s => s.trim()).filter(s => s !== ''),
                    mobile: mobile.trim(),
                    linkedin: linkedin.trim()
                };
                updatedPosts = [newPost, ...posts];
                Alert.alert(t('success'), t('post_success'));
            }

            setPosts(updatedPosts);
            await AsyncStorage.setItem('freelance_posts', JSON.stringify(updatedPosts));

            // Reset form
            setRole('');
            setDescription('');
            setSkills('');
            setMobile('');
            setLinkedin('');
            setEditingId(null);
            setActiveTab('posts');
        } catch (e) {
            Alert.alert(t('error'), t('failed_save_post'));
        }
    };

    const handleDeletePost = (id: string) => {
        Alert.alert(
            t('delete_post_title'),
            t('delete_post_confirm'),
            [
                { text: t('cancel'), style: 'cancel' },
                { 
                    text: t('delete_btn'), 
                    style: 'destructive',
                    onPress: async () => {
                        const updatedPosts = posts.filter(p => p.id !== id);
                        setPosts(updatedPosts);
                        await AsyncStorage.setItem('freelance_posts', JSON.stringify(updatedPosts));
                    }
                }
            ]
        );
    };

    const startEditing = (post: Post) => {
        setRole(post.role);
        setDescription(post.description);
        setSkills(post.skills.join(', '));
        setMobile(post.mobile);
        setLinkedin(post.linkedin);
        setEditingId(post.id);
        setActiveTab('create');
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
                <View style={styles.headerActions}>
                    {item.userName === currentUser && (
                        <>
                            <TouchableOpacity onPress={() => startEditing(item)} style={styles.actionIcon}>
                                <Pencil color="#666" size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeletePost(item.id)} style={styles.actionIcon}>
                                <Trash2 color="#e53935" size={18} />
                            </TouchableOpacity>
                        </>
                    )}
                    {item.linkedin ? (
                        <TouchableOpacity onPress={() => Linking.openURL(item.linkedin)} style={styles.actionIcon}>
                            <Linkedin color="#0077B5" size={22} />
                        </TouchableOpacity>
                    ) : null}
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
                <TouchableOpacity 
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL(`tel:${item.mobile}`)}
                >
                    <Phone color="#1976d2" size={16} />
                    <Text style={styles.contactBtnText}>{t('call_now')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('freelance_hub')}</Text>
                <Text style={styles.headerSub}>{t('freelance_sub')}</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'posts' && styles.activeTab]} 
                    onPress={() => setActiveTab('posts')}
                >
                    <Globe size={18} color={activeTab === 'posts' ? '#0d47a1' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>{t('browse_posts')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'create' && styles.activeTab]} 
                    onPress={() => {
                        setActiveTab('create');
                        if (!editingId) {
                            // Reset if not editing
                            setRole('');
                            setDescription('');
                            setSkills('');
                            setMobile('');
                            setLinkedin('');
                        }
                    }}
                >
                    <Plus size={18} color={activeTab === 'create' ? '#0d47a1' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>
                        {editingId ? t('edit_post_tab') : t('create_post_tab')}
                    </Text>
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
                            <Text style={styles.emptyText}>{t('no_posts')}</Text>
                        </View>
                    }
                />
            ) : (
                <ScrollView style={styles.formArea} showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('role_label')}</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={t('role_placeholder')}
                            value={role}
                            onChangeText={setRole}
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('desc_label')}</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]}
                            placeholder={t('desc_placeholder')}
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('skills_label')}</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={t('skills_placeholder')}
                            value={skills}
                            onChangeText={setSkills}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('mobile_label')}</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={t('mobile_placeholder')}
                            keyboardType="phone-pad"
                            value={mobile}
                            onChangeText={setMobile}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('linkedin_label')}</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder={t('linkedin_placeholder')}
                            keyboardType="url"
                            autoCapitalize="none"
                            value={linkedin}
                            onChangeText={setLinkedin}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.submitBtn} onPress={handleCreateOrUpdatePost}>
                        <Text style={styles.submitBtnText}>{editingId ? t('update_post') : t('publish_post')}</Text>
                    </TouchableOpacity>
                    
                    {editingId && (
                        <TouchableOpacity 
                            style={[styles.submitBtn, { backgroundColor: '#f5f5f5', marginTop: 12 }]} 
                            onPress={() => {
                                setEditingId(null);
                                setActiveTab('posts');
                            }}
                        >
                            <Text style={[styles.submitBtnText, { color: '#666' }]}>{t('cancel_edit')}</Text>
                        </TouchableOpacity>
                    )}
                    
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
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    actionIcon: { padding: 4 },
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
