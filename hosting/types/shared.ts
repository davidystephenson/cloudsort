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

export interface List extends Record<string, unknown> {
  displayName: string
  name: string
  uid: string
}
