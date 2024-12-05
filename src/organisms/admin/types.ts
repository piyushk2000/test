export type Admins = Admin[]

export interface Admin {
  id: number
  role: string
  name: string
  email: string
  username: string
  mobile: string
  picture: any
  added_by: any
  is_active: boolean
  created_at: string
  updated_at: string
  otp: any
  last_otp_generated_at: any
  otp_attempts: any
  otp_expiry: any
  block_expiry: any
  meta: Meta
}

export interface Meta {
  projects?: number[]
}

export type Groups = Group[]

export interface Group {
  id: number
  type: string
  label: string
  sublabel: string
}