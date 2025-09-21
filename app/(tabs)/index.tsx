import { FlatList, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const initialItems = [
	{ id: '1', name: 'Milk', qty: '1 carton', size: '1L', exp: '24.02.2025' },
	{ id: '2', name: 'Bread', qty: '1 pack', size: '650g', exp: '25.02.2025' },
	{ id: '3', name: 'Cheese', qty: '1 pack', size: '400g', exp: '01.03.2025' },
	{ id: '4', name: 'Ham', qty: '1 pack', size: '170g', exp: '07.03.2025' },
	{ id: '5', name: 'Pasta', qty: '1 box', size: '500g', exp: '15.03.2025' },
];

export default function FridgeScreen() {
	const router = useRouter();
	const [items, setItems] = useState(initialItems);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [newItem, setNewItem] = useState({
		name: '',
		qty: '',
		size: '',
		exp: ''
	});

	function openDetails(item: typeof initialItems[number]) {
		const params = new URLSearchParams({ name: item.name, qty: item.qty, size: item.size, exp: item.exp });
		router.push(`/item/${item.id}?${params.toString()}`);
	}

	function removeItem(id: string) {
		setItems((prev) => prev.filter((it) => it.id !== id));
	}

	function addItem() {
		if (!newItem.name.trim() || !newItem.qty.trim() || !newItem.size.trim() || !newItem.exp.trim()) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}

		const item = {
			id: (items.length + 1).toString(),
			name: newItem.name.trim(),
			qty: newItem.qty.trim(),
			size: newItem.size.trim(),
			exp: newItem.exp.trim()
		};

		setItems((prev) => [...prev, item]);
		setNewItem({ name: '', qty: '', size: '', exp: '' });
		setIsAddModalVisible(false);
	}

	function resetForm() {
		setNewItem({ name: '', qty: '', size: '', exp: '' });
		setIsAddModalVisible(false);
	}

	return (
		<Animated.View style={styles.container} entering={FadeIn.duration(180)}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>Your Fridge</Text>
				<TouchableOpacity style={styles.avatar} onPress={() => router.push({ pathname: '/profile' })}>
					<Ionicons name="person-circle-outline" size={28} color="#6b7280" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={items}
				keyExtractor={(it) => it.id}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				renderItem={({ item }) => (
					<Animated.View layout={Layout.springify().damping(18)} entering={FadeIn} exiting={FadeOut} style={styles.row}>
						<TouchableOpacity style={styles.thumb} onPress={() => openDetails(item)} />
						<View style={{ flex: 1 }}>
							<Text style={styles.itemTitle}>{item.name}</Text>
							<Text style={styles.meta}>{item.qty}</Text>
							<Text style={styles.meta}>{item.size}</Text>
							<Text style={styles.exp}>Exp. date: {item.exp}</Text>
						</View>
						<TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
							<Ionicons name="close-circle" size={28} color="#ff3b30" />
						</TouchableOpacity>
					</Animated.View>
				)}
				contentContainerStyle={{ paddingBottom: 120 }}
			/>

			{/* Floating Action Button */}
			<TouchableOpacity 
				style={styles.fab} 
				onPress={() => setIsAddModalVisible(true)}
			>
				<Ionicons name="add" size={28} color="#ffffff" />
			</TouchableOpacity>

			{/* Add Item Modal */}
			<Modal
				visible={isAddModalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={resetForm}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Add New Item</Text>
							<TouchableOpacity onPress={resetForm}>
								<Ionicons name="close" size={24} color="#6b7280" />
							</TouchableOpacity>
						</View>

						<View style={styles.form}>
							<Text style={styles.label}>Item Name</Text>
							<TextInput
								style={styles.input}
								value={newItem.name}
								onChangeText={(text) => setNewItem(prev => ({ ...prev, name: text }))}
								placeholder="e.g., Milk"
								placeholderTextColor="#9ca3af"
							/>

							<Text style={styles.label}>Quantity</Text>
							<TextInput
								style={styles.input}
								value={newItem.qty}
								onChangeText={(text) => setNewItem(prev => ({ ...prev, qty: text }))}
								placeholder="e.g., 1 carton"
								placeholderTextColor="#9ca3af"
							/>

							<Text style={styles.label}>Size</Text>
							<TextInput
								style={styles.input}
								value={newItem.size}
								onChangeText={(text) => setNewItem(prev => ({ ...prev, size: text }))}
								placeholder="e.g., 1L"
								placeholderTextColor="#9ca3af"
							/>

							<Text style={styles.label}>Expiration Date</Text>
							<TextInput
								style={styles.input}
								value={newItem.exp}
								onChangeText={(text) => setNewItem(prev => ({ ...prev, exp: text }))}
								placeholder="e.g., 24.02.2025"
								placeholderTextColor="#9ca3af"
							/>

							<View style={styles.buttonRow}>
								<TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
									<Text style={styles.cancelButtonText}>Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.addButton} onPress={addItem}>
									<Text style={styles.addButtonText}>Add Item</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff', paddingTop: 48, paddingHorizontal: 16, paddingBottom: 96 },
	header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
	title: { fontSize: 32, fontWeight: '800', color: '#111827' },
	avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center' },
	row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
	thumb: { width: 96, height: 96, borderRadius: 16, backgroundColor: '#eef2ff', marginRight: 12 },
	itemTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
	meta: { fontSize: 14, color: '#6b7280', marginTop: 2 },
	exp: { fontSize: 16, color: '#111827', fontWeight: '800', marginTop: 8 },
	deleteBtn: { padding: 8, marginLeft: 8 },
	separator: { height: 1, backgroundColor: '#eeeeee' },
	fab: {
		position: 'absolute',
		bottom: 100,
		right: 16,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#3b82f6',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#ffffff',
		borderRadius: 16,
		width: '90%',
		maxHeight: '80%',
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#e5e7eb',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#111827',
	},
	form: {
		padding: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#374151',
		marginBottom: 8,
		marginTop: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: '#111827',
		backgroundColor: '#ffffff',
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#d1d5db',
		alignItems: 'center',
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#6b7280',
	},
	addButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		backgroundColor: '#3b82f6',
		alignItems: 'center',
	},
	addButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#ffffff',
	},
});
