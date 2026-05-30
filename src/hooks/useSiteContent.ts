import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, Record<string, string>>;

let cache: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

async function load() {
  const { data } = await supabase.from("site_content").select("section,key,value");
  const map: ContentMap = {};
  (data ?? []).forEach((row: any) => {
    map[row.section] ??= {};
    map[row.section][row.key] = typeof row.value === "string" ? row.value : String(row.value ?? "");
  });
  cache = map;
  listeners.forEach((l) => l(map));
}

export function useSiteContent(section: string, defaults: Record<string, string>) {
  const [map, setMap] = useState<ContentMap>(cache ?? {});

  useEffect(() => {
    listeners.add(setMap);
    if (!cache) load();
    const channel = supabase
      .channel("site_content_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => load())
      .subscribe();
    return () => {
      listeners.delete(setMap);
      supabase.removeChannel(channel);
    };
  }, []);

  const sectionMap = map[section] ?? {};
  return Object.fromEntries(
    Object.entries(defaults).map(([k, fallback]) => [k, sectionMap[k] ?? fallback]),
  ) as Record<string, string>;
}

export async function refreshSiteContent() {
  await load();
}
