import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Volunteers: CollectionConfig = {
  slug: "volunteers",
  auth: false,
  admin: {
    useAsTitle: "organization",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Voluntariado",
      en: "Volunteer",
    },
    plural: {
      es: "Voluntariados",
      en: "Volunteers",
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
      name: "organization",
      label: {
        es: "Organización",
        en: "Organization",
      },
      type: "text",
      required: true,
    },
    {
      name: "organizationUrl",
      label: {
        es: "URL de la Organización",
        en: "Organization URL",
      },
      type: "text",
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
      name: "position",
      label: {
        es: "Cargo (traducible)",
        en: "Position (translatable)",
      },
      type: "text",
      localized: true,
    },
    {
      name: "startDate",
      label: {
        es: "Fecha de Inicio",
        en: "Start Date",
      },
      type: "date",
    },
    {
      name: "endDate",
      label: {
        es: "Fecha de Finalización",
        en: "End Date",
      },
      type: "date",
    },
    {
      name: "currently",
      label: {
        es: "Actualmente",
        en: "Currently",
      },
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "highlights",
      label: {
        es: "Logros",
        en: "Highlights",
      },
      type: "array",
      fields: [
        {
          name: "highlight",
          label: {
            es: "Logro",
            en: "Highlight",
          },
          type: "text",
        },
      ],
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
