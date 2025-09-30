import type { CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { externalUsersLogin } from './externalUsersLogin'
import { setCookieBasedOnDomain } from '../hooks/setCookieBasedOnDomain'
import { ensureUniqueUsername } from '../hooks/ensureUniqueUsername'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  tenantFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      required: true,
      access: {
        update: ({ req }) => {
          return true
        },
      },
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  hooks: {
    afterLogin: [setCookieBasedOnDomain],
  },
  endpoints: [externalUsersLogin],
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },

    {
      name: 'email',
      required: true,
      unique: true,
      type: 'email',
    },
    {
      name: 'roles',
      type: 'select',
      options: ['super-admin', 'user'],
      hasMany: true,
      defaultValue: ['user'],
      admin: {
        position: 'sidebar',
        description: 'Roles of the user',
      },
    },

    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
}
