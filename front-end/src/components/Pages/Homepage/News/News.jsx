import "./News.scss";

import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Comnents from "../../../common/Comments/Comnents";
import ModalEditPost from "../../../common/ModalEditPost/ModalEditPost";
import Posts from "../../../common/Posts/Posts";
import axios from "axios";
import { reloadPosts } from "../../../../Store/reducerPost";
import { useNavigate } from "react-router-dom";

function News() {
  // save id commnet by useRef
  const idPost = useRef();

  // useSelector useDispatch
  const status = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  // all state
  const [dataNew, setDataNew] = useState([]);
  const [dataComment, setDataComment] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );
  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [statusUpdate, setStatusUpdate] = useState(false);
  // const [countLike, setCountLike] = useState([]);

  const loaderComments = async (id) => {
    if (id) {
      await axios
        .get(`http://localhost:8000/comments/${id}`)
        .then((res) => setDataComment(res.data))
        .catch((err) => console.log(err));
    }
  };

  // handle delete post
  async function handleDeletePost(id) {
    if (id) {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      await axios.delete(`http://localhost:8000/comments/${id}`);
    }
    dispatch(reloadPosts());
  }

  // modal state
  const handleClose = () => {
    setShow(false);
    setTextComment("");
    setStatusUpdate(false);
  };
  const handleShow = (id) => {
    setShow(true);
    idPost.current = id;
    loaderComments(id);
  };

  // modal state show edit posts
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (id) => {
    setShowEdit(true);
    idPost.current = id;
    dispatch(reloadPosts());
  };

  // handle like posts
  const [like, setLike] = useState([]);
  async function handleHeart(id) {
    like.map((e) => {
      if (e.id === id) {
        e.like += 1;
        axios.patch(`http://localhost:8000/posts/${id}`, { like: e.like });
      }
    });
    dispatch(reloadPosts());
  }

  async function handleDisLike(id) {
    like.map((e) => {
      if (e.id === id) {
        e.like -= 1;
        axios.patch(`http://localhost:8000/posts/${id}`, { like: e.like });
      }
    });
    dispatch(reloadPosts());
  }

  // navigate
  const navigate = useNavigate();

  const loaderPost = async () => {
    await axios
      .get("http://localhost:8000/posts?_sort=id&_order=desc")
      .then((res) => {
        setDataNew(res.data);
        setLike(res.data.map((e) => ({ id: e.id, like: e.like })));
      })
      .catch((err) => console.log(err));
  };

  function handleToUser(id) {
    if (id) {
      navigate(`/information/${id}`);
    }
  }

  // useEffect
  useEffect(() => {
    loaderPost();
    if (idPost.current) {
      loaderComments(idPost.current);
    }
  }, [status]);
  return (
    <div className="container-news">
      {/* post news */}
      <Posts />
      {/* news item */}
      <div className="list-new">
        {dataNew.map((e, i) => {
          return (
            <div
              style={{ display: e.isHidden ? "none" : "" }}
              key={i}
              className="item"
              id={e.id}
            >
              <div className="head">
                <div
                  className="avatar"
                  onClick={() => handleToUser(e.idUser.id)}
                >
                  <img src={e.idUser.urlAvatar} alt="" />
                </div>
                <p>{e.idUser.username}</p>
                {user.username === e.idUser.username ? (
                  <div className="action-post">
                    <i
                      onClick={() => handleShowEdit(e.id)}
                      className="fa-solid fa-pen-to-square"
                    ></i>
                    <i
                      onClick={() => handleDeletePost(e.id)}
                      className="fa-solid fa-xmark"
                    ></i>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="content">
                {e.dataPost.tagName ? (
                  <span className="tag-name">
                    {e.dataPost.tagName.map((e, i) => (
                      <b key={i}>{e.value} </b>
                    ))}
                  </span>
                ) : (
                  ""
                )}
                {e.dataPost.text ? (
                  <p className="noidung">{e.dataPost.text}</p>
                ) : (
                  <></>
                )}
                {e.dataPost.urlUpload ? (
                  <img src={e.dataPost.urlUpload} alt="" />
                ) : (
                  <></>
                )}
              </div>
              <div className="total-heart">
                <i className="fa-solid fa-heart"></i> {e.like}
              </div>
              <div className="action-item">
                <button className="heart" onClick={() => handleHeart(e.id)}>
                  <i
                    style={{ color: "red" }}
                    className="fa-solid fa-heart button_top"
                  ></i>
                </button>
                <button
                  disabled={e.like === 0}
                  className="dis-like"
                  onClick={() => handleDisLike(e.id)}
                >
                  <i
                    style={{ color: "red" }}
                    className="fa-solid fa-heart-crack button_top"
                  ></i>
                </button>
                <button className="comment" onClick={() => handleShow(e.id)}>
                  <i
                    style={{ color: "blue" }}
                    className="fa-solid fa-comment button_top"
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* modal */}

      {/* modal Comments */}
      {idPost.current ? (
        <Comnents
          show={show}
          handleClose={handleClose}
          dataComment={dataComment}
          textComment={textComment}
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          setTextComment={setTextComment}
          idPost={idPost.current}
        />
      ) : (
        ""
      )}

      {/* modal edit posts */}
      {idPost.current ? (
        <ModalEditPost
          show={showEdit}
          handleClose={handleCloseEdit}
          idPost={idPost.current}
          setShowEdit={setShowEdit}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(News);
