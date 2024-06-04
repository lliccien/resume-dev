import { CollectionConfig } from 'payload/types'
import { isAdminOrUserById } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    hideAPIURL: true,
  },
  labels: {
    singular: {
      es: "Usuario",
      en: "User",
    },
    plural: {
      es: "Usuarios",
      en: "Users",
    },
  },
  access: {
    read: isAdminOrUserById,
    create: isAdminOrUserById,
    update: isAdminOrUserById,
    delete: isAdminOrUserById
  },
  fields: [
    {
      name: "nickName",
      type: "text",
      label: {
        es: "Nombre de Usuario",
        en: "User Name",
      },
      required: true,
      unique: true,
    },
    {
      name: "role",
      type: "select",
      label: {
        es: "Selecciona un Rol",
        en: "Select Role",
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      required: true,
      defaultValue: "user",
    },
  ],
}

