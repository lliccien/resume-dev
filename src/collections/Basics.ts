import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Basics: CollectionConfig = {
  slug: "basics",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Básico",
      en: "Basic",
    },
    plural: {
      es: "Básicos",
      en: "Basics",
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
        es: "Nombre Completo",
        en: "Full Name",
      },
      type: "text",
      required: true,
    },
    {
      name: "label",
      label: {
        es: "Título de Empleo (traducible)",
        en: "Job Title (translatable)",
      },
      type: "text",
      localized: true,
    },
    {
      name: "email",
      label: {
        es: "Correo Electrónico",
        en: "Email",
      },
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      label: {
        es: "Avatar",
        en: "Avatar",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      label: {
        es: "Teléfono Celular",
        en: "Cell Phone",
      },
      type: "text",
      required: true,
    },
    {
      name: "url",
      label: {
        es: "Sitio Web",
        en: "Website",
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
      required: true,
      localized: true,
    },
    {
      name: "location",
      label: {
        es: "Ubicación",
        en: "Location",
      },
      type: "group",
      fields: [
        {
          name: "address",
          type: "text",
          label: {
            es: "Dirección",
            en: "Address",
          },
        },
        {
          name: "postalCode",
          type: "text",
          label: {
            es: "Código Postal",
            en: "Postal Code",
          },
        },
        { name: "city", type: "text", label: { es: "Ciudad", en: "City" } },
        { name: "region", type: "text", label: { es: "Región", en: "Region" } },
        {
          name: "country",
          type: "text",
          label: { es: "País", en: "Country" },
        },
      ],
    },
    {
      name: "profiles",
      label: {
        es: "Perfiles",
        en: "Profiles",
      },
      type: "array",
      fields: [
        {
          name: "network",
          type: "text",
          label: {
            es: "Red",
            en: "Network",
          },
        },
        {
          name: "username",
          type: "text",
          label: {
            es: "Nombre de Usuario",
            en: "Username",
          },
        },
        {
          name: "url",
          type: "text",
          label: {
            es: "URL",
            en: "URL",
          },
        },
      ],
    },
    {
      name: "languages",
      label: {
        es: "Idiomas",
        en: "Languages",
      },
      type: "array",
      fields: [
        {
          name: "language",
          label: {
            es: "Idioma",
            en: "Language",
          },
          type: "select",
          options: [
            {
              label: {
                es: "Español",
                en: "Spanish",
              },
              value: "es",
            },
            {
              label: {
                es: "Inglés",
                en: "English",
              },
              value: "en",
            },
            {
              label: {
                es: "Francés",
                en: "French",
              },
              value: "fr",
            },
          ],
        },
        {
          name: "fluency",
          label: {
            es: "Fluidez",
            en: "Fluency",
          },
          type: "select",
          options: [
            { label: "A1", value: "A1" },
            { label: "A2", value: "A2" },
            { label: "B1", value: "B1" },
            { label: "B2", value: "B2" },
            { label: "C1", value: "C1" },
            { label: "C2", value: "C2" },
            { label: "Nativo", value: "Nativo" },
          ],
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
