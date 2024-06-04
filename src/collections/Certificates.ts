import { CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy } from "../access";

export const Certificates: CollectionConfig = {
  slug: "certificates",
  auth: false,
  admin: {
    useAsTitle: "name",
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Certificado",
      en: "Certificate",
    },
    plural: {
      es: "Certificados",
      en: "Certificates",
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
      name: "issuer",
      label: {
        es: "Emisor",
        en: "Issuer",
      },
      type: "text",
      required: true,
    },
    {
      name: "urlIssuer",
      label: {
        es: "URL del Emisor",
        en: "Issuer URL",
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
        es: "Fecha de Fin",
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
    },
    {
      name: "idCredential",
      label: {
        es: "ID de la Credencial",
        en: "Credential ID",
      },
      type: "text",
    },
    {
      name: "credentialUrl",
      label: {
        es: "URL de la Credencial",
        en: "Credential URL",
      },
      type: "text",
    },
    {
      name: "urlAttachment",
      label: {
        es: "URL del Adjunto",
        en: "Attachment URL",
      },
      type: "text",
    },
    {
      name: "hours",
      label: {
        es: "Horas",
        en: "Hours",
      },
      type: "number",
    },
  ],
};
