import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type TableName =
  | "automats"
  | "orders"
  | "alerts"
  | "maintenance_logs"
  | "commissions"
  | "profiles"
  | "user_roles"
  | "organizations";

interface Options {
  orderBy?: { column: string; ascending?: boolean };
}

// Map known Postgres / PostgREST error codes to safe user-facing messages.
// Raw error.message values can leak schema details (table/column/constraint names).
function friendlyError(error: { code?: string; message?: string } | null | undefined, fallback: string): string {
  const code = error?.code ?? "";
  switch (code) {
    case "23505": return "Ein Eintrag mit diesem Wert existiert bereits.";
    case "23503": return "Verknüpfter Datensatz fehlt oder wird noch verwendet.";
    case "23502": return "Ein Pflichtfeld fehlt.";
    case "23514": return "Eingabe entspricht nicht den Vorgaben.";
    case "42501":
    case "PGRST301":
    case "PGRST302": return "Keine Berechtigung für diese Aktion.";
    case "PGRST116": return "Datensatz nicht gefunden.";
    default:        return fallback;
  }
}

export function useAdminTable<T = any>(table: TableName, opts: Options = {}) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select("*");
    if (opts.orderBy) {
      query = query.order(opts.orderBy.column, { ascending: opts.orderBy.ascending ?? false });
    }
    const { data, error } = await query;
    if (error) {
      console.error("[useAdminTable load]", table, error);
      toast.error(friendlyError(error, "Daten konnten nicht geladen werden."));
      setRows([]);
    } else {
      setRows((data ?? []) as T[]);
    }
    setLoading(false);
  }, [table, opts.orderBy?.column, opts.orderBy?.ascending]);

  useEffect(() => {
    load();
  }, [load]);

  const insert = async (values: Record<string, any>) => {
    const { error } = await supabase.from(table).insert(values as any);
    if (error) {
      console.error("[useAdminTable insert]", table, error);
      toast.error(friendlyError(error, "Eintrag konnte nicht erstellt werden."));
      return false;
    }
    toast.success("Eintrag erstellt");
    await load();
    return true;
  };

  const update = async (id: string, values: Record<string, any>) => {
    const { error } = await supabase.from(table).update(values as any).eq("id", id);
    if (error) {
      console.error("[useAdminTable update]", table, error);
      toast.error(friendlyError(error, "Eintrag konnte nicht gespeichert werden."));
      return false;
    }
    toast.success("Eintrag aktualisiert");
    await load();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      console.error("[useAdminTable remove]", table, error);
      toast.error(friendlyError(error, "Eintrag konnte nicht gelöscht werden."));
      return false;
    }
    toast.success("Eintrag gelöscht");
    await load();
    return true;
  };

  return { rows, loading, reload: load, insert, update, remove };
}
