import { ModalContextProvider } from "context/ModalContext"
import { AuthContextProvider } from "context/AuthContext"
export default function CombinedContextsProvider({ children }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthContextProvider>
  )
}
