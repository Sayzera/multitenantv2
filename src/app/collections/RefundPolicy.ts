import type { CollectionConfig } from "payload";

export const RefundPolicy: CollectionConfig = {
  slug: "refundPolicy",
  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
