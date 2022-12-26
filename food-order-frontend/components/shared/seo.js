import Head from "next/head";

export default function Seo({ title }) {
  //let pageTitle = title ? process.env.NEXT_APPLICATION_NAME +'|'+title :process.env.NEXT_APPLICATION_NAME ;
  let pageTitle = 'FoodOrder app';
  if (title)
  {
    pageTitle += '|'+title;
  }
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
