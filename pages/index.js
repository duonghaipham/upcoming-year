import Head from 'next/head'
import Countdown from "components/coundown"
import Footer from "../components/footer"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Upcoming year</title>
        <link rel="icon" href="img/favicon.ico" />
      </Head>

      <main>
        <Countdown />
      </main>
      <Footer />
    </div>
  )
}

export default Home;