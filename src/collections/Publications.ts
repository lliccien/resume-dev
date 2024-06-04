import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Publications: CollectionConfig = {
  slug: "publications",
  auth: false,
  admin: {
    useAsTitle: "title",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Publicación",
      en: "Publication",
    },
    plural: {
      es: "Publicaciones",
      en: "Publications",
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
      name: "title",
      label: {
        es: "Título (traducible)",
        en: "Title (translatable)",
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
      required: true,
      localized: true,
    },
    {
      name: "url",
      label: {
        es: "URL",
        en: "URL",
      },
      type: "text",
    },
    {
      name: "releaseDate",
      label: {
        es: "Fecha de Publicación",
        en: "Release Date",
      },
      type: "date",
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
