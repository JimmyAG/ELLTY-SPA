// We need to augment the session object to pass new keys such as id in this case!
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id and additional properties. */
      id: number
    } & DefaultSession['user']
  }
}

export default Session
