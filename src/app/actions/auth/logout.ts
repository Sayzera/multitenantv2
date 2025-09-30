'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteAuthCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)

  redirect('/')
}
