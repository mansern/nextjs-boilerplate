import Head from "next/head";
import Link from "next/link";
import useSwr from "swr";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps() {
  var sendDate = new Date().getTime();
  fetch("http://worldtimeapi.org/api/timezone/Asia/Karachi")
    .then((response) => response.json())
    .then((data) => {
      const receiveDate = new Date().getTime();
      const responseTimeMs = receiveDate - sendDate;
      console.log("Static Side Data", responseTimeMs);
    })
    .catch(console.error);

  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ ...props }) {
  const { data, error } = useSwr("/api/hello", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h4>
        The following data is coming from the nodejs server developed internally
        inside this Nextjs app by calling that API.
      </h4>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <Link href="/user/[id]" as={`/user/${user.id}`}>
              <a>{`User ${user.id}`}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="title">
        Navigate to{" "}
        <Link href="/posts/first-post">
          <a>server side rendered page!</a>
        </Link>
      </h1>
      <section className={utilStyles.headingMd}>
        <p>
          This page is showing data using Static Site Generation (SSG) method.
        </p>
        <p>
          Special function: <b>getStaticProps</b>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <h4>
          The following data is coming from the internal file placed inside this
          project.
        </h4>
        <ul className={utilStyles.list}>
          {props.allPostsData.map(({ id, date, title }) => (
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
