export const isDark = useDark({
  valueLight: 'light',
  valueDark: 'dark',
  storageKey: import.meta.env.VITE_COLOR_SCHEMA_STORAGE_KEY,
})
export const toggleDark = useToggle(isDark)
