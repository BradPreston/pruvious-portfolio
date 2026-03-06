import { defineCollection } from "#pruvious";
import { pageLikeCollection } from "#pruvious/standard";

// @see https://pruvious.com/docs/collections
export default defineCollection(
  pageLikeCollection({
    name: "posts",
    pathPrefix: "blog",
    icon: "Pin",
    // allowedLayouts: ["post"],
    additionalPublicPagesFields: ["headline", "author"],
    allowedLayouts: ["post"],
    additionalFields: {
      headline: {
        type: "text",
        options: {
          label: "Headline",
          description: "If left empty, the page title will be used",
        },
      },
      author: {
        type: "record",
        options: {
          collection: "users",
          fields: ["firstName"],
          populate: true,
        },
      },
      thumbnail: {
        type: "image",
        options: {
          required: true,
        },
      },
      tags: {
        type: "records",
        options: {
          collection: "tags",
          fields: {
            title: true,
          },
          required: true,
          placeholder: "Select tags",
        },
      },
    },
  }),
);
