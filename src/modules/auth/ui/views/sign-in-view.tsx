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

const loginSchema = z.object({
  email: z.string().email({ message: 'Geçersiz E-posta adresi' }),
  password: z.string().min(6).max(24, { message: 'Maksimum 24 karekter olmalıdır' }),
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

type FormSchemaType = z.infer<typeof loginSchema>

export const SignInView = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const trpc = useTRPC()
  const login = useMutation(
    // trpc.auth.login.mutationOptions({
    //   onError: (error) => {
    //     toast.error(error.message)
    //   },
    //   onSuccess: () => {
    //     router.push('/?success=true')
    //   },
    // }),
    {
      mutationFn: async (values: z.infer<typeof loginSchema>) => {
        const response = await fetch('/api/users/external-users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Giriş Hatalı')
        }

        return response.json()
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        // TRPC session cache'ini invalidate et
        queryClient.invalidateQueries({
          queryKey: trpc.auth.session.queryKey(),
        })
        router.push('/')
      },
    },
  )
  const form = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormSchemaType) => {
    login.mutate({
      email: values.email,
      password: values.password,
    })
  }

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
                <Link prefetch href={'/sign-up'}>
                  Kayıt Ol
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">Funroad&apos;a hoşgeldiniz.</h1>

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
              disabled={login.isPending}
              type="submit"
              size={'lg'}
              variant={'elevated'}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Giriş Yap
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
