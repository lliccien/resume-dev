import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";
import { createByOnCreate } from "../hooks";


export const Projects: CollectionConfig = {
  slug: "projects",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Proyecto",
      en: "Project",
    },
    plural: {
      es: "Proyectos",
      en: "Projects",
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
        es: "Nombre",
        en: "Name",
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
      name: "techStack",
      label: {
        es: "Tecnologías",
        en: "Technologies",
      },
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
      name: "url",
      label: {
        es: "URL del Proyecto",
        en: "URL of the Project",
      },
      type: "text",
    },
    {
      name: "repositoryUrl",
      label: {
        es: "URL del Repositorio",
        en: "Repository URL",
      },
      type: "text",
    },
    {
      name: "screenshots",
      label: {
        es: "Capturas de Pantalla",
        en: "Screenshots",
      },
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "image",
          label: {
            es: "Imagen",
            en: "Image",
          },
          type: "upload",
          relationTo: "media",
        },
        {
          name: "caption",
          label: {
            es: "Leyenda",
            en: "Caption",
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
