import React, { useState } from 'react'
import ApiClient from '../../api/ApiClient'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react'

const Profil = () => {
  const [isim, setIsim] = useState('')
  const [soyisim, setSoyisim] = useState('')
  const [aciklama, setAciklama] = useState('')
  const [foto, setFoto] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('isim', isim)
    formData.append('soyisim', soyisim)
    formData.append('aciklama', aciklama)
    if (foto) formData.append('foto', foto)

    try {
      const response = await ApiClient.post('/profil/guncelle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setToastMessage('Profil güncelleme başarılı!')
      setToastType('success')
      setModalVisible(true)

    } catch (error) {
      setToastMessage('Hata: ' + error.message)
      setToastType('danger')
      setModalVisible(true)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="bg-dark text-light p-4 rounded shadow w-100 border border-secondary" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Profilini Düzenle</h2>

        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="photo" className="form-label">Profil Fotoğrafı</label>
            <input
              type="file"
              id="photo"
              className="form-control bg-secondary text-light border-0"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label htmlFor="isim" className="form-label">İsim</label>
            <input
              type="text"
              id="isim"
              className="form-control bg-secondary text-light border-0"
              placeholder="Adınız"
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="soyisim" className="form-label">Soyisim</label>
            <input
              type="text"
              id="soyisim"
              className="form-control bg-secondary text-light border-0"
              placeholder="Soyadınız"
              value={soyisim}
              onChange={(e) => setSoyisim(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="aciklama" className="form-label">Açıklama</label>
            <textarea
              id="aciklama"
              className="form-control bg-secondary text-light border-0"
              rows={4}
              placeholder="Kendiniz hakkında kısa bir açıklama..."
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
            ></textarea>
          </div>

          <div>
            <CButton type="submit" color="light" className="w-100">
              Kaydet
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

export default Profil
