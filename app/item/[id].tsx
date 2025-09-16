import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ItemDetails() {
	const { id, name, qty, size, exp } = useLocalSearchParams<{ id: string; name?: string; qty?: string; size?: string; exp?: string }>();
	const router = useRouter();
	const [isFav, setIsFav] = useState(false);
	const images = [ '#cfe3ff', '#ffd6d6', '#d1ffd6' ];
	const [imgIndex, setImgIndex] = useState(0);

	function nextImage() {
		setImgIndex((i) => (i + 1) % images.length);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			{/* Top image area */}
			<TouchableOpacity activeOpacity={0.9} style={styles.hero} onPress={nextImage}>
				<TouchableOpacity style={styles.close} onPress={() => router.back()}>
					<Ionicons name="close-outline" size={32} color="#374151" />
				</TouchableOpacity>
				<View style={[styles.heroImage, { backgroundColor: images[imgIndex] }]} />
				<View style={styles.dotsRow}>
					{images.map((_, idx) => (
						<View key={idx} style={[styles.dot, idx === imgIndex && { backgroundColor: '#60a5fa' }]} />
					))}
				</View>
			</TouchableOpacity>

			{/* Body */}
			<View style={styles.body}>
				<View style={styles.titleRow}>
					<Text style={styles.title}>{name || 'Item'}</Text>
					<TouchableOpacity onPress={() => setIsFav((v) => !v)}>
						<Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? '#ef4444' : '#111827'} />
					</TouchableOpacity>
				</View>
				<Text style={styles.subtitle}>With {name ? '' : 'Bread, Cheese, Ham'}</Text>

				<View style={{ height: 16 }} />
				{qty && <Text style={styles.meta}>Quantity: {qty}</Text>}
				{size && <Text style={styles.meta}>Size: {size}</Text>}
				{exp && <Text style={styles.meta}>Exp. date: {exp}</Text>}

				<View style={{ height: 16 }} />
				<Text style={styles.instructionsLabel}>Instructions:</Text>
				<Text style={styles.instructions}>
					Describe how to prepare or use {name || 'the product'} here.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff' },
	hero: { height: 340, backgroundColor: '#eaf1ff', alignItems: 'center', justifyContent: 'center' },
	heroImage: { width: 64, height: 64, borderRadius: 12 },
	close: { position: 'absolute', top: 48, left: 16, zIndex: 2 },
	dotsRow: { position: 'absolute', bottom: 8, flexDirection: 'row', gap: 8 },
	dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#d1d5db' },
	body: { padding: 16 },
	titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	title: { fontSize: 24, fontWeight: '800', color: '#111827' },
	subtitle: { fontSize: 18, color: '#374151', marginTop: 4 },
	meta: { fontSize: 14, color: '#6b7280', marginTop: 4 },
	instructionsLabel: { fontSize: 16, fontWeight: '800', color: '#111827', marginTop: 8 },
	instructions: { fontSize: 14, color: '#374151', marginTop: 6, lineHeight: 20 },
}); 