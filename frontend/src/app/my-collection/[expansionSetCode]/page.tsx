import CardCollection from "../../../components/CardCollection";

export default async function Page({
  params,
}: {
  params: Promise<{ expansionSetCode: string }>;
}) {
  const { expansionSetCode } = await params;
  return <CardCollection expansionSetCode={expansionSetCode} />;
}
