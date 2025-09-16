import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

	function openDetails(item: typeof initialItems[number]) {
		const params = new URLSearchParams({ name: item.name, qty: item.qty, size: item.size, exp: item.exp });
		router.push(`/item/${item.id}?${params.toString()}`);
	}

	function removeItem(id: string) {
		setItems((prev) => prev.filter((it) => it.id !== id));
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
});
