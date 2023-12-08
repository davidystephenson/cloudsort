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
  title: string
}

export interface List extends Record<string, unknown> {
  title: string
  uid: string
}
