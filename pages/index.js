import Head from 'next/head'
import Countdown from "components/coundown"
import Footer from "components/footer"
import Minigame from "components/minigame";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Năm mới Tết đến</title>
        <link rel="icon" href="img/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
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