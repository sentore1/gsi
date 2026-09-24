export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          user_type: 'individual' | 'business' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          user_type?: 'individual' | 'business' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          user_type?: 'individual' | 'business' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      businesses: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          location: string | null
          phone: string | null
          website: string | null
          logo_url: string | null
          owner_id: string
          is_gsi_member: boolean
          member_since: string | null
          membership_type: 'basic' | 'business' | 'corporate'
          membership_status: string | null
          membership_expiry: string | null
          payment_status: string | null
          payment_amount: number | null
          payment_proof_url: string | null
          payment_date: string | null
          payment_verified_by: string | null
          payment_verified_at: string | null
          payment_rejection_reason: string | null
          overall_rating: number | null
          total_ratings: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          location?: string | null
          phone?: string | null
          website?: string | null
          logo_url?: string | null
          owner_id: string
          is_gsi_member?: boolean
          member_since?: string | null
          membership_type?: 'basic' | 'business' | 'corporate'
          membership_status?: string | null
          membership_expiry?: string | null
          payment_status?: string | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_date?: string | null
          payment_verified_by?: string | null
          payment_verified_at?: string | null
          payment_rejection_reason?: string | null
          overall_rating?: number | null
          total_ratings?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          location?: string | null
          phone?: string | null
          website?: string | null
          logo_url?: string | null
          owner_id?: string
          is_gsi_member?: boolean
          member_since?: string | null
          membership_type?: 'basic' | 'business' | 'corporate'
          membership_status?: string | null
          membership_expiry?: string | null
          payment_status?: string | null
          payment_amount?: number | null
          payment_proof_url?: string | null
          payment_date?: string | null
          payment_verified_by?: string | null
          payment_verified_at?: string | null
          payment_rejection_reason?: string | null
          overall_rating?: number | null
          total_ratings?: number
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          business_id: string
          user_id: string | null
          entrance: number | null
          interaction: number | null
          heart_factor: number | null
          responsiveness: number | null
          problem_resolution: number | null
          exit: number | null
          overall_rating: number
          comment: string | null
          status: 'verified' | 'pending' | 'flagged' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          user_id?: string | null
          entrance?: number | null
          interaction?: number | null
          heart_factor?: number | null
          responsiveness?: number | null
          problem_resolution?: number | null
          exit?: number | null
          overall_rating: number
          comment?: string | null
          status?: 'verified' | 'pending' | 'flagged' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string | null
          entrance?: number | null
          interaction?: number | null
          heart_factor?: number | null
          responsiveness?: number | null
          problem_resolution?: number | null
          exit?: number | null
          overall_rating?: number
          comment?: string | null
          status?: 'verified' | 'pending' | 'flagged' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      rating_categories: {
        Row: {
          id: string
          business_id: string
          entrance_avg: number | null
          interaction_avg: number | null
          heart_factor_avg: number | null
          responsiveness_avg: number | null
          problem_resolution_avg: number | null
          exit_avg: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          entrance_avg?: number | null
          interaction_avg?: number | null
          heart_factor_avg?: number | null
          responsiveness_avg?: number | null
          problem_resolution_avg?: number | null
          exit_avg?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          entrance_avg?: number | null
          interaction_avg?: number | null
          heart_factor_avg?: number | null
          responsiveness_avg?: number | null
          problem_resolution_avg?: number | null
          exit_avg?: number | null
          updated_at?: string
        }
      }
      business_responses: {
        Row: {
          id: string
          rating_id: string
          business_id: string
          response_text: string
          created_at: string
        }
        Insert: {
          id?: string
          rating_id: string
          business_id: string
          response_text: string
          created_at?: string
        }
        Update: {
          id?: string
          rating_id?: string
          business_id?: string
          response_text?: string
          created_at?: string
        }
      }
      payment_history: {
        Row: {
          id: string
          business_id: string
          membership_type: 'basic' | 'business' | 'corporate'
          amount: number
          payment_proof_url: string
          status: string
          verified_by: string | null
          verified_at: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          membership_type: 'basic' | 'business' | 'corporate'
          amount: number
          payment_proof_url: string
          status?: string
          verified_by?: string | null
          verified_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          membership_type?: 'basic' | 'business' | 'corporate'
          amount?: number
          payment_proof_url?: string
          status?: string
          verified_by?: string | null
          verified_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'individual' | 'business' | 'admin'
      rating_status: 'verified' | 'pending' | 'flagged' | 'rejected'
      membership_type: 'basic' | 'business' | 'corporate'
    }
  }
}
