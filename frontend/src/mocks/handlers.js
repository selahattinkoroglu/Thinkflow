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
];

const authors = [
  {
    id: 1,
    isim: 'John',
    soyisim: 'Maverick',
    aciklama: 'Yazarlık hayatıma 2000 yılında başladım ve o günden beri hikayelerimi paylaşıyorum.',
    resim: 'https://spng.pinpng.com/pngs/s/559-5595674_john-doe-png-testimonial-people-transparent-png.png', // Yazar resmi (placeholder)
  },
  {
    id: 2,
    isim: 'Jane',
    soyisim: 'Doe',
    aciklama: 'Gizemli kurgu yazarlığı konusunda uzmanım.',
    resim: 'https://spng.pinpng.com/pngs/s/559-5595674_john-doe-png-testimonial-people-transparent-png.png',
  },
];

// Yorumlar için mock data
const comments = [
  {
    id: 1,
    authorid: 1,
    author: 'Ahmet Yılmaz',
    comment: 'Harika bir makale! Teşekkürler paylaşım için.',
    timestamp: '3 gün önce'
  },
  {
    id: 2,
    authorid: 1,
    author: 'Ayşe Demir',
    comment: 'Bu konuda daha fazla içerik görmek isterim.',
    timestamp: '1 hafta önce'
  },
  {
    id: 3,
    authorid: 2,
    author: 'Mehmet Kaya',
    comment: 'Çok bilgilendirici bir yazı olmuş.',
    timestamp: '2 gün önce'
  }
];

