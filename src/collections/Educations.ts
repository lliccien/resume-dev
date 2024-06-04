import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Educations: CollectionConfig = {
  slug: "educations",
  auth: false,
  admin: {
    useAsTitle: "institution",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Educación",
      en: "Education",
    },
    plural: {
      es: "Educaciones",
      en: "Educations",
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
      name: "institution",
      label: {
        es: "Institución",
        en: "Institution",
      },
      type: "text",
      required: true,
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
      name: "level",
      label: {
        es: "Nivel",
        en: "Level",
      },
      type: "select",
      options: [
        {
          label: {
            es: "Bachillerato",
            en: "High School",
          },
          value: "Bachillerato",
        },
        {
          label: {
            es: "Universidad",
            en: "University",
          },
          value: "Universitario",
        },
        {
          label: {
            es: "Maestría",
            en: "Master",
          },
          value: "Maestría",
        },
        {
          label: {
            es: "Doctorado",
            en: "Doctorate",
          },
          value: "Doctorado",
        },
      ],
      required: true,
    },
    {
      name: "degrees",
      label: {
        es: "Título (traducible)",
        en: "Degree (translatable)",
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
      name: "diplomaUrl",
      label: {
        es: "URL del Diploma",
        en: "Diploma URL",
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
