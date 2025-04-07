import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CAvatar, CSpinner } from '@coreui/react';
import ApiClient from '../api/ApiClient';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.get(`/posts/${id}`);
        setBlog(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="alert alert-warning" role="alert">
        Blog post not found.
      </div>
    );
  }

  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex align-items-center">
              <CAvatar src={blog.author.avatar} size="md" />
              <div className="ms-3">
                <h6 className="mb-0">{blog.author.name}</h6>
                <small className="text-medium-emphasis">{blog.timestamp}</small>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <h2 className="mb-4 text-primary">{blog.title}</h2>
            <div className="blog-content">
              {blog.content || blog.excerpt}
            </div>
            
            <div className="d-flex mt-5">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <i className="cil-heart me-1"></i> {blog.likes} Likes
                </span>
                <span>
                  <i className="cil-comment-bubble me-1"></i> {blog.comments} Comments
                </span>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default BlogDetail;