import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Awards: CollectionConfig = {
  slug: "awards",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Premio",
      en: "Award",
    },
    plural: {
      es: "Premios",
      en: "Awards",
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
      name: "date",
      label: {
        es: "Fecha",
        en: "Date",
      },
      type: "date",
      required: true,
    },
    {
      name: "awarder",
      label: {
        es: "Entregado por",
        en: "Awarder",
      },
      type: "text",
      required: true,
    },
    {
      name: "summary",
      label: {
        es: "Resumen (traducible)",
        en: "Summary (translatable)",
      },
      type: "richText",
      required: true,
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
