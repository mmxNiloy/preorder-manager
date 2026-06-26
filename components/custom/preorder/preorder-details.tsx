import { getPreorderById } from "@/src/app/(server)";
import PreorderForm from "./forms/preorder-form";
import { notFound } from "next/navigation";

type Props = {
  id: string;
};

export default async function PreorderDetails({ id }: Props) {
  if (id === "new") {
    return <PreorderForm />;
  }

  const res = await getPreorderById(id);

  if (!res.ok) {
    return notFound();
  }

  return <PreorderForm data={res.data} />;
}
