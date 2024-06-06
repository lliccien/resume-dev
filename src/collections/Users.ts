import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminOrCreatedBy, isAdminOrUserById } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
   //ss verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
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
    create: isAdmin,
    update: isAdminOrUserById,
    delete: isAdmin
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
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
      },
    },
  ],
}

