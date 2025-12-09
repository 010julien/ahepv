import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize MMKV instance
const mmkvStorage = new MMKV();

// Track which keys have been migrated
const MIGRATION_KEY = '__mmkv_migration_complete__';

/**
 * Storage wrapper that provides AsyncStorage-compatible API using MMKV
 * Automatically migrates data from AsyncStorage to MMKV on first access
 */
class Storage {
  constructor() {
    this.migrated = mmkvStorage.getBoolean(MIGRATION_KEY) || false;
  }

  /**
   * Migrate a specific key from AsyncStorage to MMKV
   */
  async migrateKey(key) {
    try {
      // Check if data exists in AsyncStorage
      const asyncValue = await AsyncStorage.getItem(key);
      if (asyncValue !== null) {
        // Move to MMKV
        mmkvStorage.set(key, asyncValue);
        console.log(`✅ Migrated ${key} to MMKV`);
      }
    } catch (error) {
      console.warn(`⚠️ Could not migrate ${key}:`, error.message);
    }
  }

  /**
   * Migrate all common keys from AsyncStorage to MMKV
   */
  async migrateAllData() {
    if (this.migrated) {
      return; // Already migrated
    }

    console.log('🔄 Starting AsyncStorage → MMKV migration...');

    const keysToMigrate = [
      '@togoschool_user_profile',
      '@togoschool_schedule',
      // Add any other keys your app uses
    ];

    // Migrate each key
    for (const key of keysToMigrate) {
      await this.migrateKey(key);
    }

    // Mark migration as complete
    mmkvStorage.set(MIGRATION_KEY, true);
    this.migrated = true;

    console.log('✅ Migration complete!');
  }

  /**
   * Get item from storage (async for compatibility)
   * Automatically migrates from AsyncStorage if needed
   */
  async getItem(key) {
    try {
      // If not migrated yet, try to migrate this key first
      if (!this.migrated) {
        await this.migrateKey(key);
      }

      // Get from MMKV
      const value = mmkvStorage.getString(key);
      return value ?? null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  /**
   * Set item in storage (async for compatibility)
   */
  async setItem(key, value) {
    try {
      mmkvStorage.set(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      throw error;
    }
  }

  /**
   * Remove item from storage (async for compatibility)
   */
  async removeItem(key) {
    try {
      mmkvStorage.delete(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all storage (async for compatibility)
   */
  async clear() {
    try {
      mmkvStorage.clearAll();
      this.migrated = false;
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

// Export singleton instance
const storage = new Storage();

// Auto-trigger migration on app start
storage.migrateAllData().catch(err => {
  console.error('Migration failed:', err);
});

export default storage;
