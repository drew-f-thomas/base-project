/**
 * Common TypeScript utility types
 */

// Make all properties optional recursively
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

// Make all properties required recursively
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>
    }
  : T

// Extract the type of array elements
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

// Nullable type helper
export type Nullable<T> = T | null

// Maybe type helper (nullable or undefined)
export type Maybe<T> = T | null | undefined

// Extract keys of an object that have a specific value type
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

// Omit multiple properties from a type
export type OmitMultiple<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// Make specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Make specific properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

// Async function return type
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never

// Union to intersection type
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

// Type guard helper
export function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
