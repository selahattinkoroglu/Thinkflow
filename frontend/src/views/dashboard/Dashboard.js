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
                      <CDropdownItem>DELETE (IF OWNER)</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                      </div>

                <h4 className="mb-3">{post.title}</h4>
                <p className="text-medium-emphasis">{post.excerpt}</p>

                <div className="d-flex align-items-center mt-4">

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
                      </div>
                    </div>
              </CCardBody>
            </CCard>
                  ))}
                </CCol>


      </CRow>
    </div>
  )
}

export default Dashboard
