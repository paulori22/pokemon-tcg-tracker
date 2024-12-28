import CardCollection from "../../../components/CardCollection";

/* export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/card-expansion-set");
  const cardExpansionSets =
    (await response.json()) as CardExpansionSetApiResponse;
  return cardExpansionSets.map((expansionSet) => ({
    expansionSetCode: expansionSet.code,
  }));
}
 */
export default async function Page({
  params,
}: {
  params: Promise<{ expansionSetCode: string }>;
}) {
  const { expansionSetCode } = await params;
  return <CardCollection expansionSetCode={expansionSetCode} />;
}
