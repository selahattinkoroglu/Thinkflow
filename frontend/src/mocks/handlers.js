import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../config/config'

export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  // Login mock handler
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json()

    // Simulate credential check
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json(
        {
          status: 'success',
          data: {
            token: 'mock-jwt-token-xyz123',
            user: {
              id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
              email: 'test@example.com',
              firstName: 'John',
              lastName: 'Maverick',
              role: 'user'
            }
          },
          message: 'Giriş başarılı'
        },
        { status: 200 }
      )
    }

    // Return error for invalid credentials
    return HttpResponse.json(
      {
        status: 'error',
        message: 'Geçersiz email veya şifre'
      },
      { status: 401 }
    )
  }),

  // Register mock handler
  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    const { username, email, password } = await request.json()

    // Basit validasyon
    if (!username || !email || !password) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Tüm alanlar zorunludur'
        },
        { status: 400 }
      )
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Geçerli bir email adresi giriniz'
        },
        { status: 400 }
      )
    }

    // Simüle edilmiş başarılı kayıt
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          user: {
            id: Math.random().toString(36).substr(2, 9),
            username,
            email,
            role: 'user'
          }
        },
        message: 'Kayıt başarıyla tamamlandı'
      },
      { status: 201 }
    )
  })
]
