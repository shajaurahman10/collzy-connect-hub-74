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
      college_entrance_exams: {
        Row: {
          college_id: string | null
          created_at: string
          cutoff_rank: number | null
          cutoff_score: number | null
          entrance_exam_id: string | null
          id: string
          seats_available: number | null
        }
        Insert: {
          college_id?: string | null
          created_at?: string
          cutoff_rank?: number | null
          cutoff_score?: number | null
          entrance_exam_id?: string | null
          id?: string
          seats_available?: number | null
        }
        Update: {
          college_id?: string | null
          created_at?: string
          cutoff_rank?: number | null
          cutoff_score?: number | null
          entrance_exam_id?: string | null
          id?: string
          seats_available?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "college_entrance_exams_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_entrance_exams_entrance_exam_id_fkey"
            columns: ["entrance_exam_id"]
            isOneToOne: false
            referencedRelation: "entrance_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          accreditations: string[] | null
          address: string | null
          admission_email: string | null
          affiliation: string | null
          average_package: number | null
          brochure_url: string | null
          campus_size: string | null
          city: string
          courses_offered: string[] | null
          created_at: string
          established_year: number | null
          facilities: string[] | null
          faculty_count: number | null
          featured: boolean | null
          highest_package: number | null
          hostel_available: boolean | null
          id: string
          image_url: string | null
          library_books: number | null
          naac_grade: string | null
          name: string
          nirf_ranking: number | null
          phone: string | null
          placement_percentage: number | null
          state: string
          status: string | null
          student_strength: number | null
          total_fees: number | null
          type: string
          updated_at: string
          virtual_tour_url: string | null
          website: string | null
        }
        Insert: {
          accreditations?: string[] | null
          address?: string | null
          admission_email?: string | null
          affiliation?: string | null
          average_package?: number | null
          brochure_url?: string | null
          campus_size?: string | null
          city: string
          courses_offered?: string[] | null
          created_at?: string
          established_year?: number | null
          facilities?: string[] | null
          faculty_count?: number | null
          featured?: boolean | null
          highest_package?: number | null
          hostel_available?: boolean | null
          id?: string
          image_url?: string | null
          library_books?: number | null
          naac_grade?: string | null
          name: string
          nirf_ranking?: number | null
          phone?: string | null
          placement_percentage?: number | null
          state: string
          status?: string | null
          student_strength?: number | null
          total_fees?: number | null
          type?: string
          updated_at?: string
          virtual_tour_url?: string | null
          website?: string | null
        }
        Update: {
          accreditations?: string[] | null
          address?: string | null
          admission_email?: string | null
          affiliation?: string | null
          average_package?: number | null
          brochure_url?: string | null
          campus_size?: string | null
          city?: string
          courses_offered?: string[] | null
          created_at?: string
          established_year?: number | null
          facilities?: string[] | null
          faculty_count?: number | null
          featured?: boolean | null
          highest_package?: number | null
          hostel_available?: boolean | null
          id?: string
          image_url?: string | null
          library_books?: number | null
          naac_grade?: string | null
          name?: string
          nirf_ranking?: number | null
          phone?: string | null
          placement_percentage?: number | null
          state?: string
          status?: string | null
          student_strength?: number | null
          total_fees?: number | null
          type?: string
          updated_at?: string
          virtual_tour_url?: string | null
          website?: string | null
        }
        Relationships: []
      }
      entrance_exams: {
        Row: {
          application_end_date: string | null
          application_start_date: string | null
          conducting_body: string
          created_at: string
          description: string | null
          eligibility_criteria: string | null
          exam_date: string | null
          exam_level: string
          exam_pattern: string | null
          exam_type: string
          full_name: string
          id: string
          logo_url: string | null
          name: string
          official_website: string
          participating_colleges: string[] | null
          registration_fee: number | null
          status: string | null
          syllabus_url: string | null
        }
        Insert: {
          application_end_date?: string | null
          application_start_date?: string | null
          conducting_body: string
          created_at?: string
          description?: string | null
          eligibility_criteria?: string | null
          exam_date?: string | null
          exam_level: string
          exam_pattern?: string | null
          exam_type: string
          full_name: string
          id?: string
          logo_url?: string | null
          name: string
          official_website: string
          participating_colleges?: string[] | null
          registration_fee?: number | null
          status?: string | null
          syllabus_url?: string | null
        }
        Update: {
          application_end_date?: string | null
          application_start_date?: string | null
          conducting_body?: string
          created_at?: string
          description?: string | null
          eligibility_criteria?: string | null
          exam_date?: string | null
          exam_level?: string
          exam_pattern?: string | null
          exam_type?: string
          full_name?: string
          id?: string
          logo_url?: string | null
          name?: string
          official_website?: string
          participating_colleges?: string[] | null
          registration_fee?: number | null
          status?: string | null
          syllabus_url?: string | null
        }
        Relationships: []
      }
      private_colleges: {
        Row: {
          admission_email: string | null
          affiliation: string | null
          city: string | null
          contact_number: string | null
          created_at: string
          id: number
          naac_grade: string | null
          name: string | null
          state: string | null
          website: string | null
        }
        Insert: {
          admission_email?: string | null
          affiliation?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          id?: number
          naac_grade?: string | null
          name?: string | null
          state?: string | null
          website?: string | null
        }
        Update: {
          admission_email?: string | null
          affiliation?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          id?: number
          naac_grade?: string | null
          name?: string | null
          state?: string | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          course_interest: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          marks: string | null
          phone: string | null
          state: string | null
        }
        Insert: {
          course_interest?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          marks?: string | null
          phone?: string | null
          state?: string | null
        }
        Update: {
          course_interest?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          marks?: string | null
          phone?: string | null
          state?: string | null
        }
        Relationships: []
      }
      student_applications: {
        Row: {
          application_date: string
          application_status: string | null
          college_id: string | null
          created_at: string
          entrance_exam_id: string | null
          id: string
          notes: string | null
          user_id: string | null
        }
        Insert: {
          application_date?: string
          application_status?: string | null
          college_id?: string | null
          created_at?: string
          entrance_exam_id?: string | null
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          application_date?: string
          application_status?: string | null
          college_id?: string | null
          created_at?: string
          entrance_exam_id?: string | null
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_applications_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_applications_entrance_exam_id_fkey"
            columns: ["entrance_exam_id"]
            isOneToOne: false
            referencedRelation: "entrance_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          age: number | null
          course_interest: string | null
          created_at: string | null
          email: string
          id: string
          marks_percentage: number | null
          name: string
          phone: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          course_interest?: string | null
          created_at?: string | null
          email: string
          id?: string
          marks_percentage?: number | null
          name: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          course_interest?: string | null
          created_at?: string | null
          email?: string
          id?: string
          marks_percentage?: number | null
          name?: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
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
