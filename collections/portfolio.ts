import { defineCollection } from "~/.pruvious";

export default defineCollection({
  name: "portfolio",
  mode: "multi",
  fields: {
    title: {
      type: "text",
      options: {
        required: true,
      },
    },
    thumbnail: {
      type: "image",
      options: {
        required: true,
      },
    },
    description: {
      type: "editor",
      options: {
        required: true,
      },
    },
    links: {
      type: "repeater",
      options: {
        subfields: {
          icon: {
            type: "icon",
            options: {
              required: true,
            },
          },
          link: {
            type: "link",
            options: {
              required: true,
            },
          },
          title: {
            type: "text",
            options: {
              description: "An optional title displayed on hover",
            },
          },
        },
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
});
