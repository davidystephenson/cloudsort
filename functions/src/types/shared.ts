export interface User extends Record<string, unknown> {
  displayName: string
  uid: string
}

export interface Registration extends Record<string, unknown> {
  displayName: string
  email: string
}

export interface CreateListProps {
  title: string
}

export interface List extends Record<string, unknown> {
  title: string
}
