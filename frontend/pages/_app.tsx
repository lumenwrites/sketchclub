// @ts-nocheck
import withApollo from "apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import CombinedContextsProvider from "context/CombinedContexts"
import "../styles/style.scss"


function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CombinedContextsProvider>
        <Component {...pageProps} />
      </CombinedContextsProvider>
    </ApolloProvider>
  )
}

// Tell next js that it needs to go and fetch all the queries that are in the children components
App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  // if any of the pages have getInitialProps method on them (that's what withApollo is adding to them)
  if (Component.getInitialProps) {
    // then wait and fetch it
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

// export default App
export default withApollo(App)
