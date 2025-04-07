import React from 'react';
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilOptions, cilHeart, cilCommentBubble, cilBookmark } from '@coreui/icons';

const BlogPost = ({ id, title, excerpt, author, likes, comments, timestamp }) => {
  return (
    <CCard className="mb-4 post-card">
      <CCardBody>
        <div className="d-flex align-items-center mb-3">
          <CAvatar src={author.avatar} size="md" />
          <div className="ms-3">
            <h6 className="mb-0">{author.name}</h6>
            <small className="text-medium-emphasis">
              {timestamp}
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

        <h4 className="mb-3">
          <Link to={`/blogs/${id}`} className="text-decoration-none">{title}</Link>
        </h4>
        <p className="text-medium-emphasis">{excerpt}</p>

        <div className="d-flex align-items-center mt-4">
          <div className="ms-auto d-flex gap-3">
            <CButton color="light" variant="ghost">
              <CIcon icon={cilHeart} className="me-1" />
              {likes}
            </CButton>
            <CButton color="light" variant="ghost">
              <CIcon icon={cilCommentBubble} className="me-1" />
              {comments}
            </CButton>
            <CButton color="light" variant="ghost">
              <CIcon icon={cilBookmark} />
            </CButton>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default BlogPost;
