'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import z from 'zod'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
  email: z.string().email({ message: 'Geçersiz E-posta adresi' }),
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
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

type FormSchemaType = z.infer<typeof registerSchema>

export const SignUpView = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const trpc = useTRPC()
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.auth.session.queryKey(),
        })
        router.push('/')
      },
    }),
  )
  const form = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  const onSubmit = async (values: FormSchemaType) => {
    register.mutate({
      email: values.email,
      password: values.password,
      username: values.username,
    })
  }

  const username = form.watch('username')
  const usernameErrors = form.formState.errors.username

  const showPreview = username && !usernameErrors

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F3F4EF] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href={'/'}>
                <span className={cn('text-2xl font-semibold', poppins.className)}>funroad</span>
              </Link>
              <Button
                asChild
                variant={'ghost'}
                size={'sm'}
                className="text-base border-none underline"
              >
                <Link prefetch href={'/sign-in'}>
                  Giriş Yap
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">
              Para kazanan 1000 kişiden fazla üretici arasına katıl ve para kazanmaya başla
            </h1>

            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={cn('hidden', !usernameErrors && 'block')}>
                    Mağazanız bu şekilde olacaktır:&nbsp;
                    {/* TODO: Use proper method to generate preview url */}
                    <strong>{username}</strong>.shop.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">E-Posta</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Şifre</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={register.isPending}
              type="submit"
              size={'lg'}
              variant={'elevated'}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Hesap Oluştur
            </Button>
          </form>
        </Form>
      </div>

      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('./auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  )
}
