export const useUserStore = defineStore('user', {
  // 持久化
  state: () => useLocalStorage('user', {
    // Define your state properties here
    name: '',
    age: 0,
    email: '',
  }),
  getters: {
    // Define your getters here
    fullName(): string {
      return `${this.name} (${this.age})`
    },
  },
  actions: {
    // Define your actions here
    setName(name: string) {
      this.name = name
    },
    // You can also use async/await
    setAge(age: number) {
      this.age = age
    },
    setEmail(email: string) {
      this.email = email
    },
  },
})
