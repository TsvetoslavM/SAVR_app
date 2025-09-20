import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeDetails() {
	const { id, title, ing, image } = useLocalSearchParams<{ id: string; title?: string; ing?: string; image?: string }>();
	const router = useRouter();
	const ingredients = (ing || '').split(',').filter(Boolean);
	const [isFav, setIsFav] = useState(false);
	const images = ['#cfe3ff', '#ffd6d6', '#d1ffd6'];
	const [imgIndex, setImgIndex] = useState(0);

	const recipeImages: any[] = [];
  if (image) {
    // Map ID to the same images you used in allRecipes
    const imagesMap: Record<string, any> = {
      '1': require('../../assets/images/french_toast.jpg'),
      '2': require('../../assets/images/croque_monsieur.jpg'),
      '3': require('../../assets/images/pancakes.jpg'),
      '4': require('../../assets/images/omelette.jpg'),
      '5': require('../../assets/images/grilled_cheese.jpg'),
      '6': require('../../assets/images/caesar_salad.jpg'),
      '7': require('../../assets/images/spaghetti_carbonara.jpg'),
      '8': require('../../assets/images/tomato_soup.jpg'),
      '9': require('../../assets/images/chicken_curry.jpg'),
      '10': require('../../assets/images/beef_tacos.jpg'),
      '11': require('../../assets/images/sushi_rolls.jpg'),
      '12': require('../../assets/images/avocado_toast.jpg'),
    };

    recipeImages.push(imagesMap[id]); // you could later add more images per recipe
	const recipeImages = id && imagesMap[id] ? [imagesMap[id]] : [];
  }

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<TouchableOpacity activeOpacity={0.9} style={styles.hero} onPress={() => setImgIndex((i) => recipeImages.length > 0 ? (i + 1) % recipeImages.length : 0)}>
				<TouchableOpacity style={styles.close} onPress={() => router.back()}>
					<Ionicons name="close-outline" size={32} color="#374151" />
				</TouchableOpacity>
				{recipeImages.length > 0 ? (
					<Image source={recipeImages[imgIndex]} style={styles.heroImage} />
					) : (
					<View style={[styles.heroImage, { backgroundColor: '#e5e7eb' }]} />
				)}
				<View style={styles.dotsRow}>
					{recipeImages.map((_, idx) => (
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
	heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
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