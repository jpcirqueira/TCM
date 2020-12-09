/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResultMatch {
  match_id?: string
  tournament_id?: string
  player1?: any
  player2?: any
  status?: string
  score?: string
  winner?: string
  valid?: boolean
  statusCode?: number
}
export interface PostResult {
  message: string
  statusCode: number
}
