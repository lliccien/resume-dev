import { CollectionConfig } from "payload/types";
import { isAdminOrUser } from "../access";


export const Media: CollectionConfig = {
  slug: "media",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Medio",
      en: "Media",
    },
    plural: {
      es: "Medios",
      en: "Media",
    },
  },
  access: {
    create: isAdminOrUser,
    read: isAdminOrUser,
    update: isAdminOrUser,
    delete: isAdminOrUser,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ["image/jpeg", "image/png", "application/pdf"],
  
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return {
          ...data,
          user: req.user.id,
        };
      },
    ],
  },
};
