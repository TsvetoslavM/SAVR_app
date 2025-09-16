import React from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabButtonProps = { label: string; iconName?: any; imageSource?: any; focused: boolean; onPress: () => void };

function CustomTabBar({ state, navigation }: any) {
	const recipesIndex = state.routes.findIndex((r: any) => r.name === 'recipes');
	const toBuyIndex = state.routes.findIndex((r: any) => r.name === 'two');
	const homeIndex = state.routes.findIndex((r: any) => r.name === 'index');

	const isOnHome = state.index === homeIndex;

	return (
		<View style={styles.tabWrapper}>
			{/* Orange bar */}
			<View style={styles.tabContainer}>
				<View style={styles.tabRow}>
					{/* Recipes */}
					<TabButton
						label="Recipes"
						imageSource={require('../../assets/images/recipes-svgrepo-com.png')}
						iconName="images-outline"
						focused={state.index === recipesIndex}
						onPress={() => navigation.navigate('recipes')}
					/>

					{/* To Buy with custom icon */}
					<TabButton
						label="To Buy"
						imageSource={require('../../assets/images/buying-on-smartphone-svgrepo-com.png')}
						focused={state.index === toBuyIndex}
						onPress={() => navigation.navigate('two')}
					/>
				</View>
			</View>

			{/* Floating Home button (centered between tabs) */}
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={() => {
					if (isOnHome) {
						navigation.navigate('scanner');
					} else {
						navigation.navigate('index');
					}
				}}
				style={styles.fabCenter}
			>
				{isOnHome ? (
					<Image source={require('../../assets/images/scan-alt-svgrepo-com.png')} style={{ width: 28, height: 28, tintColor: '#ff3b30' }} resizeMode="contain" />
				) : (
					<Ionicons name="home-outline" size={28} color="#ff3b30" />
				)}
			</TouchableOpacity>
		</View>
	);
}

function TabButton({ label, iconName, imageSource, focused, onPress }: TabButtonProps) {
	return (
		<TouchableOpacity accessibilityRole="button" accessibilityState={focused ? { selected: true } : {}} onPress={onPress} style={styles.tabButton}>
			{imageSource ? (
				<Image source={imageSource} style={[styles.imgIcon, { opacity: focused ? 1 : 0.6 }]} resizeMode="contain" />
			) : (
				<Ionicons name={iconName} size={24} color={focused ? '#ffffff' : '#ffe6d6'} />
			)}
			<Text style={[styles.tabLabel, { color: focused ? '#ffffff' : '#ffe6d6' }]}>{label}</Text>
		</TouchableOpacity>
	);
}

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }} tabBar={(props) => <CustomTabBar {...props} /> }>
			<Tabs.Screen name="index" options={{ title: 'Fridge' }} />
			<Tabs.Screen name="two" options={{ title: 'To Buy' }} />
			<Tabs.Screen name="recipes" options={{ title: 'Recipes' }} />
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},
	tabContainer: {
		backgroundColor: '#f04b00',
		height: 72,
		paddingHorizontal: 24,
		justifyContent: 'center',
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	tabButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
	},
	imgIcon: { width: 24, height: 24, tintColor: undefined },
	fabCenter: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 36,
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 6,
	},
	tabLabel: { fontSize: 12, marginTop: 2, fontWeight: '600' },
});
