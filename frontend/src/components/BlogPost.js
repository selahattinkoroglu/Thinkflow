import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CCard, CCardBody, CAvatar, CDropdown, CDropdownToggle, CToastBody,
  CDropdownMenu, CDropdownItem, CButton, CModal, CModalHeader, CToaster, CToast,
  CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CFormTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilOptions, cilHeart, cilCommentBubble, cilBookmark } from '@coreui/icons';
import apiClient from '../api/ApiClient';

const BlogPost = ({ id, title, excerpt, author, initialLikes, comments, timestamp }) => {
  const [visible, setVisible] = useState(false); // Silme onay modali
  const [successToast, setSuccessToast] = useState(false); // Silme toast
  const [bookmarked, setBookmarked] = useState(false); // Bookmark durumu
  const [liked, setLiked] = useState(false); // Beğeni durumu
  const [likes, setLikes] = useState(0); // Başlangıçtaki beğeni sayısı
  const [editModalVisible, setEditModalVisible] = useState(false); // Düzenleme modalı
  const [postContent, setPostContent] = useState({ title, excerpt }); // İçeriği düzenleme

  useEffect(() => {
    if (!isNaN(initialLikes) && initialLikes >= 0) {
      setLikes(initialLikes); // Başlangıçtaki beğeni sayısını güncelle
    } else {
      setLikes(0); // Eğer geçerli değilse, beğeni sayısını 0 olarak ayarla
    }
  }, [initialLikes]);

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/posts/${id}`);
      if (response.status === 200) {
        setVisible(false);
        window.location.reload(); // Sayfayı yenile
      }
    } catch (error) {
      console.error('Silme işlemi başarısız:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        const response = await apiClient.delete(`/posts/${id}/bookmark`);
        if (response.status === 200) {
          setBookmarked(false);
        }
      } else {
        const response = await apiClient.post(`/posts/${id}/bookmark`);
        if (response.status === 200) {
          setBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Bookmark işlemi başarısız:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        const response = await apiClient.delete(`/posts/${id}/like`);
        if (response.status === 200) {
          setLiked(false);
          setLikes((prevLikes) => (prevLikes > 0 ? prevLikes - 1 : 0)); // Like'ı kaldırınca beğeni sayısını azalt
        }
      } else {
        const response = await apiClient.post(`/posts/${id}/like`);
        if (response.status === 200) {
          setLiked(true);
          setLikes((prevLikes) => prevLikes + 1); // Yeni beğeni ekleyince beğeni sayısını artır
        }
      }
    } catch (error) {
      console.error('Beğeni işlemi başarısız:', error);
    }
  };

  const handleEditModalOpen = async () => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      if (response.status === 200) {
        setPostContent({ title: response.data.title, excerpt: response.data.excerpt });
        setEditModalVisible(true); // Modalı aç
      }
    } catch (error) {
      console.error('İçerik yüklenemedi:', error);
    }
  };

  const handleSaveEdit = async () => {
      try {
        const response = await apiClient.put(`/posts/${id}`, {
          title: postContent.title,
          excerpt: postContent.excerpt
        });
        if (response.status === 200) {
          setEditModalVisible(false);
          window.location.reload(); // Sayfayı yenile
        }
      } catch (error) {
        console.error('Düzenleme işlemi başarısız:', error);
      }
    };

  return (
    <>
      <CCard className="mb-4 post-card">
        <CCardBody>
          <div className="d-flex align-items-center mb-3">
            <CAvatar src={author.avatar} size="md" />
            <div className="ms-3">
              <h6 className="mb-0">{author.name}</h6>
              <small className="text-medium-emphasis">{timestamp}</small>
            </div>
            <CDropdown className="ms-auto">
              <CDropdownToggle color="transparent" caret={false}>
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => setVisible(true)}>Sil</CDropdownItem>
                <CDropdownItem onClick={handleEditModalOpen}>Düzenle</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>

          <h4 className="mb-3">
            <Link to={`/blogs/${id}`} className="text-decoration-none">{title}</Link>
          </h4>
          <p className="text-medium-emphasis">{excerpt}</p>

          <div className="d-flex align-items-center mt-4">
            <div className="ms-auto d-flex gap-3">
              <CButton
                color={liked ? "danger" : "light"}
                variant="ghost"
                onClick={handleLike}
              >
                <CIcon icon={cilHeart} className="me-1" />
                {likes}
              </CButton>
              <CButton color="light" variant="ghost">
                <CIcon icon={cilCommentBubble} className="me-1" />
                {comments}
              </CButton>
              <CButton
                color={bookmarked ? "primary" : "light"}
                variant="ghost"
                onClick={handleBookmark}
              >
                <CIcon icon={cilBookmark} />
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>

      {/* Silme onay modalı */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Emin misiniz?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Bu yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>İptal</CButton>
          <CButton color="danger" onClick={handleDelete}>Evet, Sil</CButton>
        </CModalFooter>
      </CModal>

      {/* Düzenleme Modalı */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader onClose={() => setEditModalVisible(false)}>
          <CModalTitle>Blog Yazısını Düzenle</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Başlık"
              value={postContent.title}
              onChange={(e) => setPostContent({ ...postContent, title: e.target.value })}
            />
            <CFormTextarea
              label="İçerik"
              rows="5"
              value={postContent.excerpt}
              onChange={(e) => setPostContent({ ...postContent, excerpt: e.target.value })}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>İptal</CButton>
          <CButton color="primary" onClick={handleSaveEdit}>Kaydet</CButton>
        </CModalFooter>
      </CModal>

      {/* Silme sonrası başarı tostu */}
      <CToaster push={successToast}>
        <CToast autohide={3000} visible={successToast} onClose={() => setSuccessToast(false)}>
          <CToastBody>Yazı başarıyla silindi.</CToastBody>
        </CToast>
      </CToaster>
    </>
  );
};

export default BlogPost;
