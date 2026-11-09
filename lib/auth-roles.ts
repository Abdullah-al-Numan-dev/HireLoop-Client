export const USER_ROLES = ["seeker", "recruiter", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

// better-auth reads the field `type` to infer the value and to build the
// client schema. A mutable literal array keeps the union instead of widening
// to `string`.
export const USER_ROLE_VALUES: UserRole[] = [...USER_ROLES]

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  )
}

// better-auth validates additional user fields with a Standard Schema. This is
// kept inline so the auth config does not need an extra validation dependency.
export const userRoleValidator = {
  "~standard": {
    version: 1 as const,
    vendor: "hireloop",
    validate(value: unknown) {
      return isUserRole(value)
        ? { value }
        : {
            issues: [
              {
                message: "Role must be one of: seeker, recruiter, admin",
              },
            ],
          }
    },
  },
}
