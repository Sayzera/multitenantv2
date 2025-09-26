import { headers as getHeaders, cookies as getCookies } from 'next/headers'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import z from 'zod'
import { TRPCError } from '@trpc/server'
import { generateAuthCookie } from '../utils'

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()
    const session = await ctx.db.auth({
      headers,
    })

    return session
  }),
  logout: baseProcedure.mutation(async ({ ctx }) => {
    const cookies = await getCookies()
    cookies.delete(ctx.db.config.cookiePrefix)
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).max(24, { message: 'Maksimum 24 karekter olmalıdır' }),
        username: z
          .string()
          .min(3, 'Minimum Kullanıcı Adı 3 karekter olmak zorundadır.')
          .max(63, 'Kullanıcı adı maksimum 63 karekter olmak zorundadır.')
          .regex(
            /^[a-z0-9][a-z0-9]*[a-z0-9]$/,
            'Kullanıcı adı küçük harf olmalıdır. Küçük harf ile veya rakam ile başlayabilir',
          )
          .refine((val) => !val.includes('-'), 'Kullanıcı adı tire karekteri içeremez')
          .transform((val) => val.toLocaleLowerCase()),
        // [username].shop.com
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: 'users',
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      })

      const existingUser = existingData?.docs?.[0]

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Bu kullanıcı sisteme daha önceden eklenmiştir',
        })
      }

      const tenant = await ctx.db.create({
        collection: 'tenants',
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: 'test',
          stripeDetailsSubmitted: false, // or true, depending on your logic
        },
      })

      await ctx.db.create({
        collection: 'users',
        data: {
          tenants: [
            {
              tenant: tenant.id,
            },
          ],
          email: input.email,
          password: input.password,
          username: input.username,
        },
      })

      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      })

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Kullanıcı girişi hatası',
        })
      }
      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,

        value: data.token,
      })
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      })

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Kullanıcı girişi hatası',
        })
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      })

      return data
    }),
})