export const handlers = [
  
  // Belirli bir blog post'un yorumlarını getir
  http.get(`${API_BASE_URL}/posts/:id/comments`, ({ params }) => {
    const { id } = params;
    const postComments = comments.filter(comment => comment.postId === parseInt(id));
    
    return HttpResponse.json(postComments);
  }),
  
  // Belirli bir blog post'un yorumlarını getir
  http.get(`${API_BASE_URL}/posts/:id/comments`, ({ params }) => {
    const { id } = params;
    const postComments = comments.filter(comment => comment.postId === parseInt(id));
    
    return HttpResponse.json(postComments);
  }),

  http.post(`${API_BASE_URL}/posts/:id/like`, ({ params }) => {
    const { id } = params;

    // Blog postu bulunan ve beğenilen gönderi sayısını artıran mock işlem
    const post = blogPosts.find(p => p.id === parseInt(id));
    if (post) {
      post.likes += 1;
      return HttpResponse.json(
        {
          status: 'success',
          message: `Post ${id} liked successfully.`,
          likes: post.likes,
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { status: 'error', message: 'Post not found' },
        { status: 404 }
      );
    }
  }),

  http.delete(`${API_BASE_URL}/posts/:id/like`, ({ params }) => {
    const { id } = params;

    // Blog postu bulunan ve beğenilen gönderi sayısını azaltan mock işlem
    const post = blogPosts.find(p => p.id === parseInt(id));
    if (post) {
      post.likes = Math.max(0, post.likes - 1); // Beğeniler sıfırdan küçük olmasın
      return HttpResponse.json(
        {
          status: 'success',
          message: `Post ${id} unliked successfully.`,
          likes: post.likes,
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { status: 'error', message: 'Post not found' },
        { status: 404 }
      );
    }
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

  http.get(`${API_BASE_URL}/yazarlar/:id`, ({ params }) => {
    const { id } = params;
    const author = authors.find(a => a.id === parseInt(id));

    if (author) {
      return HttpResponse.json(author, { status: 200 });
    } else {
      return HttpResponse.json(
        { status: 'error', message: 'Yazar bulunamadı' },
        { status: 404 }
      );
    }
  }),

  http.put(`${API_BASE_URL}/posts/:id`, ({ params, request }) => {
    const { id } = params;
    const { title, excerpt } = request.json();

    // Postları bulma
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (post) {
      // Post varsa, güncelle
      post.title = title;
      post.excerpt = excerpt;

      return HttpResponse.json(post, { status: 200 });
    } else {
      // Post bulunamazsa
      return HttpResponse.json(
        { status: 'error', message: 'Post bulunamadı' },
        { status: 404 }
      );
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

  http.get(`${API_BASE_URL}/posts`, ({ request }) => {
    const url = new URL(request.url, `${API_BASE_URL}`);
    const authorid = url.searchParams.get('authorid');

    if (authorid && parseInt(authorid) === 1) {
      return HttpResponse.json([{
        id: 1,
        title: 'Building Scalable Applications with React and Node.js',
        excerpt: 'Learn how to create enterprise-level applications using modern web technologies...',
        author: {
          name: 'John Maverick',
          avatar: 'https://spng.pinpng.com/pngs/s/559-5595674_john-doe-png-testimonial-people-transparent-png.png',
        },
        likes: 234,
        comments: 45,
        timestamp: '2 hours ago'
      }]);
    }

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
    ]);
  }),

  // Login mock handler
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json()

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
        message: 'Geçersiz e-posta veya şifre',
      },
      { status: 401 }
    )
  }),

  http.delete(`${API_BASE_URL}/posts/:id`, ({ params }) => {
    const { id } = params;
    const index = blogPosts.findIndex(post => post.id === parseInt(id));

    if (id !== 1) {
      blogPosts.splice(index, 1); // mock veriyi sil
      return HttpResponse.json({ result: 1 }, { status: 200 }); // başarılı
    } else {
      return HttpResponse.json({ result: 0 }, { status: 404 }); // bulunamadı
    }
  }),

  http.post(`${API_BASE_URL}/blog/ekle`, async ({ request }) => {
    const body = await request.json()
    const { baslik, icerik } = body

    if (!baslik || !icerik) {
      return HttpResponse.json(
        { status: 'error', message: 'Eksik bilgi gönderildi' },
        { status: 400 }
      )
    }

    const newId = blogPosts.length > 0 ? blogPosts[blogPosts.length - 1].id + 1 : 1

    const newPost = {
      id: newId,
      baslik,
      icerik,
      likes: 0,
      comments: 0,
      timestamp: 'az önce'
    }

    blogPosts.push(newPost)

    return HttpResponse.json(
      { status: 'success', message: 'Blog yazısı eklendi', data: newPost },
      { status: 201 }
    )
  }),

  // YENİ EKLENEN - Yazarın yorumlarını alma endpoint'i
  http.get(`${API_BASE_URL}/comments`, ({ request }) => {
    const url = new URL(request.url, `${API_BASE_URL}`);
    const authorid = url.searchParams.get('authorid');

    if (authorid) {
      const authorComments = comments.filter(comment => comment.authorid === parseInt(authorid));

      return HttpResponse.json(
        authorComments,
        { status: 200 }
      );
    }

    // Eğer authorid belirtilmemişse tüm yorumları döndür
    return HttpResponse.json(
      comments,
      { status: 200 }
    );
  }),


  http.post(`${API_BASE_URL}/posts/:id/bookmark`, ({ params }) => {
    const { id } = params;

    // Basit bir başarı cevabı döndürüyoruz
    return HttpResponse.json(
      {
        status: 'success',
        message: `Post ${id} başarıyla yer imlerine eklendi.`,
      },
      { status: 200 }
    );
  }),

  http.delete(`${API_BASE_URL}/posts/:id/bookmark`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json(
      {
        status: 'success',
        message: `Post ${id} yer imlerinden kaldırıldı.`,
      },
      { status: 200 }
    );
  }),

  // YENİ EKLENEN - Yeni yorum ekleme endpoint'i
  http.post(`${API_BASE_URL}/comments`, async ({ request }) => {
    try {
      const data = await request.json();
      const { authorid, comment } = data;

      if (!authorid || !comment) {
        return HttpResponse.json(
          { status: 'error', message: 'Eksik veri gönderildi' },
          { status: 400 }
        );
      }

      // Yeni yorum oluştur
      const newComment = {
        id: comments.length + 1,
        authorid: parseInt(authorid),
        author: 'Mevcut Kullanıcı', // Giriş yapan kullanıcının adını kullanabilirsiniz
        comment,
        timestamp: 'Az önce'
      };

      // Bu gerçek bir sunucuda comments dizisine eklenirdi
      // Mock olduğu için sadece yeni yorumu döndürüyoruz

      return HttpResponse.json(
        newComment,
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json(
        { status: 'error', message: 'Yorum eklenirken bir hata oluştu' },
        { status: 500 }
      );
    }
  })
]
