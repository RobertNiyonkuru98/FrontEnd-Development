export default async function productDetails({
  params,
}: {
  params: Promise<{ productId: string; name: string }>;
}) {
  const productId = (await params).productId;
  const MyName = (await params).name;
  return (
    <>
      <h1>Details about product {productId}</h1>
      <h1>My name is {MyName}</h1>;
    </>
  );
}
