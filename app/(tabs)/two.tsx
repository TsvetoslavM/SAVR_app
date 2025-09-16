import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

function BuyCard({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<View style={styles.card}>
			<View style={styles.cardIcon} />
			<View style={{ flex: 1 }}>
				<Text style={styles.cardTitle}>{title}</Text>
				<Text style={styles.cardSubtitle}>{subtitle}</Text>
			</View>
		</View>
	);
}

export default function ToBuyScreen() {
	return (
		<Animated.View style={styles.container} entering={FadeIn.duration(180)}>
			<Text style={styles.title}>To Buy</Text>
			<View style={{ height: 16 }} />
			<BuyCard title="Gummy Bears" subtitle="7 mo|q" />
			<View style={{ height: 12 }} />
			<BuyCard title="Alcohol" subtitle="17L" />
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff', paddingTop: 48, paddingHorizontal: 20, paddingBottom: 96 },
	title: { fontSize: 36, fontWeight: '800', textAlign: 'center', color: '#111827' },
	card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f6f8ff', borderRadius: 16, padding: 16 },
	cardIcon: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#e6efff', marginRight: 16 },
	cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
	cardSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 2 },
});
