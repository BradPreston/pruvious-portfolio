import { defineCollection } from "~/.pruvious";

export default defineCollection({
  name: "settings",
  mode: "single",
  apiRoutes: {
    read: "public",
  },
  fields: {
    copyrightText: {
      type: "text",
      options: {
        required: true,
      },
    },
    socialMedia: {
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
            type: "text",
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
        addLabel: "Add social media link",
        fieldLayout: [["icon | 12rem", "link", "title"]],
      },
    },
  },
});
