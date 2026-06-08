export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged: boolean
          acknowledged_at: string | null
          acknowledged_by: string | null
          automat_id: string | null
          created_at: string
          id: string
          message: string | null
          severity: string
          title: string
        }
        Insert: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          automat_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          severity?: string
          title: string
        }
        Update: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          automat_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          severity?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "automats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "public_automat_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      automats: {
        Row: {
          address: string | null
          city: string | null
          clinic_id: string | null
          country: string | null
          created_at: string
          id: string
          installed_at: string | null
          latitude: number | null
          longitude: number | null
          manufacturer_id: string | null
          name: string
          serial_number: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          clinic_id?: string | null
          country?: string | null
          created_at?: string
          id?: string
          installed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          manufacturer_id?: string | null
          name: string
          serial_number: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          clinic_id?: string | null
          country?: string | null
          created_at?: string
          id?: string
          installed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          manufacturer_id?: string | null
          name?: string
          serial_number?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automats_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automats_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string
          deal_name: string
          deal_value: number
          id: string
          notes: string | null
          paid_at: string | null
          partner_id: string
          status: string
          territory: string | null
          updated_at: string
        }
        Insert: {
          commission_amount: number
          commission_rate?: number
          created_at?: string
          deal_name: string
          deal_value: number
          id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id: string
          status?: string
          territory?: string | null
          updated_at?: string
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          deal_name?: string
          deal_value?: number
          id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id?: string
          status?: string
          territory?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      maintenance_logs: {
        Row: {
          automat_id: string
          completed_at: string | null
          cost: number | null
          created_at: string
          description: string | null
          id: string
          maintenance_type: string
          scheduled_at: string | null
          status: string
          technician_id: string | null
          technician_name: string | null
          updated_at: string
        }
        Insert: {
          automat_id: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          maintenance_type: string
          scheduled_at?: string | null
          status?: string
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string
        }
        Update: {
          automat_id?: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          maintenance_type?: string
          scheduled_at?: string | null
          status?: string
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_logs_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "automats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_logs_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "public_automat_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_logs_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      manufacturers: {
        Row: {
          contact_email: string | null
          country: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          owner_user_id: string | null
          phone: string | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          owner_user_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          owner_user_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          automat_id: string | null
          clinic_id: string
          created_at: string
          currency: string
          delivered_at: string | null
          id: string
          items: Json
          notes: string | null
          order_number: string
          ordered_at: string
          quantity: number
          status: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          automat_id?: string | null
          clinic_id: string
          created_at?: string
          currency?: string
          delivered_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number: string
          ordered_at?: string
          quantity?: number
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          automat_id?: string | null
          clinic_id?: string
          created_at?: string
          currency?: string
          delivered_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number?: string
          ordered_at?: string
          quantity?: number
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "automats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_automat_id_fkey"
            columns: ["automat_id"]
            isOneToOne: false
            referencedRelation: "public_automat_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      manufacturers_public: {
        Row: {
          id: string | null
          logo_url: string | null
          name: string | null
        }
        Insert: {
          id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Update: {
          id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      public_automat_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          status: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          id?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          status?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          id?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_initial_role: { Args: never; Returns: undefined }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "clinic" | "manufacturer" | "investor" | "admin" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["clinic", "manufacturer", "investor", "admin", "partner"],
    },
  },
} as const
