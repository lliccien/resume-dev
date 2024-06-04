import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Works: CollectionConfig = {
  slug: "works",
  auth: false,
  admin: {
    useAsTitle: "companyName",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Trabajo",
      en: "Work",
    },
    plural: {
      es: "Trabajos",
      en: "Works",
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
      name: "companyName",
      label: {
        es: "Nombre de la Empresa",
        en: "Company Name",
      },
      type: "text",
      required: true,
    },
    {
      name: "position",
      label: {
        es: "Cargo (traducible)",
        en: "Position (translatable)",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "companyUrl",
      label: {
        es: "URL de la Empresa",
        en: "Company URL",
      },
      type: "text",
    },
    {
      name: "startDate",
      label: {
        es: "Fecha de Inicio",
        en: "Start Date",
      },
      type: "date",
      required: true,
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
      name: "location",
      label: {
        es: "Ubicación",
        en: "Location",
      },
      type: "group",
      fields: [
        { name: "city", type: "text", label: { es: "Ciudad", en: "City" } },
        {
          name: "country",
          type: "text",
          label: { es: "País", en: "Country" },
        },
      ],
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
      name: "highlights",
      label: {
        es: "Aspectos Destacados",
        en: "Highlights",
      },
      type: "array",
      fields: [
        {
          name: "highlight",
          label: {
            es: "Aspecto Destacado (traducible)",
            en: "Highlight (translatable)",
          },
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "techStack",
      label: "Tech Stack",
      type: "array",
      fields: [
        {
          name: "technology",
          label: {
            es: "Tecnología",
            en: "Technology",
          },
          type: "text",
        },
        {
          name: "version",
          label: {
            es: "Versión",
            en: "Version",
          },
          type: "text",
        },
      ],
    },
    {
      name: "CertificateUrl",
      label: {
        es: "URL de la Certificación Laboral",
        en: "Certificate URL",
      },
      type: "upload",
      relationTo: "media",
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
