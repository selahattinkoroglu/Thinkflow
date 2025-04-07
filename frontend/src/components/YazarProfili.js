import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CAvatar, CButton, CSpinner } from '@coreui/react';
import ApiClient from '../api/ApiClient'; // ApiClient importu
import BlogPost from './BlogPost'; // BlogPost componentinizi import edin

const YazarProfili = () => {
  const { id } = useParams(); // URL parametrelerinden yazar ID'sini alıyoruz
  const [author, setAuthor] = useState(null); // Yazar bilgilerini tutacak state
  const [posts, setPosts] = useState([]); // Yazarın bloglarını tutacak state
  const [comments, setComments] = useState([]); // Yazarın yorumlarını tutacak state
  const [comment, setComment] = useState(''); // Yeni yorumun değerini tutacak state
  const [loading, setLoading] = useState(true); // Yükleniyor durumunu tutacak state
  const [error, setError] = useState(null); // Hata mesajlarını tutacak state

  useEffect(() => {
    const fetchAuthorDetail = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.get(`/yazarlar/${id}`); // Yazar bilgilerini alıyoruz
        setAuthor(response.data); // Yazar bilgisini state'e kaydediyoruz
        setError(null);
      } catch (err) {
        console.error("Yazar bilgileri yüklenemedi:", err);
        setError("Yazar bilgileri yüklenemedi. Lütfen tekrar deneyin.");
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await ApiClient.get(`/posts?authorid=${id}`); // Yazarın bloglarını alıyoruz
        setPosts(response.data); // Blogları state'e kaydediyoruz
        setError(null);
      } catch (err) {
        console.error("Bloglar yüklenemedi:", err);
        setError("Bloglar yüklenemedi. Lütfen tekrar deneyin.");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await ApiClient.get(`/comments?authorid=${id}`); // Yazarın yorumlarını alıyoruz
        setComments(response.data); // Yorumları state'e kaydediyoruz
      } catch (err) {
        console.error("Yorumlar yüklenemedi:", err);
        setError("Yorumlar yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false); // Yükleniyor durumunu bitiriyoruz
      }
    };

    fetchAuthorDetail();
    fetchPosts();
    fetchComments(); // Yorumları almak için fonksiyonu çağırıyoruz
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      setError('Yorum boş olamaz');
      return;
    }

    try {
      const response = await ApiClient.post(`/comments`, { authorid: id, comment }); // Yorum ekleme
      setComments([...comments, response.data]); // Yeni yorumu mevcut yorumlara ekliyoruz
      setComment(''); // Yorum kutusunu sıfırlıyoruz
      setError(null); // Hata mesajını sıfırlıyoruz
    } catch (err) {
      console.error("Yorum eklenemedi:", err);
      setError("Yorum eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  // Yükleniyor durumunu kontrol et
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  // Hata durumunu kontrol et
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // Yazar bulunamadıysa uyarı göster
  if (!author) {
    return (
      <div className="alert alert-warning" role="alert">
        Yazar bulunamadı.
      </div>
    );
  }

  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex align-items-center">
              <CAvatar src={author.resim} size="md" />
              <div className="ms-3">
                <h6 className="mb-0">{author.isim} {author.soyisim}</h6>
                <small className="text-medium-emphasis">{author.aciklama}</small>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <h2 className="mb-4 text-primary">Yazar Detayları</h2>
            <div className="author-content">
              <p><strong>İsim:</strong> {author.isim}</p>
              <p><strong>Soyisim:</strong> {author.soyisim}</p>
              <p><strong>Açıklama:</strong> {author.aciklama}</p>
            </div>

            <h2 className="mt-5 text-primary">Yazarın Blogları</h2>
            {posts.length > 0 ? (
              posts.map(post => (
                <BlogPost
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  likes={post.likes}
                  comments={post.comments}
                  timestamp={post.timestamp}
                />
              ))
            ) : (
              <div className="alert alert-info" role="alert">
                Bu yazarın henüz blogu bulunmamaktadır.
              </div>
            )}

            <h2 className="mt-5 text-primary">Yorumlar</h2>
            <div>
              {comments.length > 0 ? (
                comments.map((commentData, index) => (
                  <div key={index} className="mb-3">
                    <strong>{commentData.author}:</strong> {commentData.comment}
                  </div>
                ))
              ) : (
                <div className="alert alert-info" role="alert">
                  Bu yazara henüz yorum yapılmamıştır.
                </div>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Yorum ekleyin..."
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Yorum değerini güncelliyoruz
              />
              <CButton
                color="primary"
                className="mt-2"
                onClick={handleCommentSubmit} // Yorum gönderme işlemi
              >
                Yorum Ekle
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default YazarProfili;
