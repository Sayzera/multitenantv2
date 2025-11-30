import { parseAsBoolean, useQueryStates } from 'nuqs'

export const useCheckoutStates = () => {
  return useQueryStates({
    success: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
    cancel: parseAsBoolean.withDefault(true).withOptions({
      clearOnDefault: true,
    }),
  })
}
