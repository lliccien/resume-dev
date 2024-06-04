import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Interests: CollectionConfig = {
  slug: "interests",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Interés",
      en: "Interest",
    },
    plural: {
      es: "Intereses",
      en: "Interests",
    },
  },
  access: {
    create: isAdminOrCreatedBy,
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  fields: [
    {
      name: "name",
      label: {
        es: "Nombre (traducible)",
        en: "Name (translatable)",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "summary",
      label: {
        es: "Resumen (traducible)",
        en: "Summary (translatable)",
      },
      type: "richText",
      localized: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: "sidebar",
        condition: (data) => Boolean(data?.createdBy),
      },
    },
  ],
  hooks: {
    beforeChange: [createByOnCreate],
  },
};
