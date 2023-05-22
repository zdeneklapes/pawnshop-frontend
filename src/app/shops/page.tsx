import {Metadata} from "next";

import {ParsedUrlQuery} from 'querystring';

interface GenerateMetadataParams {
  params: ParsedUrlQuery;
  searchParams: URLSearchParams;
}

export async function generateMetadata({params, searchParams}: GenerateMetadataParams): Promise<Metadata> {
  // const shop = await getShop(params.id)
  return {
    title: "TODO",
  }
}

export async function Page(): Promise<JSX.Element> {
  return (
    <>
      <h2>Shops</h2>
      <p>Shops page</p>
    </>
  );
}
