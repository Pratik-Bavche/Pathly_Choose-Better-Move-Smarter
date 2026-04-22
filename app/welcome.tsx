import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const videoSource = 'https://assets.mixkit.co/videos/preview/mixkit-university-campus-with-students-walking-4420-large.mp4';

export default function WelcomeScreen() {
    const router = useRouter();

    const player = useVideoPlayer(videoSource, player => {
      player.loop = true;
      player.play();
      player.muted = true;
    });

    const handleGetStarted = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.replace('/(auth)');
    };

    return (
        <View style={styles.container}>
            {/* Background Video using updated expo-video API */}
            <VideoView
                style={styles.backgroundVideo}
                player={player}
                contentFit="cover"
                nativeControls={false}
                fullscreenOptions={{ enabled: false }}
                allowsPictureInPicture={false}
                pointerEvents="none"
            />

            {/* Premium Stylish Overlay */}
            <LinearGradient
                colors={['rgba(13, 71, 161, 0.4)', 'rgba(25, 118, 210, 0.3)', 'rgba(0, 0, 0, 0.85)']}
                locations={[0, 0.3, 0.8]}
                style={styles.overlay}
            >
                <View style={styles.content}>
                    {/* Top Section */}
                    <Animatable.View 
                        animation="fadeInDown" 
                        duration={1200} 
                        style={styles.header}
                    >
                        <Text style={styles.brandName}>Pathly</Text>
                        <Text style={styles.tagline}>Future-Proofing Careers</Text>
                    </Animatable.View>

                    {/* Center Logo Section with Stylish Curved Background */}
                    <View style={styles.centerSection}>
                        <Animatable.View
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            duration={3000}
                            style={styles.logoGlow}
                        />
                        <Animatable.View 
                            animation="zoomIn" 
                            duration={1500} 
                            easing="ease-out-back"
                            style={styles.logoContainer}
                        >
                            <Image 
                                source={require('../assets/images/pathly_logo_premium.png')}
                                style={styles.logo}
                            />
                        </Animatable.View>
                    </View>

                    {/* Bottom Section */}
                    <Animatable.View 
                        animation="fadeInUp" 
                        delay={500} 
                        duration={1500} 
                        style={styles.footer}
                    >
                        <Text style={styles.title}>Choose Better. Move Smarter.</Text>
                        <Text style={styles.description}>
                            AI-powered insights for students to navigate their professional journey with confidence.
                        </Text>
                        
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleGetStarted}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#1976d2', '#0d47a1']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>Get Started</Text>
                                <ArrowRight color="#fff" size={22} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d47a1',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    header: {
        alignItems: 'center',
    },
    brandName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    tagline: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        letterSpacing: 2,
        marginTop: 5,
    },
    centerSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoGlow: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
    },
    logoContainer: {
        backgroundColor: '#ffffff',
        padding: 25,
        borderRadius: 50, // Premium curved corners
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    footer: {
        gap: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 42,
    },
    description: {
        fontSize: 15,
        color: '#cccccc',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 15,
    },
    button: {
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 12,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
