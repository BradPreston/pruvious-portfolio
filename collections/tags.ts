import { defineCollection } from "~/.pruvious";

export default defineCollection({
  name: "tags",
  mode: "multi",
  fields: {
    title: {
      type: "text",
      options: {
        required: true,
      },
    },
  },
});
