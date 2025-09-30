import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { tr } from '@payloadcms/translations/languages/tr'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/posts'
import { Products } from './collections/Products'
import { RefundPolicy } from './collections/RefundPolicy'
import { Tags } from './collections/Tags'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  i18n: {
    supportedLanguages: { tr, de, en },
  },
  cookiePrefix: 'funroad',

  // Define and configure your collections in this array
  collections: [Posts, Categories, Users, Media, RefundPolicy, Products, Tags, Tenants],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  plugins: [
    multiTenantPlugin({
      collections: {
        products: {
          tenantFieldOverrides: {
            defaultValue: ({ req }) => {
              // Giriş yapmış bir kullanıcı varsa ve tenant'ları varsa
              if (req.user && req.user.tenants && req.user.tenants.length > 0) {
                // Kullanıcının tenants dizisindeki ilk tenant'ın ID'sini döndür
                return req.user.tenants[0].tenant
              }
              // Koşul sağlanmıyorsa alanı boş bırak
              return undefined
            },
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => Boolean(user?.roles?.includes('super-admin')),
    }),
  ],
})
