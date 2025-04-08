import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '../config/config'
// Mock data for individual blog posts

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Applications with React and Node.js',
    excerpt: 'Learn how to create enterprise-level applications using modern web technologies...',
    content: `
      <p>In today's fast-paced digital landscape, building applications that can scale efficiently is crucial for business success. This article explores the best practices for creating enterprise-level applications using React for frontend and Node.js for backend development.</p>
      
      <h3>Why React and Node.js?</h3>
      <p>The combination of React and Node.js offers several advantages:</p>
      <ul>
        <li>JavaScript across the entire stack</li>
        <li>Rich ecosystem of libraries and tools</li>
        <li>High performance and scalability</li>
        <li>Strong community support</li>
      </ul>
      
      <h3>Architecture for Scalability</h3>
      <p>When building applications that need to handle growth, consider these architectural patterns:</p>
      <ol>
        <li>Microservices architecture</li>
        <li>Container-based deployment</li>
        <li>Serverless functions for specific operations</li>
        <li>Efficient state management</li>
      </ol>
      
      <h3>Performance Optimization Techniques</h3>
      <p>To ensure your application remains responsive even under heavy load:</p>
      <ul>
        <li>Implement code splitting and lazy loading</li>
        <li>Utilize server-side rendering where appropriate</li>
        <li>Optimize database queries and implement caching</li>
        <li>Set up efficient CI/CD pipelines</li>
      </ul>
      
      <p>By following these principles and leveraging the strengths of React and Node.js, you can build applications that not only meet current needs but can also scale effectively as your user base grows.</p>
    `,
    author: {
      name: 'John Doe',
      avatar: '/assets/images/avatars/1.jpg',
    },
    likes: 234,
    comments: 45,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'Introduction to GraphQL APIs',
    excerpt: 'Discover how GraphQL can simplify your API development and improve client-server interactions...',
    content: `
      <p>GraphQL has rapidly gained popularity as an alternative to REST APIs. This powerful query language for APIs provides clients with the exact data they request and nothing more.</p>
      
      <h3>What is GraphQL?</h3>
      <p>GraphQL is a query language for APIs and a runtime for executing those queries against your data. It allows clients to define the structure of the data required, and the same structure is returned from the server, preventing over-fetching or under-fetching of data.</p>
      
      <h3>Advantages Over REST</h3>
      <ul>
        <li>Request only what you need</li>
        <li>Get multiple resources in a single request</li>
        <li>Strong type system</li>
        <li>Introspective - APIs are self-documenting</li>
        <li>Version-free by design</li>
      </ul>
      
      <h3>Key Concepts</h3>
      <ol>
        <li>Schema Definition Language (SDL)</li>
        <li>Queries for fetching data</li>
        <li>Mutations for modifying data</li>
        <li>Subscriptions for real-time updates</li>
        <li>Resolvers that define how data is fetched</li>
      </ol>
      
      <h3>Implementation Considerations</h3>
      <p>When implementing GraphQL in your applications:</p>
      <ul>
        <li>Consider caching strategies</li>
        <li>Implement proper error handling</li>
        <li>Set up authentication and authorization</li>
        <li>Monitor query complexity to prevent abuse</li>
      </ul>
      
      <p>By adopting GraphQL, developers can create more efficient, powerful, and flexible APIs that better serve the needs of modern applications and their users.</p>
    `,
    author: {
      name: 'Jane Smith',
      avatar: '/assets/images/avatars/2.jpg',
    },
    likes: 187,
    comments: 32,
    timestamp: '5 hours ago'
  }
  // You can add more blog posts as needed
];
const comments = [
  {
    id: 1,
    postId: 1,
    content: "Bu makale gerçekten çok faydalı oldu, teşekkürler!",
    author: {
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      name: "John Maverick",
      avatar: "/assets/images/avatars/5.jpg",
    },
    createdAt: "2025-04-08T10:30:00Z"
  },
  {
    id: 2,
    postId: 1,
    content: "React ve Node.js hakkında daha fazla içerik paylaşır mısınız?",
    author: {
      id: "a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      name: "Lisa Chen",
      avatar: "/assets/images/avatars/4.jpg",
    },
    createdAt: "2025-04-08T11:15:00Z"
  },
  {
    id: 3,
    postId: 2,
    content: "GraphQL konusunda yeni başlayanlar için harika bir rehber!",
    author: {
      id: "f5e4d3c2-b1a0-9i8u-7y6t-5r4e3w2q1",
      name: "Michael Brown",
      avatar: "/assets/images/avatars/3.jpg", 
    },
    createdAt: "2025-04-07T14:20:00Z"
  }
];
export const handlers = [
  
  // Belirli bir blog post'un yorumlarını getir
  http.get(`${API_BASE_URL}/posts/:id/comments`, ({ params }) => {
    const { id } = params;
    const postComments = comments.filter(comment => comment.postId === parseInt(id));
    
    return HttpResponse.json(postComments);
  }),

  http.get(`${API_BASE_URL}/posts/:id`, ({ params }) => {
    const { id } = params;
    const post = blogPosts.find(p => p.id === parseInt(id));
    
    if (post) {
      return HttpResponse.json(post);
    } else {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Blog post not found'
      });
    }
  }),

  http.get('/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  http.post(`${API_BASE_URL}/profil/guncelle`, async ({ request }) => {
    const formData = await request.formData();
    const isim = formData.get('isim');
    const soyisim = formData.get('soyisim');
    const aciklama = formData.get('aciklama');
    const foto = formData.get('foto');


    if (isim && soyisim && aciklama) {
      return HttpResponse.json(
        {
          status: 'success',
          data: {
            user: {
              id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
              isim,
              soyisim,
              aciklama,
              foto: foto ? 'mock-photo-url' : null,
            },
          },
          message: 'Profil güncelleme başarılı',
        },
        { status: 200 }
      )
    } else {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Eksik veri gönderildi',
        },
        { status: 400 }
      )
    }
  }),

  http.get(`${API_BASE_URL}/favorites`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Building Scalable Applications with React and Node.js',
        excerpt: 'Learn how to create enterprise-level applications using modern web technologies...',
        author: {
          name: 'John Doe',
          avatar: '/assets/images/avatars/1.jpg',
        },
        likes: 234,
        comments: 45,
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        title: 'Introduction to GraphQL APIs',
        excerpt: 'Discover how GraphQL can simplify your API development and improve client-server interactions...',
        author: {
          name: 'Jane Smith',
          avatar: '/assets/images/avatars/2.jpg',
        },
        likes: 187,
        comments: 32,
        timestamp: '5 hours ago'
      },
    ])
  }),


  http.get(`${API_BASE_URL}/posts`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Building Scalable Applications with React and Node.js',
        excerpt: 'Learn how to create enterprise-level applications using modern web technologies...',
        author: {
          name: 'John Doe',
          avatar: '/assets/images/avatars/1.jpg',
        },
        likes: 234,
        comments: 45,
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        title: 'Introduction to GraphQL APIs',
        excerpt: 'Discover how GraphQL can simplify your API development and improve client-server interactions...',
        author: {
          name: 'Jane Smith',
          avatar: '/assets/images/avatars/2.jpg',
        },
        likes: 187,
        comments: 32,
        timestamp: '5 hours ago'
      },
      {
        id: 3,
        title: 'Mastering CSS Grid Layouts',
        excerpt: 'A comprehensive guide to creating complex web layouts using the power of CSS Grid...',
        author: {
          name: 'Robert Johnson',
          avatar: '/assets/images/avatars/3.jpg',
        },
        likes: 156,
        comments: 21,
        timestamp: '1 day ago'
      },
      {
        id: 4,
        title: 'DevOps Best Practices for Small Teams',
        excerpt: 'How to implement efficient DevOps workflows even with limited resources and small team sizes...',
        author: {
          name: 'Lisa Williams',
          avatar: '/assets/images/avatars/4.jpg',
        },
        likes: 98,
        comments: 15,
        timestamp: '2 days ago'
      }
    ])
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
              role: 'user',
            },
          },
          message: 'Giriş başarılı',
        },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      {
        status: 'error',
        message: 'Geçersiz email veya şifre',
      },
      { status: 401 }
    )
  }),

  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Tüm alanlar zorunludur',
        },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Geçerli bir email adresi giriniz',
        },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          user: {
            id: Math.random().toString(36).substr(2, 9),
            username,
            email,
            role: 'user',
          },
        },
        message: 'Kayıt başarıyla tamamlandı',
      },
      { status: 201 }
    )
  })
]
