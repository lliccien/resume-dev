import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Skills: CollectionConfig = {
  slug: "skills",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Habilidad",
      en: "Skill",
    },
    plural: {
      es: "Habilidades",
      en: "Skills",
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
      name: "typeSkill",
      label: {
        es: "Tipo de Habilidad",
        en: "Type of Skill",
      },
      type: "select",
      options: [
        {
          label: {
            es: "Técnica",
            en: "Technical",
          },
          value: "tech",
        },
        {
          label: {
            es: "Blanda",
            en: "Soft",
          },
          value: "soft",
        },
      ],
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: [
        {
          label: "Básico",
          value: "básico",
        },
        {
          label: "Intermedio",
          value: "intermedio",
        },
        {
          label: "Avanzado",
          value: "Avanzado",
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
