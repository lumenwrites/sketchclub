import { ModalContextProvider } from "context/ModalContext"

export default function CombinedContextsProvider({ children }) {
  return (
    <ModalContextProvider>
      { children }
    </ModalContextProvider>
  )
}
