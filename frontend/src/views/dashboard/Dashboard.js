import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHeart, cilCommentBubble, cilBookmark, cilShare, cilOptions } from '@coreui/icons'

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technology', name: 'Technology' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
  ]

  const posts = [
    {
      id: 1,
      title: 'Building Scalable Applications with React and Node.js',
      excerpt: 'Learn how to create enterprise-level applications using modern web technologies...',
      author: {
        name: 'John Doe',
        avatar: 'src/assets/images/avatars/1.jpg',
        role: 'Senior Developer'
      },
      category: 'programming',
      readTime: '8 min read',
      likes: 234,
      comments: 45,
      timestamp: '2 hours ago'
    },
    // Daha fazla post eklenebilir
  ]

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <CRow className="mb-4">
        <CCol>
          <CInputGroup className="header-search">
            <CFormInput
              placeholder="Search articles..."
              className="border-end-0 search-input"
            />
            <CButton color="primary">Search</CButton>
          </CInputGroup>
            </CCol>
          </CRow>

      {/* Categories Section */}
      <CRow className="mb-4">
        <CCol>
          <div className="categories-wrapper d-flex gap-2">
            {categories.map(category => (
              <CButton
                key={category.id}
                color={activeCategory === category.id ? 'primary' : 'light'}
                onClick={() => setActiveCategory(category.id)}
                className="category-button"
              >
                {category.name}
              </CButton>
            ))}
                      </div>
                    </CCol>
                  </CRow>

      {/* Main Content */}
      <CRow>
        {/* Left Column - Articles Feed */}
        <CCol xs={12} lg={8}>
          {posts.map(post => (
            <CCard key={post.id} className="mb-4 post-card">
              <CCardBody>
                <div className="d-flex align-items-center mb-3">
                  <CAvatar src={post.author.avatar} size="md" />
                  <div className="ms-3">
                    <h6 className="mb-0">{post.author.name}</h6>
                    <small className="text-medium-emphasis">
                      {post.author.role} · {post.timestamp}
                    </small>
                      </div>
                  <CDropdown className="ms-auto">
                    <CDropdownToggle color="transparent" caret={false}>
                      <CIcon icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Save Post</CDropdownItem>
                      <CDropdownItem>Share Post</CDropdownItem>
                      <CDropdownItem>Report</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                      </div>

                <h4 className="mb-3">{post.title}</h4>
                <p className="text-medium-emphasis">{post.excerpt}</p>

                <div className="d-flex align-items-center mt-4">
                  <CBadge color="light" className="me-2">
                    {post.readTime}
                  </CBadge>
                  <CBadge color="light" className="me-2">
                    {post.category}
                  </CBadge>
                  
                  <div className="ms-auto d-flex gap-3">
                    <CButton color="light" variant="ghost">
                      <CIcon icon={cilHeart} className="me-1" />
                      {post.likes}
                    </CButton>
                    <CButton color="light" variant="ghost">
                      <CIcon icon={cilCommentBubble} className="me-1" />
                      {post.comments}
                    </CButton>
                    <CButton color="light" variant="ghost">
                      <CIcon icon={cilBookmark} />
                    </CButton>
                    <CButton color="light" variant="ghost">
                      <CIcon icon={cilShare} />
                    </CButton>
                      </div>
                    </div>
              </CCardBody>
            </CCard>
                  ))}
                </CCol>

        {/* Right Column - Trending & Tags */}
        <CCol xs={12} lg={4}>
          {/* Trending Section */}
          <CCard className="mb-4">
            <CCardHeader>
              <h5 className="mb-0">Trending Topics</h5>
            </CCardHeader>
            <CCardBody>
              <div className="trending-topics">
                {['React', 'JavaScript', 'Web Development', 'UI/UX', 'DevOps'].map((topic, index) => (
                  <CButton 
                    key={index}
                    color="light" 
                    variant="outline"
                    className="me-2 mb-2"
                  >
                    #{topic}
                  </CButton>
                ))}
                        </div>
            </CCardBody>
          </CCard>

          {/* Popular Writers */}
          <CCard>
            <CCardHeader>
              <h5 className="mb-0">Popular Writers</h5>
            </CCardHeader>
            <CCardBody>
              {[1, 2, 3].map((writer) => (
                <div key={writer} className="d-flex align-items-center mb-3">
                  <CAvatar src={`src/assets/images/avatars/${writer}.jpg`} size="md" />
                          <div className="ms-3">
                    <h6 className="mb-0">Writer Name</h6>
                    <small className="text-medium-emphasis">1.2K Followers</small>
                          </div>
                  <CButton color="primary" variant="outline" size="sm" className="ms-auto">
                    Follow
                  </CButton>
                        </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
