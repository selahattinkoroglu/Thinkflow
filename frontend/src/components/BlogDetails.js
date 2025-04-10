import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CRow, 
  CCol, 
  CAvatar, 
  CSpinner,
  CButton,
  CFormInput,
  CAlert,
  CCollapse
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilCommentBubble } from '@coreui/icons';
import ApiClient from '../api/ApiClient';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [showComments, setShowComments] = useState(location.state?.showComments || false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.get(`/posts/${id}`);
        setBlog(response.data);
        setError(null);
        // Fetch comments after getting blog details
        const commentsResponse = await ApiClient.get(`/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      const response = await ApiClient.post(`/posts/${id}/comments`, {
        comment: newComment
      });
      
      // Add new comment to the beginning of the list
      setComments([response.data, ...comments]);
      setNewComment('');
      setCommentError(null);
    } catch (err) {
      console.error("Error adding comment:", err);
      setCommentError("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await ApiClient.delete(`/posts/${id}/comments/${commentId}`);
      // Remove deleted comment from state
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      setCommentError("Failed to delete comment. Please try again.");
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      setCommentError(null); // Reset error when opening comments
    }
  };

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
                <CButton 
                  color={showComments ? "primary" : "light"}
                  variant="ghost"
                  onClick={toggleComments}
                >
                  <CIcon icon={cilCommentBubble} className="me-2" />
                  {comments.length} Comments
                </CButton>
              </div>
            </div>

            {/* Comments Section */}
            <CCollapse visible={showComments}>
              <div className="mt-4">
                <h4 className="mb-3">Comments</h4>
                
                {/* Add Comment */}
                <div className="d-flex gap-2 mb-4">
                  <CFormInput
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    invalid={!!commentError}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment();
                      }
                    }}
                  />
                  <CButton color="primary" onClick={handleAddComment}>
                    <CIcon icon={cilCommentBubble} className="me-2" />
                    Comment
                  </CButton>
                </div>

                {/* Comment Error Alert */}
                {commentError && (
                  <CAlert color="danger" className="mb-3">
                    {commentError}
                  </CAlert>
                )}

                {/* Comments List */}
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-item border-bottom py-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{comment.author}</h6>
                          <p className="mb-1">{comment.comment}</p>
                          <small className="text-medium-emphasis">{comment.timestamp}</small>
                        </div>
                        <CButton 
                          color="danger" 
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </div>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <div className="text-center text-medium-emphasis py-4">
                      No comments yet. Be the first to comment!
                    </div>
                  )}
                </div>
              </div>
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default BlogDetail;