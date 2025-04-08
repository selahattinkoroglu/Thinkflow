import React, { useState } from 'react'
import ApiClient from '../../api/ApiClient'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'

const BlogEkle = () => {
  const [baslik, setBaslik] = useState('')
  const [icerik, setIcerik] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('baslik', baslik)
    formData.append('icerik', icerik)

    try {
      const response = await ApiClient.post('/blog/ekle', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setToastMessage('Blog başarıyla eklendi!')
      setToastType('success')
      setModalVisible(true)

      setBaslik('')
      setIcerik('')
    } catch (error) {
      setToastMessage('Hata: ' + error.message)
      setToastType('danger')
      setModalVisible(true)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="bg-dark text-light p-4 rounded shadow w-100 border border-secondary" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Yeni Blog Ekle</h2>

        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="baslik" className="form-label">Başlık</label>
            <input
              type="text"
              id="baslik"
              className="form-control bg-secondary text-light border-0"
              placeholder="Blog başlığı"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="icerik" className="form-label">İçerik</label>
            <textarea
              id="icerik"
              className="form-control bg-secondary text-light border-0"
              rows={6}
              placeholder="Blog içeriği"
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
            ></textarea>
          </div>

          <div>
            <CButton type="submit" color="light" className="w-100">
              Blogu Kaydet
            </CButton>
          </div>
        </form>

        <CModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          centered
          size="sm"
        >
          <CModalHeader closeButton>
            <CModalTitle>{toastType === 'success' ? 'Başarılı' : 'Hata'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {toastMessage}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Kapat
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  )
}

export default BlogEkle
