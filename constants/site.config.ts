import { Preorder } from "@/src/generated/prisma/client";
import { format } from "date-fns";

export const SiteConfig = {
  meta: {
    title: "Preorder Manager",
    description: "Manage your preorders",
    authors: [
      {
        name: "Ashirbad Sarkar",
        url: "https://ashirbadsarkar.vercel.app",
      },
    ],

    preorder: {
      new: {
        title: "New Preorder | Preorder Manager",
        description: "Fill up the form to create a new preorder.",
      },
      notFound: {
        title: "Preorder Not Found | Preorder Manager",
        description:
          "The preorder you are looking for does not exist. If you think this is an error, please contact the administrator.",
      },

      makeTitle: (name: string) => `Preorder: ${name} | Preorder Manager`,
      makeDescription: (preorder: Preorder) =>
        `View the preorder details for ${preorder.name}. Preorder starts at ${format(preorder.startsAt, "MMM d, yyyy hh:mm a")} and ends at ${preorder.endsAt ? format(preorder.endsAt, "MMM d, yyyy hh:mm a") : "N/A"}. This preorder was created at ${format(preorder.createdAt, "MMM d, yyyy hh:mm a")} and last updated at ${format(preorder.updatedAt, "MMM d, yyyy hh:mm a")}.`,
    },
  },
};
