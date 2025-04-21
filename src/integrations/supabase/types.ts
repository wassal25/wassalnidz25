export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          trip_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          trip_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          content: string
          created_at: string
          email: string
          full_name: string
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          driver_license: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone_number: string | null
          profile_image: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          driver_license?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          phone_number?: string | null
          profile_image?: string | null
          updated_at?: string
          user_type?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          driver_license?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone_number?: string | null
          profile_image?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          passenger_id: string
          payment_method: string | null
          phone_number: string | null
          seats_booked: number
          status: string
          trip_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          passenger_id: string
          payment_method?: string | null
          phone_number?: string | null
          seats_booked?: number
          status?: string
          trip_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          passenger_id?: string
          payment_method?: string | null
          phone_number?: string | null
          seats_booked?: number
          status?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      social_connections: {
        Row: {
          created_at: string
          id: string
          provider: string
          provider_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider: string
          provider_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          provider?: string
          provider_id?: string
          user_id?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string
          date: string
          driver_id: string | null
          from_location: string
          id: string
          image: string
          price: number
          seats: number
          time: string
          to_location: string
          vehicle_info: Json | null
        }
        Insert: {
          created_at?: string
          date: string
          driver_id?: string | null
          from_location: string
          id?: string
          image: string
          price: number
          seats: number
          time: string
          to_location: string
          vehicle_info?: Json | null
        }
        Update: {
          created_at?: string
          date?: string
          driver_id?: string | null
          from_location?: string
          id?: string
          image?: string
          price?: number
          seats?: number
          time?: string
          to_location?: string
          vehicle_info?: Json | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string
          created_at: string
          driver_id: string
          id: string
          image: string | null
          model: string
          registration_number: string
        }
        Insert: {
          brand: string
          created_at?: string
          driver_id: string
          id?: string
          image?: string | null
          model: string
          registration_number: string
        }
        Update: {
          brand?: string
          created_at?: string
          driver_id?: string
          id?: string
          image?: string | null
          model?: string
          registration_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
