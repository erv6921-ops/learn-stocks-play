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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assigned_lessons: {
        Row: {
          assigned_at: string
          assigned_by: string
          class_id: string
          id: string
          lesson_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          class_id: string
          id?: string
          lesson_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          class_id?: string
          id?: string
          lesson_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assigned_lessons_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_items: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      benchmark_attempts: {
        Row: {
          completed_at: string | null
          correct_count: number | null
          created_at: string
          id: string
          overall_score: number | null
          skipped: boolean | null
          started_at: string
          total_questions: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          correct_count?: number | null
          created_at?: string
          id?: string
          overall_score?: number | null
          skipped?: boolean | null
          started_at?: string
          total_questions?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          correct_count?: number | null
          created_at?: string
          id?: string
          overall_score?: number | null
          skipped?: boolean | null
          started_at?: string
          total_questions?: number | null
          user_id?: string
        }
        Relationships: []
      }
      benchmark_results: {
        Row: {
          attempt_id: string
          category_scores: Json
          created_at: string
          id: string
          reward_multiplier: number
          user_id: string
        }
        Insert: {
          attempt_id: string
          category_scores?: Json
          created_at?: string
          id?: string
          reward_multiplier?: number
          user_id: string
        }
        Update: {
          attempt_id?: string
          category_scores?: Json
          created_at?: string
          id?: string
          reward_multiplier?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "benchmark_results_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "benchmark_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      business_finances: {
        Row: {
          business_id: string
          created_at: string
          date: string
          expenses: number
          id: string
          notes: string | null
          revenue: number
        }
        Insert: {
          business_id: string
          created_at?: string
          date?: string
          expenses?: number
          id?: string
          notes?: string | null
          revenue?: number
        }
        Update: {
          business_id?: string
          created_at?: string
          date?: string
          expenses?: number
          id?: string
          notes?: string | null
          revenue?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_finances_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_tasks: {
        Row: {
          business_id: string
          category: string
          created_at: string
          description: string | null
          id: string
          status: string
          title: string
        }
        Insert: {
          business_id: string
          category: string
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title: string
        }
        Update: {
          business_id?: string
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_tasks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          created_at: string
          id: string
          level: number
          name: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: number
          name: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number
          name?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      class_members: {
        Row: {
          class_id: string
          id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          class_id: string
          id?: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          class_id?: string
          id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_members_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          join_code: string
          name: string
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          join_code: string
          name: string
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          join_code?: string
          name?: string
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jeffs_history: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          quiz_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          quiz_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_listings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          price: number
          seller_user_id: string
          status: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          price: number
          seller_user_id: string
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          seller_user_id?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          id: string
          purchase_price: number
          purchased_at: string
          shares: number
          symbol: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          purchase_price: number
          purchased_at?: string
          shares: number
          symbol: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          purchase_price?: number
          purchased_at?: string
          shares?: number
          symbol?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          assessment_score: number | null
          benchmark_category_scores: Json | null
          benchmark_scores: Json | null
          class_code: string | null
          created_at: string | null
          email: string
          first_name: string | null
          grade: number | null
          id: string
          jeffs_balance: number
          last_name: string | null
          literacy_level: string | null
          onboarding_complete: boolean | null
          reward_multiplier: number | null
          role: Database["public"]["Enums"]["app_role"] | null
          school_name: string | null
          state_course: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          assessment_score?: number | null
          benchmark_category_scores?: Json | null
          benchmark_scores?: Json | null
          class_code?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          grade?: number | null
          id: string
          jeffs_balance?: number
          last_name?: string | null
          literacy_level?: string | null
          onboarding_complete?: boolean | null
          reward_multiplier?: number | null
          role?: Database["public"]["Enums"]["app_role"] | null
          school_name?: string | null
          state_course?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          assessment_score?: number | null
          benchmark_category_scores?: Json | null
          benchmark_scores?: Json | null
          class_code?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          grade?: number | null
          id?: string
          jeffs_balance?: number
          last_name?: string | null
          literacy_level?: string | null
          onboarding_complete?: boolean | null
          reward_multiplier?: number | null
          role?: Database["public"]["Enums"]["app_role"] | null
          school_name?: string | null
          state_course?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          buyer_user_id: string
          created_at: string
          id: string
          listing_id: string
          price: number
          seller_user_id: string
        }
        Insert: {
          buyer_user_id: string
          created_at?: string
          id?: string
          listing_id: string
          price: number
          seller_user_id: string
        }
        Update: {
          buyer_user_id?: string
          created_at?: string
          id?: string
          listing_id?: string
          price?: number
          seller_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_fundamentals: {
        Row: {
          avg_volume_3m: number | null
          beta: number | null
          day_high: number | null
          day_low: number | null
          dividend_rate: number | null
          dividend_yield: number | null
          ebitda: number | null
          eps: number | null
          ex_dividend_date: string | null
          float_shares: number | null
          forward_eps: number | null
          forward_pe: number | null
          high_52_week: number | null
          low_52_week: number | null
          market_cap: number | null
          open_price: number | null
          operating_margin: number | null
          pe_ratio: number | null
          previous_close: number | null
          price_to_book: number | null
          price_to_sales: number | null
          profit_margin: number | null
          revenue: number | null
          security_type: string | null
          shares_outstanding: number | null
          symbol: string
          target_est: number | null
          updated_at: string
        }
        Insert: {
          avg_volume_3m?: number | null
          beta?: number | null
          day_high?: number | null
          day_low?: number | null
          dividend_rate?: number | null
          dividend_yield?: number | null
          ebitda?: number | null
          eps?: number | null
          ex_dividend_date?: string | null
          float_shares?: number | null
          forward_eps?: number | null
          forward_pe?: number | null
          high_52_week?: number | null
          low_52_week?: number | null
          market_cap?: number | null
          open_price?: number | null
          operating_margin?: number | null
          pe_ratio?: number | null
          previous_close?: number | null
          price_to_book?: number | null
          price_to_sales?: number | null
          profit_margin?: number | null
          revenue?: number | null
          security_type?: string | null
          shares_outstanding?: number | null
          symbol: string
          target_est?: number | null
          updated_at?: string
        }
        Update: {
          avg_volume_3m?: number | null
          beta?: number | null
          day_high?: number | null
          day_low?: number | null
          dividend_rate?: number | null
          dividend_yield?: number | null
          ebitda?: number | null
          eps?: number | null
          ex_dividend_date?: string | null
          float_shares?: number | null
          forward_eps?: number | null
          forward_pe?: number | null
          high_52_week?: number | null
          low_52_week?: number | null
          market_cap?: number | null
          open_price?: number | null
          operating_margin?: number | null
          pe_ratio?: number | null
          previous_close?: number | null
          price_to_book?: number | null
          price_to_sales?: number | null
          profit_margin?: number | null
          revenue?: number | null
          security_type?: string | null
          shares_outstanding?: number | null
          symbol?: string
          target_est?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      stock_stats: {
        Row: {
          high_52_week: number | null
          low_52_week: number | null
          market_cap: number | null
          pe_ratio: number | null
          symbol: string
          updated_at: string | null
          volume: number | null
        }
        Insert: {
          high_52_week?: number | null
          low_52_week?: number | null
          market_cap?: number | null
          pe_ratio?: number | null
          symbol: string
          updated_at?: string | null
          volume?: number | null
        }
        Update: {
          high_52_week?: number | null
          low_52_week?: number | null
          market_cap?: number | null
          pe_ratio?: number | null
          symbol?: string
          updated_at?: string | null
          volume?: number | null
        }
        Relationships: []
      }
      symbols: {
        Row: {
          active: boolean
          currency: string | null
          exchange: string
          name: string
          symbol: string
          type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          currency?: string | null
          exchange?: string
          name: string
          symbol: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          currency?: string | null
          exchange?: string
          name?: string
          symbol?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      unit_test_progress: {
        Row: {
          category: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          score?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_avatar_inventory: {
        Row: {
          id: string
          item_id: string
          owned_at: string
          user_id: string
        }
        Insert: {
          id?: string
          item_id: string
          owned_at?: string
          user_id: string
        }
        Update: {
          id?: string
          item_id?: string
          owned_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_avatar_inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "avatar_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          created_at: string
          id: string
          market_cap: number
          name: string
          price_simulation: number
          symbol: string
          total_supply: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          market_cap: number
          name: string
          price_simulation: number
          symbol: string
          total_supply: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          market_cap?: number
          name?: string
          price_simulation?: number
          symbol?: string
          total_supply?: number
          user_id?: string
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          created_at: string
          id: string
          symbol: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          symbol: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          symbol?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_join_code: { Args: never; Returns: string }
      get_class_leaderboard: {
        Args: { _class_id: string }
        Returns: {
          user_id: string
          first_name: string
          last_name: string
          xp: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_class_member: {
        Args: { _class_id: string; _user_id: string }
        Returns: boolean
      }
      is_class_teacher: {
        Args: { _class_id: string; _user_id: string }
        Returns: boolean
      }
      lookup_class_by_join_code: {
        Args: { _code: string }
        Returns: {
          id: string
          name: string
        }[]
      }
      search_symbols: {
        Args: {
          filter_exchange?: string
          filter_type?: string
          query_text: string
          result_limit?: number
          result_offset?: number
        }
        Returns: {
          active: boolean
          currency: string
          exchange: string
          match_priority: number
          name: string
          symbol: string
          type: string
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      app_role: "teacher" | "student"
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
      app_role: ["teacher", "student"],
    },
  },
} as const
