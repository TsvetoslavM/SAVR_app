import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

type BarcodeEvent = { data: string };

export default function Scanner() {
	const router = useRouter();
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		if (!permission) requestPermission();
	}, [permission]);

	function onScanned({ data }: BarcodeEvent) {
		if (scanned) return;
		setScanned(true);
		router.back();
		setTimeout(() => alert(`Scanned: ${data}`), 50);
	}

	const hasPermission = permission?.granted ?? null;

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			{hasPermission === null ? (
				<Text style={styles.text}>Requesting camera permission...</Text>
			) : hasPermission === false ? (
				<View style={styles.center}>
					<Text style={styles.text}>No access to camera</Text>
					<TouchableOpacity style={styles.btn} onPress={requestPermission}>
						<Text style={styles.btnText}>Allow</Text>
					</TouchableOpacity>
				</View>
			) : (
				<CameraView style={StyleSheet.absoluteFillObject} barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_e', 'code128'] }} onBarcodeScanned={(e: any) => onScanned({ data: e.data })} />
			)}
			<TouchableOpacity style={styles.close} onPress={() => router.back()}>
				<Ionicons name="close" size={28} color="#ffffff" />
			</TouchableOpacity>
			<View style={styles.overlay} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#000000' },
	text: { color: '#ffffff', fontSize: 16, textAlign: 'center' },
	center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	btn: { marginTop: 12, paddingHorizontal: 16, height: 40, backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
	btnText: { color: '#111827', fontWeight: '700' },
	close: { position: 'absolute', top: 48, right: 16, backgroundColor: 'rgba(0,0,0,0.4)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
	overlay: { position: 'absolute', left: 24, right: 24, top: 160, bottom: 160, borderColor: '#ffffff', borderWidth: 2, borderRadius: 16, opacity: 0.6 },
}); 