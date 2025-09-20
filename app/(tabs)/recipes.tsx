import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOutDown, Layout } from 'react-native-reanimated';
// const allRecipes = Array.from({ length: 12 }).map((_, i) => ({
// 	id: String(i + 1),
// 	title: i % 2 === 0 ? 'French Toast' : 'Croque Monsieur',
// 	ingredients: i % 3 === 0 ? ['Milk', 'Bread'] : i % 3 === 1 ? ['Bread', 'Cheese'] : ['Ham', 'Cheese'],
// }));

const allRecipes = [
  { id: '1', title: 'French Toast', ingredients: ['Milk ', 'Bread '], image: require('../../assets/images/french_toast.jpg') },
  { id: '2', title: 'Croque Monsieur', ingredients: ['Bread ', 'Cheese '], image: require('../../assets/images/croque_monsieur.jpg') },
  { id: '3', title: 'Pancakes', ingredients: ['Flour ', 'Milk '], image: require('../../assets/images/pancakes.jpg') },
  { id: '4', title: 'Omelette', ingredients: ['Eggs ', 'Cheese '], image: require('../../assets/images/omelette.jpg') },
  { id: '5', title: 'Grilled Cheese', ingredients: ['Bread ', 'Cheese '], image: require('../../assets/images/grilled_cheese.jpg') },
  { id: '6', title: 'Caesar Salad', ingredients: ['Lettuce ', 'Croutons '], image: require('../../assets/images/caesar_salad.jpg') },
  { id: '7', title: 'Spaghetti Carbonara', ingredients: ['Pasta ', 'Bacon '], image: require('../../assets/images/spaghetti_carbonara.jpg') },
  { id: '8', title: 'Tomato Soup', ingredients: ['Tomato ', 'Cream '], image: require('../../assets/images/tomato_soup.jpg') },
  { id: '9', title: 'Chicken Curry', ingredients: ['Chicken ', 'Curry Powder '], image: require('../../assets/images/chicken_curry.jpg') },
  { id: '10', title: 'Beef Tacos', ingredients: ['Beef ', 'Tortilla '], image: require('../../assets/images/beef_tacos.jpg') },
  { id: '11', title: 'Sushi Rolls', ingredients: ['Rice ', 'Seaweed '], image: require('../../assets/images/sushi_rolls.jpg') },
  { id: '12', title: 'Avocado Toast', ingredients: ['Avocado ', 'Bread '], image: require('../../assets/images/avocado_toast.jpg') },
];

const uniqueIngredients = Array.from(
  new Set(allRecipes.flatMap((r) => r.ingredients))
);

function Pill({ children, badge, onPress }: { children: React.ReactNode; badge?: number; onPress?: () => void }) {
	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.pill} onPress={onPress}>
			<Text style={styles.pillText}>{children}</Text>
			{typeof badge === 'number' && badge > 0 && (
				<View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
			)}
		</TouchableOpacity>
	);
}

