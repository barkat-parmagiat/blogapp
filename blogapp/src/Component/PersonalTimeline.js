import React, { useState, useEffect, useRef } from 'react';
//for validation

import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/Images/avatar.jpg';
import axios from 'axios';
import {
  Navbar,
  Container,
  NavDropdown,
  FormControl,
  Form,
  Nav,
  Button,
} from 'react-bootstrap';
import InnerHeader from '../common/InnerHeader';
import {
  post as createPost,
  getPosts,
  postComment,
  deletePost,
  editPost,
} from '../services/postservice';
import * as Icon from 'react-bootstrap-icons';

const Timeline = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [stories, setStories] = useState([]);
  //for create post
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [currentPostId, setCurrentPostId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getAllPost();
  }, [email]);

  const getAllPost = async () => {
    try {
      let all_post = await getPosts(email);
      console.log(all_post);
      if (all_post) {
        setStories(all_post.data);
      }
    } catch (err) {}
  };

  //submit a post.
  const posting = async (ev) => {
    ev.preventDefault();
    let inputText = ev.target.postText.value;

    if (isEditMode) {
      try {
        let update_payload = {
          body: inputText,
        };
        let edit_res = await editPost(post?._id, update_payload);
        if (edit_res) {
          getAllPost();
          //alert(' Yeah!! post updated');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let postPayload = {
          body: inputText,
          user_id: email,
        };
        let post_res = await createPost(postPayload);
        if (post_res) {
          //if new post work. refresh timeline.
          getAllPost();
        }
      } catch {
        setIsButtonLoading(false);
      }

      setStories([inputText, ...stories]);
    }
    //reset
    ev.target.reset();
  };

  //open/show comment list
  //else hide.
  const onCommentClick = (post_id) => {
    setCurrentPostId(post_id);
    let this_post = stories.find((post) => post._id === post_id);
    let temp_A = this_post?.comments.reverse();
    setComments(temp_A);
  };

  //this will create a new comment for a post
  //and refresh comment list
  const postNewComment = async (postId, commentBody) => {
    try {
      let comment_res = await postComment(commentBody, postId);
      if (comment_res) {
        setCurrentPostId(postId);
        let temp_A = comment_res?.data?.comments.reverse();
        setComments(temp_A);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOnePost = async (postId) => {
    try {
      let delete_res = await deletePost(postId);
      console.log(delete_res);
      if (delete_res) {
        let temp_stories = stories.filter((story) => story._id !== postId);
        setStories(temp_stories);
      }
    } catch (err) {}
  };

  /*  const editOnePost = async (postId, post_body) => {
    try {
      let editpostPayload = {
        body: post_body,
      };
      let edit_res = await editPost(postId, editpostPayload);
      if (edit_res) {
        alert(' Yeah!! post updated');
      }
    } catch (err) {}
  }; */

  const editOnClick = (post_id) => {
    try {
      //find post from all posts by post_id
      //set it to text area
      let post = stories.find((post) => post._id === post_id);
      if (post) {
        setIsEditMode(true);
        setPost(post);
      }
    } catch (err) {
      setIsEditMode(false);
    }
  };

  return (
    <>
      <section>
        <Container>
          <form onSubmit={posting}>
            <div className="row">
              <div className="mt-2 flex border-2">
                <Form.Control
                  as="textarea"
                  name="postText"
                  id="ta"
                  value={post?.body}
                  onChange={(ev) => {
                    let e_post = {
                      _id: post?._id,
                      body: ev.target.value,
                    };
                    setPost(e_post);
                  }}
                  placeholder="share your story"
                  rows={3}
                />
              </div>
            </div>
            <div className="row">
              <div className=" flex  border-b-2 border-l-2 border-r-2">
                <div className="flex flex-row-reverse py-2 w-100">
                  <div>
                    <Button type="submit" /*onClick={posting}*/>
                      {isEditMode ? 'Save' : 'Post'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>
        <Container>
          <div className="row">
            <div id="posted">
              <div>
                {stories.map((story, index) => (
                  <div className=" border-2 mt-2 p-2">
                    <div className="flex justify-between">
                      <div className={'pt-1 pb-3'}>{story.body}</div>
                      <NavDropdown title="" id="navbarScrollingDropdown">
                        <NavDropdown.Item
                          onClick={(ev) => {
                            deleteOnePost(story._id);
                          }}
                        >
                          <div className="red flex">
                            <Icon.Trash />
                            Delete
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={(ev) => editOnClick(story?._id)}
                        >
                          <div className="green flex">
                            <Icon.PencilFill />
                            Edit
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className="d-flex   border-2 fs-12">
                      <div className="p-2  content-center cursor small">
                        <span>
                          {' '}
                          <Icon.HandThumbsUp />
                        </span>
                        <span>Like</span>
                      </div>
                      <div className=" p-2 cursor">
                        <span className=" small">
                          {' '}
                          <Icon.ChatDots
                            onClick={(ev) => onCommentClick(story?._id)}
                          />
                          Comments
                        </span>
                      </div>
                      <div className=" p-2 cursor">
                        <span className=" small">
                          <Icon.Share />
                          Share
                        </span>
                      </div>
                    </div>
                    {currentPostId === story?._id && (
                      <CommentBox
                        index={index}
                        onPost={postNewComment}
                        user_id={localStorage.getItem('_id')}
                        post_id={story?._id}
                      />
                    )}
                    {currentPostId === story?._id && (
                      <CommentList clist={comments} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const CommentBox = ({ index, onPost, user_id, post_id }) => {
  const commentBoxRef = useRef();
  const onCommentPost = () => {
    let payload = {
      user_id: user_id,
      comment_body: commentBoxRef.current.value,
    };
    //call post function
    onPost(post_id, payload);
    commentBoxRef.current.value = '';
  };
  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between w-100 py-2">
          <div className="w-100 ">
            <Form.Group className="">
              <Form.Control
                ref={commentBoxRef}
                as="textarea"
                name="postText"
                id="ta"
                placeholder="comment"
                rows={1}
              />
            </Form.Group>
          </div>
          <div className="pl-2">
            <Button onClick={onCommentPost}>Comment</Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

const CommentList = ({ clist }) => {
  return (
    <>
      {clist?.length == 0 ? (
        'No comments, be first to comment'
      ) : (
        <div className="row">
          <div className="col-md-12">
            {clist.map((comment, index) => (
              <div className="border-1 p-2 my-2">{comment?.comment_body}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Timeline;
