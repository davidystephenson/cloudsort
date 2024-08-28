import { Item, State } from '../service/mergeChoice/types'

export interface User extends Record<string, unknown> {
  displayName: string
  uid: string
}

export interface RegisterUserProps extends Record<string, unknown> {
  displayName: string
  email: string
  password: string
}

export interface CreateListProps {
  name: string
}

export interface Movie extends Item {
  score: number
  date: Date
  imdbId: string
  review: string
  url: string
  year: number
}

export interface List extends Record<string, unknown> {
  displayName: string
  name: string
  state: State<Movie>
  uid: string
}

export interface UploadProps {
  movies: Movie[]
  listId: string
}
