
const resolvers = {
  Date: (value: string | number | Date): string => new Date(value).toISOString(),
  Query: {
    wakeUp: (): string => 'DIG API'
  }
}

export default resolvers
