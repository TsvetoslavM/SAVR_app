import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function RecipeDetails() {
	const { id, title, ing } = useLocalSearchParams<{ id: string; title?: string; ing?: string }>();
	const router = useRouter();
	const ingredients = (ing || '').split(',').filter(Boolean);
	const [isFav, setIsFav] = useState(false);
	const images = ['#cfe3ff', '#ffd6d6', '#d1ffd6'];
	const [imgIndex, setImgIndex] = useState(0);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<TouchableOpacity activeOpacity={0.9} style={styles.hero} onPress={() => setImgIndex((i) => (i + 1) % images.length)}>
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

			<View style={styles.body}>
				<View style={styles.titleRow}>
					<Text style={styles.title}>{title || 'Recipe'}</Text>
					<TouchableOpacity onPress={() => setIsFav((v) => !v)}>
						<Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? '#ef4444' : '#111827'} />
					</TouchableOpacity>
				</View>
				{ingredients.length > 0 && (
					<Text style={styles.subtitle}>with {ingredients.join(', ')}</Text>
				)}

				<View style={{ height: 16 }} />
				<Text style={styles.sectionTitle}>Instructions:</Text>
				<Text style={styles.instructions}>
					Add your preparation steps here for {title || 'this recipe'}.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff' },
	hero: { height: 320, backgroundColor: '#eaf1ff', alignItems: 'center', justifyContent: 'center' },
	heroImage: { width: 64, height: 64, borderRadius: 12 },
	close: { position: 'absolute', top: 48, left: 16, zIndex: 2 },
	dotsRow: { position: 'absolute', bottom: 8, flexDirection: 'row', gap: 8 },
	dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#d1d5db' },
	body: { padding: 16 },
	titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	title: { fontSize: 24, fontWeight: '800', color: '#111827' },
	subtitle: { fontSize: 16, color: '#374151', marginTop: 6 },
	sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginTop: 12 },
	instructions: { fontSize: 14, color: '#374151', marginTop: 6, lineHeight: 20 },
}); 