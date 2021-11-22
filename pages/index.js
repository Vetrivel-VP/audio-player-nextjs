import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AudioPlayer } from "../Components/AudioPlayer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sample Music Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AudioPlayer />
      </main>
    </div>
  );
}
