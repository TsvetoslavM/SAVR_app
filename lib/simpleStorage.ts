type Value = string | null;

const memoryStore: Record<string, string> = (globalThis as any).__PROFILE_STORE__ || {};
(globalThis as any).__PROFILE_STORE__ = memoryStore;

export async function getItem(key: string): Promise<Value> {
	try {
		if (typeof localStorage !== 'undefined') {
			return localStorage.getItem(key);
		}
		return memoryStore[key] ?? null;
	} catch {
		return null;
	}
}

export async function setItem(key: string, value: string): Promise<void> {
	try {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, value);
			return;
		}
		memoryStore[key] = value;
	} catch {}
} 