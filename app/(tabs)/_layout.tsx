import { Tabs, useRouter } from 'expo-router';
import { Compass, Home, LayoutList, MessageCircle, User } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#42a5f5' : '#1976d2',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
          paddingBottom: 5,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_home'),
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tab_explore'),
          tabBarIcon: ({ color }) => <Compass color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: t('tab_plan'),
          tabBarIcon: ({ color }) => <LayoutList color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('tab_assist'),
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab_profile'),
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

