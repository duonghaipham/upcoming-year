import Head from 'next/head'
import Countdown from "components/coundown"
import Footer from "../components/footer"
import Minigame from "../components/minigame";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Upcoming year</title>
        <link rel="icon" href="img/favicon.ico" />
      </Head>

      <main>
        <Countdown />
        <Minigame />
      </main>
      <Footer />
    </div>
  )
}

export default Home;