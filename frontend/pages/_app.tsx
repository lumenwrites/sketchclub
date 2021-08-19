// @ts-nocheck
import withApollo from "apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import CombinedContextsProvider from "context/CombinedContexts"
import "../styles/style.scss"
import { ComponentType } from "react"

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CombinedContextsProvider>
        <Component {...pageProps} />
      </CombinedContextsProvider>
    </ApolloProvider>
  )
}

// export default App
export default withApollo(App)
