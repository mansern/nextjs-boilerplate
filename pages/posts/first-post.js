import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getSortedPostsData } from "../../lib/posts";

export async function getServerSideProps() {
  const sendDate = new Date().getTime();
  fetch("http://worldtimeapi.org/api/timezone/Asia/Karachi")
    .then((response) => response.json())
    .then((data) => {
      const receiveDate = new Date().getTime();
      const responseTimeMs = receiveDate - sendDate;
      console.log("Server Side Data", responseTimeMs);
    })
    .catch(console.error);
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className="title">
        Navigate to{" "}
        <Link href="/">
          <a>static site generated page!</a>
        </Link>
      </h1>
      <section className={utilStyles.headingMd}>
        <p>
          This page is showing data using Server Side Rendering (SSR) method.
        </p>
        <p>
          Special function: <b>getServerSideProps</b>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <h4>
          The following data is coming from the internal file placed inside this
          project.
        </h4>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