function RecipeCard({ title, ingredients, image, onPress }: { title: string; ingredients: string[]; image: any; onPress: () => void }) {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<View style={styles.card}>
				<Image source={image} style={styles.cardImage} />
				<View style={styles.cardBody}>
					<Text style={styles.cardTitle}>{title}</Text>
					<Text style={styles.cardSubtitle}>
						with <Text style={{ color: '#ef4444', fontWeight: '700' }}>{ingredients[0]}</Text> and <Text style={{ color: '#ef4444', fontWeight: '700' }}>{ingredients[1]}</Text>
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default function RecipesScreen() {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [sortAsc, setSortAsc] = useState(true);
	const [filters, setFilters] = useState<string[]>([]);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);

	const filtered = useMemo(() => {
		let data = allRecipes.filter((r) => r.title.toLowerCase().includes(query.trim().toLowerCase()));
		if (filters.length > 0) data = data.filter((r) => filters.every((f) => r.ingredients.includes(f)));
		data.sort((a, b) => (sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
		return data;
	}, [query, sortAsc, filters]);

	function toggleFilter(item: string) {
		setFilters((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
	}

	return (
		<Animated.View style={styles.container} entering={FadeIn.duration(180)}>
            {/* Header */}

			<Text style={styles.title}>Recipes </Text>

			{/* Search */}
			<View style={styles.searchInput}>
				<TextInput
					placeholder="Search"
					placeholderTextColor="#9ca3af"
					value={query}
					onChangeText={setQuery}
					style={{ color: '#111827', fontSize: 16 }}
				/>
			</View>

			{/* Actions */}
			<View style={styles.actions}>
				<Pill onPress={() => setShowSort(true)}>↕ Sort </Pill>
				<Pill onPress={() => setShowFilter(true)} badge={filters.length}>≡ Filter </Pill>
			</View>

			<FlatList
				data={filtered}
				numColumns={2}
				keyExtractor={(it) => it.id}
				columnWrapperStyle={{ gap: 16 }}
				contentContainerStyle={{ paddingBottom: 120, gap: 16, paddingHorizontal: 8 }}
				renderItem={({ item }) => (
					<Animated.View style={{ flex: 1 }} layout={Layout.springify().damping(18)}>
					<RecipeCard
						title={item.title}
						ingredients={item.ingredients}
						image={item.image}   // ✅ pass image here
						onPress={() =>
						router.push({
							pathname: '/recipes/[id]',
							params: { id: item.id, title: item.title, ing: item.ingredients.join(',') },
						})
						}
					/>
					</Animated.View>
				)}
				/>


			{/* Sort Modal */}
			<Modal visible={showSort} transparent animationType="none" onRequestClose={() => setShowSort(false)}>
				<Pressable style={styles.backdrop} onPress={() => setShowSort(false)} />
				<Animated.View entering={FadeInDown.duration(500)} exiting={FadeOutDown.duration(120)} style={styles.sheet}>
					<Text style={styles.sheetTitle}>Sort by </Text>
					<TouchableOpacity style={styles.sheetRow} onPress={() => { setSortAsc(true); setShowSort(false); }}>
						<Text style={styles.sheetRowText}>Title A → Z </Text>
						{sortAsc && <Text style={styles.check}>✓</Text>}
					</TouchableOpacity>
					<TouchableOpacity style={styles.sheetRow} onPress={() => { setSortAsc(false); setShowSort(false); }}>
						<Text style={styles.sheetRowText}>Title Z → A </Text>
						{!sortAsc && <Text style={styles.check}>✓</Text>}
					</TouchableOpacity>
				</Animated.View>
			</Modal>

			{/* Filter Modal */}
			<Modal visible={showFilter} transparent animationType="none" onRequestClose={() => setShowFilter(false)}>
				<Pressable style={styles.backdrop} onPress={() => setShowFilter(false)} />
				<Animated.View entering={FadeInDown.duration(500)} exiting={FadeOutDown.duration(160)} style={styles.sheet}>
					<Text style={styles.sheetTitle}>Filter by ingredients</Text>
					{uniqueIngredients.map((ing) => (
						<TouchableOpacity key={ing} style={styles.sheetRow} onPress={() => toggleFilter(ing)}>
						<Text style={styles.sheetRowText}>{ing}</Text>
						{filters.includes(ing) && <Text style={styles.check}>✓</Text>}
						</TouchableOpacity>
					))}
					<View style={{ height: 8 }} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity style={styles.actionBtn} onPress={() => setFilters([])}>
							<Text style={styles.actionBtnText}>Clear</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#111827' }]} onPress={() => setShowFilter(false)}>
							<Text style={[styles.actionBtnText, { color: '#ffffff' }]}>Apply</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Modal>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff', paddingTop: 48},
	title: { fontSize: 36, fontWeight: '800', textAlign: 'center', color: '#111827', paddingBottom: 24 },
	searchInput: { marginHorizontal: 16, height: 44, borderRadius: 22, backgroundColor: '#f5f7fb', paddingHorizontal: 16, justifyContent: 'center' },
	actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 16, paddingBottom: 20},
	pill: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f5f7fb', height: 40, paddingHorizontal: 16, borderRadius: 12 },
	pillText: { fontSize: 16, color: '#111827' },
	badge: { marginLeft: 8, backgroundColor: '#ff6b6b', paddingHorizontal: 8, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
	badgeText: { color: '#ffffff', fontWeight: '700', fontSize: 12 },
	card: { backgroundColor: '#f1f6ff', borderRadius: 16, overflow: 'hidden' },
	cardImage: { height: 132, width: '100%', resizeMode: 'cover' },
	cardBody: { padding: 12, backgroundColor: '#f6f8ff' },
	cardTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 2 },
	cardSubtitle: { fontSize: 14, color: '#6b7280' },
	backdrop: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)' },
	sheet: { position: 'absolute', left: 16, right: 16, bottom: 24, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
	sheetTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 8 },
	sheetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
	sheetRowText: { fontSize: 16, color: '#111827' },
	check: { fontSize: 18, color: '#111827' },
	actionBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#f3f4f6' },
	actionBtnText: { fontSize: 14, color: '#111827', fontWeight: '600' },
}); 