import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '@/lib/simpleStorage';

export default function ProfileScreen() {
	const router = useRouter();
	const [name, setName] = useState('John Doe');
	const [email, setEmail] = useState('john@example.com');
	const [metric, setMetric] = useState(true);
	const [notifications, setNotifications] = useState(true);

	useEffect(() => {
		(async () => {
			const saved = await getItem('profile');
			if (saved) {
				try {
					const data = JSON.parse(saved);
					setName(data.name ?? name);
					setEmail(data.email ?? email);
					setMetric(data.metric ?? metric);
					setNotifications(data.notifications ?? notifications);
				} catch {}
			}
		})();
	}, []);

	async function save() {
		await setItem('profile', JSON.stringify({ name, email, metric, notifications }));
		Alert.alert('Saved', 'Your profile has been updated.');
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={styles.headerRow}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
					<Ionicons name="chevron-back" size={24} color="#111827" />
				</TouchableOpacity>
				<Text style={styles.title}>Profile</Text>
				<View style={{ width: 24 }} />
			</View>

			<View style={{ height: 20 }} />
			{/* Avatar */}
			<View style={styles.avatarRow}>
				<View style={styles.avatar}><Text style={styles.avatarText}>{name.split(' ').map((n) => n[0]).join('').slice(0,2).toUpperCase()}</Text></View>
				<TouchableOpacity style={styles.changeBtn}>
					<Ionicons name="camera-outline" size={16} color="#ffffff" />
					<Text style={styles.changeBtnText}>Change</Text>
				</TouchableOpacity>
			</View>

			<View style={{ height: 16 }} />
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Account</Text>
				<Text style={styles.label}>Name</Text>
				<TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" placeholderTextColor="#9ca3af" />
				<Text style={styles.label}>Email</Text>
				<TextInput keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" placeholderTextColor="#9ca3af" />
			</View>

			<View style={{ height: 12 }} />
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Preferences</Text>
				<View style={styles.prefRow}>
					<Text style={styles.prefLabel}>Units</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
						<Text style={styles.prefValue}>{metric ? 'Metric' : 'Imperial'}</Text>
						<Switch value={metric} onValueChange={setMetric} />
					</View>
				</View>
				<View style={styles.prefRow}>
					<Text style={styles.prefLabel}>Notifications</Text>
					<Switch value={notifications} onValueChange={setNotifications} />
				</View>
			</View>

			<View style={{ height: 20 }} />
			<TouchableOpacity style={styles.saveBtn} onPress={save}>
				<Text style={styles.saveBtnText}>Save changes</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff', paddingTop: 48, paddingHorizontal: 16 },
	headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
	title: { fontSize: 24, fontWeight: '800', color: '#111827' },
	avatarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#e6efff', alignItems: 'center', justifyContent: 'center' },
	avatarText: { fontSize: 22, fontWeight: '800', color: '#3b82f6' },
	changeBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f04b00', paddingHorizontal: 14, height: 36, borderRadius: 18 },
	changeBtnText: { color: '#ffffff', fontWeight: '700' },
	card: { backgroundColor: '#f6f8ff', borderRadius: 16, padding: 16 },
	cardTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 8 },
	label: { fontSize: 12, color: '#6b7280', marginTop: 8 },
	input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, height: 44, paddingHorizontal: 12, color: '#111827', marginTop: 6 },
	prefRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
	prefLabel: { fontSize: 14, color: '#111827' },
	prefValue: { fontSize: 14, color: '#374151' },
	saveBtn: { height: 48, borderRadius: 12, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
	saveBtnText: { color: '#ffffff', fontWeight: '800' },
}); 