import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '@/lib/simpleStorage';
import { LinearGradient } from 'expo-linear-gradient';

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
			
			{/* Header with gradient background */}
			<LinearGradient
				colors={['#f04b00', '#e63946']}
				style={styles.headerGradient}
			>
				<View style={styles.headerRow}>
					<TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
						<Ionicons name="chevron-back" size={24} color="#ffffff" />
					</TouchableOpacity>
					<Text style={styles.title}>Profile</Text>
					<TouchableOpacity style={styles.settingsBtn}>
						<Ionicons name="settings-outline" size={24} color="#ffffff" />
					</TouchableOpacity>
				</View>
			</LinearGradient>

			<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				{/* Profile Avatar Section */}
				<View style={styles.profileSection}>
					<View style={styles.avatarContainer}>
						<View style={styles.avatar}>
							<Text style={styles.avatarText}>
								{name.split(' ').map((n) => n[0]).join('').slice(0,2).toUpperCase()}
							</Text>
						</View>
						<View style={styles.avatarBadge}>
							<Ionicons name="checkmark" size={12} color="#ffffff" />
						</View>
					</View>
					<Text style={styles.userName}>{name}</Text>
					<Text style={styles.userEmail}>{email}</Text>
					<TouchableOpacity style={styles.editProfileBtn}>
						<Ionicons name="camera-outline" size={16} color="#ffffff" />
						<Text style={styles.editProfileBtnText}>Edit Photo</Text>
					</TouchableOpacity>
				</View>

				{/* Stats Cards */}
				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<View style={styles.statIcon}>
							<Ionicons name="trophy-outline" size={20} color="#f04b00" />
						</View>
						<Text style={styles.statNumber}>12</Text>
						<Text style={styles.statLabel}>Achievements</Text>
					</View>
					<View style={styles.statCard}>
						<View style={styles.statIcon}>
							<Ionicons name="flame-outline" size={20} color="#ef4444" />
						</View>
						<Text style={styles.statNumber}>47</Text>
						<Text style={styles.statLabel}>Streak Days</Text>
					</View>
					<View style={styles.statCard}>
						<View style={styles.statIcon}>
							<Ionicons name="star-outline" size={20} color="#2f95dc" />
						</View>
						<Text style={styles.statNumber}>8.5</Text>
						<Text style={styles.statLabel}>Rating</Text>
					</View>
				</View>

				{/* Account Information Card */}
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Ionicons name="person-outline" size={20} color="#f04b00" />
						<Text style={styles.cardTitle}>Account Information</Text>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Full Name</Text>
						<View style={styles.inputContainer}>
							<Ionicons name="person" size={16} color="#6b7280" style={styles.inputIcon} />
							<TextInput 
								value={name} 
								onChangeText={setName} 
								style={styles.input} 
								placeholder="Your name" 
								placeholderTextColor="#9ca3af" 
							/>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Email Address</Text>
						<View style={styles.inputContainer}>
							<Ionicons name="mail" size={16} color="#6b7280" style={styles.inputIcon} />
							<TextInput 
								keyboardType="email-address" 
								value={email} 
								onChangeText={setEmail} 
								style={styles.input} 
								placeholder="you@example.com" 
								placeholderTextColor="#9ca3af" 
							/>
						</View>
					</View>
				</View>

				{/* Preferences Card */}
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Ionicons name="settings-outline" size={20} color="#f04b00" />
						<Text style={styles.cardTitle}>Preferences</Text>
					</View>
					<View style={styles.prefRow}>
						<View style={styles.prefLeft}>
							<Ionicons name="resize-outline" size={18} color="#6b7280" />
							<Text style={styles.prefLabel}>Measurement Units</Text>
						</View>
						<View style={styles.prefRight}>
							<Text style={styles.prefValue}>{metric ? 'Metric' : 'Imperial'}</Text>
							<Switch 
								value={metric} 
								onValueChange={setMetric}
								trackColor={{ false: '#e5e7eb', true: '#f04b00' }}
								thumbColor={metric ? '#ffffff' : '#9ca3af'}
							/>
						</View>
					</View>
					<View style={styles.prefRow}>
						<View style={styles.prefLeft}>
							<Ionicons name="notifications-outline" size={18} color="#6b7280" />
							<Text style={styles.prefLabel}>Push Notifications</Text>
						</View>
						<Switch 
							value={notifications} 
							onValueChange={setNotifications}
							trackColor={{ false: '#e5e7eb', true: '#f04b00' }}
							thumbColor={notifications ? '#ffffff' : '#9ca3af'}
						/>
					</View>
				</View>

				{/* Quick Actions */}
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Ionicons name="flash-outline" size={20} color="#f04b00" />
						<Text style={styles.cardTitle}>Quick Actions</Text>
					</View>
					<View style={styles.actionGrid}>
						<TouchableOpacity style={styles.actionItem}>
							<View style={[styles.actionIcon, { backgroundColor: '#eef2ff' }]}>
								<Ionicons name="shield-checkmark-outline" size={20} color="#2f95dc" />
							</View>
							<Text style={styles.actionText}>Privacy</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionItem}>
							<View style={[styles.actionIcon, { backgroundColor: '#eef2ff' }]}>
								<Ionicons name="help-circle-outline" size={20} color="#2f95dc" />
							</View>
							<Text style={styles.actionText}>Help</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionItem}>
							<View style={[styles.actionIcon, { backgroundColor: '#eef2ff' }]}>
								<Ionicons name="information-circle-outline" size={20} color="#2f95dc" />
							</View>
							<Text style={styles.actionText}>About</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionItem}>
							<View style={[styles.actionIcon, { backgroundColor: '#fef2f2' }]}>
								<Ionicons name="log-out-outline" size={20} color="#ef4444" />
							</View>
							<Text style={styles.actionText}>Logout</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ height: 20 }} />
				
				{/* Save Button with gradient */}
				<TouchableOpacity style={styles.saveBtn} onPress={save}>
					<LinearGradient
						colors={['#f04b00', '#e63946']}
						style={styles.saveBtnGradient}
					>
						<Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
						<Text style={styles.saveBtnText}>Save Changes</Text>
					</LinearGradient>
				</TouchableOpacity>

				<View style={{ height: 20 }} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		backgroundColor: '#ffffff' 
	},
	headerGradient: {
		paddingTop: 48,
		paddingBottom: 20,
		paddingHorizontal: 16,
	},
	headerRow: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between' 
	},
	backBtn: { 
		width: 40, 
		height: 40, 
		borderRadius: 20, 
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: 'rgba(255,255,255,0.2)' 
	},
	settingsBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)'
	},
	title: { 
		fontSize: 24, 
		fontWeight: '800', 
		color: '#ffffff' 
	},
	scrollContainer: {
		flex: 1,
		marginTop: -20,
	},
	profileSection: {
		backgroundColor: '#ffffff',
		marginHorizontal: 16,
		borderRadius: 20,
		padding: 24,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	avatarContainer: {
		position: 'relative',
		marginBottom: 16,
	},
	avatar: { 
		width: 80, 
		height: 80, 
		borderRadius: 40, 
		backgroundColor: '#f04b00', 
		alignItems: 'center', 
		justifyContent: 'center',
		shadowColor: '#f04b00',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	avatarText: { 
		fontSize: 28, 
		fontWeight: '800', 
		color: '#ffffff' 
	},
	avatarBadge: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#10b981',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: '#ffffff',
	},
	userName: {
		fontSize: 22,
		fontWeight: '700',
		color: '#111827',
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 14,
		color: '#6b7280',
		marginBottom: 16,
	},
	editProfileBtn: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		gap: 8, 
		backgroundColor: '#f04b00', 
		paddingHorizontal: 20, 
		paddingVertical: 10, 
		borderRadius: 20,
		shadowColor: '#f04b00',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	editProfileBtnText: { 
		color: '#ffffff', 
		fontWeight: '600',
		fontSize: 14,
	},
	statsContainer: {
		flexDirection: 'row',
		marginHorizontal: 16,
		marginTop: 16,
		gap: 12,
	},
	statCard: {
		flex: 1,
		backgroundColor: '#ffffff',
		borderRadius: 16,
		padding: 16,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	statIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#eef2ff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
	},
	statNumber: {
		fontSize: 20,
		fontWeight: '800',
		color: '#111827',
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: '#6b7280',
		fontWeight: '500',
	},
	card: { 
		backgroundColor: '#ffffff', 
		borderRadius: 16, 
		padding: 20,
		marginHorizontal: 16,
		marginTop: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		gap: 8,
	},
	cardTitle: { 
		fontSize: 18, 
		fontWeight: '700', 
		color: '#111827' 
	},
	inputGroup: {
		marginBottom: 16,
	},
	label: { 
		fontSize: 14, 
		color: '#374151', 
		marginBottom: 8,
		fontWeight: '500',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eef2ff',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e5e7eb',
	},
	inputIcon: {
		marginLeft: 12,
	},
	input: { 
		flex: 1,
		height: 48, 
		paddingHorizontal: 12, 
		color: '#111827',
		fontSize: 16,
	},
	prefRow: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#f3f4f6',
	},
	prefLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		flex: 1,
	},
	prefRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	prefLabel: { 
		fontSize: 16, 
		color: '#111827',
		fontWeight: '500',
	},
	prefValue: { 
		fontSize: 14, 
		color: '#6b7280',
		fontWeight: '500',
	},
	actionGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	actionItem: {
		width: '48%',
		backgroundColor: '#eef2ff',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#e5e7eb',
	},
	actionIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
	},
	actionText: {
		fontSize: 14,
		color: '#374151',
		fontWeight: '500',
	},
	saveBtn: {
		marginHorizontal: 16,
		borderRadius: 16,
		shadowColor: '#f04b00',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	saveBtnGradient: {
		height: 56,
		borderRadius: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	saveBtnText: { 
		color: '#ffffff', 
		fontWeight: '700',
		fontSize: 16,
	},
});