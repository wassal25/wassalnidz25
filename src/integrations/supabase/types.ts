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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
