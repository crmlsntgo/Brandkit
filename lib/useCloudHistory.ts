'use client';

import { useEffect, useState, useCallback } from 'react';
import { BrandKit } from '@/types/brandkit';
import { useAuth } from './AuthProvider';
import { getSupabaseClient } from './supabase';

const STORAGE_KEY = 'brandkit_history';
const LOCAL_MAX = 5;
const CLOUD_MAX = 20;

export interface HistoryEntry {
  id: string;
  savedAt: string;
  brandKit: BrandKit;
}

/** Reads/writes the local (unauthenticated) history. Exported for reuse. */
function readLocal(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}
function writeLocal(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota exceeded — ignore, non-critical
  }
}

/**
 * Drop-in replacement for useHistory() that syncs to Supabase when the
 * user is signed in, and transparently falls back to localStorage when
 * signed out or when Supabase isn't configured. On sign-in, any local
 * entries are migrated to the cloud automatically (one-time, best-effort).
 */
export function useCloudHistory() {
  const { user, isConfigured } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [syncing, setSyncing] = useState(false);

  const isCloud = isConfigured && !!user;

  const loadCloud = useCallback(async () => {
    if (!user) return;
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setSyncing(true);
    const { data, error } = await supabase
      .from('brand_kits')
      .select('id, created_at, brand_name, kit_data')
      .order('created_at', { ascending: false })
      .limit(CLOUD_MAX);

    if (!error && data) {
      setHistory(
        data.map((row) => ({
          id: row.id,
          savedAt: row.created_at,
          brandKit: row.kit_data as BrandKit,
        }))
      );
    }
    setSyncing(false);
  }, [user]);

  // Migrate local entries to cloud once, on first sign-in.
  const migrateLocalToCloud = useCallback(async () => {
    if (!user) return;
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const local = readLocal();
    if (local.length === 0) return;

    for (const entry of local) {
      await supabase.from('brand_kits').insert({
        user_id: user.id,
        brand_name: entry.brandKit.brandName,
        kit_data: entry.brandKit,
      });
    }
    writeLocal([]); // clear local copy after migration
  }, [user]);

  useEffect(() => {
    if (isCloud) {
      migrateLocalToCloud().then(loadCloud);
    } else {
      setHistory(readLocal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCloud]);

  async function save(brandKit: BrandKit) {
    if (isCloud) {
      const supabase = getSupabaseClient();
      if (!supabase || !user) return;
      await supabase.from('brand_kits').insert({
        user_id: user.id,
        brand_name: brandKit.brandName,
        kit_data: brandKit,
      });
      await loadCloud();
    } else {
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        savedAt: new Date().toISOString(),
        brandKit,
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, LOCAL_MAX);
        writeLocal(next);
        return next;
      });
    }
  }

  async function remove(id: string) {
    if (isCloud) {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      await supabase.from('brand_kits').delete().eq('id', id);
      setHistory((prev) => prev.filter((e) => e.id !== id));
    } else {
      setHistory((prev) => {
        const next = prev.filter((e) => e.id !== id);
        writeLocal(next);
        return next;
      });
    }
  }

  async function clear() {
    if (isCloud) {
      const supabase = getSupabaseClient();
      if (!supabase || !user) return;
      await supabase.from('brand_kits').delete().eq('user_id', user.id);
      setHistory([]);
    } else {
      setHistory([]);
      writeLocal([]);
    }
  }

  return { history, save, remove, clear, syncing, isCloud };
}
