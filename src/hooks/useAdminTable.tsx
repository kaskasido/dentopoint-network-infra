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
      toast.error(`Fehler beim Laden: ${error.message}`);
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
      toast.error(`Fehler: ${error.message}`);
      return false;
    }
    toast.success("Eintrag erstellt");
    await load();
    return true;
  };

  const update = async (id: string, values: Record<string, any>) => {
    const { error } = await supabase.from(table).update(values as any).eq("id", id);
    if (error) {
      toast.error(`Fehler: ${error.message}`);
      return false;
    }
    toast.success("Eintrag aktualisiert");
    await load();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      toast.error(`Fehler: ${error.message}`);
      return false;
    }
    toast.success("Eintrag gelöscht");
    await load();
    return true;
  };

  return { rows, loading, reload: load, insert, update, remove };
}
