import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { useState, useEffect } from 'react'

import { Input } from '@components/small/Input'
import { Button } from '@components/small/Button'

import { apiService } from '@api/service/service'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const getToken = async (): Promise<{ access: string; refresh: string } | undefined> => {
    try {
      return await apiService
        .post('authentication/token/create/', { json: { email: email, password: password } })
        .json()
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 401) {
        setError('Nesprávnej email nebo heslo')
      }
    }
  }

  const handleSubmit = async () => {
    const token = await getToken()
    if (token) {
      document.cookie = `accessToken=${token.access}`
      document.cookie = `refreshToken=${token.refresh}`
      await Router.push('/zoznam/zastavarna/')
    }
  }
  useEffect(() => {
    setError('')
  }, [email, password])

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <main className="flex h-screen items-center justify-center bg-gray-200 ">
        <div className="flex flex-col justify-center items-center p-8 border rounded-xl border-gray-500 shadow-2xl space-y-4 px-24">
          <div className="text-2xl font-medium">Přihlásení</div>
          <Input label="email" classNameInput="w-64" onChange={(value) => value && setEmail(value)} value={email} />
          <Input
            label="heslo"
            type="password"
            classNameInput="w-64"
            onChange={(value) => value && setPassword(value)}
            value={password}
          />
          <div className="text-red-700">{error}</div>
          <Button
            text="Přihlásiť"
            onClick={() => {
              handleSubmit()
            }}
            className="w-32"
            submit
          />
        </div>
      </main>
    </div>
  )
}

export default Login
