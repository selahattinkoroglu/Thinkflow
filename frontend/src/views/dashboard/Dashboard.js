import React, { useState, useEffect  } from 'react'
import { CRow, CCol, CCard, CCardBody, CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CButton, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilOptions, cilHeart, cilCommentBubble, cilBookmark } from '@coreui/icons';
import ApiClient from '../../api/ApiClient'; 
import BlogPost from '../../components/BlogPost';

  const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await ApiClient.get("/posts");
          setPosts(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setError("Failed to load posts. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);
  
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
  
    return (
      <div className="dashboard-container">
        <CRow>
          <CCol xs={12} lg={8}>
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
              <CCard className="mb-4">
                <CCardBody>
                  <p className="text-center">No posts available.</p>
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CRow>
      </div>
    );
  };
  
  export default Dashboard;