import "./Information.scss";

import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

import Comnents from "../../common/Comments/Comnents";
import ModalEditPost from "../../common/ModalEditPost/ModalEditPost";
import Navbar from "../../common/Navbar/Navbar";
import Posts from "../../common/Posts/Posts";
import Sidebar from "../../common/Sidebar/Sidebar";
import axios from "axios";
import { reloadPosts } from "../../../Store/reducerPost";
import { storage } from "../../../firebase/firebase";
import { useParams } from "react-router-dom";

function Information({ theme, changeMode }) {
  const idPost = useRef();

  const status = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  // get infor user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );
  const [dataComment, setDataComment] = useState();
  const [dataUser, setDataUser] = useState({});
  const [dataPostUser, setDataPostUser] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState("");

  // params
  const param = useParams();

  // async await
  const loaderUser = async () => {
    await axios
      .get(`http://localhost:8000/users/${param.id}`)
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  };

  const getPostUser = async () => {
    await axios
      .get("http://localhost:8000/posts?_sort=id&_order=desc")
      .then((res) => {
        setDataPostUser(
          res.data.filter((e) => e.idUser.id === Number(param.id))
        );
        setLike(res.data.map((e) => ({ id: e.id, like: e.like })));
      })
      .catch((err) => console.log(err));
  };
  // load comments
  const loaderComments = async (id) => {
    await axios
      .get(`http://localhost:8000/comments/${id}`)
      .then((res) => setDataComment(res.data))
      .catch((err) => console.log(err));
  };
  // handle delete post
  async function handleDeletePost(id) {
    await axios.delete(`http://localhost:8000/posts/${id}`);
    await axios.delete(`http://localhost:8000/comments/${id}`);
    dispatch(reloadPosts());
    // setStatusReload(!statusReload);
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

  // handle edit profile
  function handleChangeWallpaper(e) {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUser({ ...user, urlWallpaper: downloadURL });
          localStorage.setItem("dataUserLogin", JSON.stringify(user));

          axios.patch(`http://localhost:8000/users/${param.id}`, {
            ...dataUser,
            urlWallpaper: downloadURL,
          });
        });
      }
    );
    dispatch(reloadPosts());
  }
  // handle Change Avatar
  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUser({ ...user, urlAvatar: downloadURL });
          localStorage.setItem("dataUserLogin", JSON.stringify(user));

          axios.patch(`http://localhost:8000/users/${param.id}`, {
            ...dataUser,
            urlAvatar: downloadURL,
          });
        });
      }
    );

    dispatch(reloadPosts());
  }
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

  // handle show modal edit posts
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = (id) => {
    setShowEdit(true);
    idPost.current = id;
    dispatch(reloadPosts());
  };

  // useEffect
  useEffect(() => {
    loaderUser();
    getPostUser();
    if (idPost.current) {
      loaderComments(idPost.current);
    }
  }, [status]);

  return (
    <div>
      <Navbar changeMode={changeMode} />
      {/* body information */}
      <div className="body-information">
        <div className="wallpaper">
          <img src={dataUser.urlWallpaper} alt="" />
          {dataUser.username === user.username ? (
            <>
              <label htmlFor="editWallpaper" className="editWallpaper">
                <i className="fa-solid fa-pen"></i>
                <input
                  type="file"
                  name=""
                  id="editWallpaper"
                  onChange={handleChangeWallpaper}
                />
              </label>
            </>
          ) : (
            ""
          )}
          <div className="avatar-information">
            <div>
              <img src={dataUser.urlAvatar} alt="" />
              {dataUser.username === user.username ? (
                <>
                  <label htmlFor="editAvatar">
                    <i className="fa-solid fa-pen"></i>
                    <input
                      type="file"
                      name=""
                      id="editAvatar"
                      onChange={handleChangeAvatar}
                    />
                  </label>
                </>
              ) : (
                ""
              )}
            </div>
            <h1 style={{ color: !theme ? "#fff" : "#000" }}>
              {dataUser.username}
            </h1>
          </div>
        </div>
        <div className="body-posts">
          {/* Đây là side bar */}
          <div className="departmemts">
            <Sidebar />
          </div>
          {/* Đây là body post */}
          <div className="posts">
            {dataUser.username === user.username ? <Posts /> : <></>}
            <ul className="list-my-news">
              {dataPostUser.map((e, i) => {
                return (
                  <li
                    style={{ display: e.isHidden ? "none" : "" }}
                    key={i}
                    className="item"
                  >
                    <div className="head">
                      <div className="avatar">
                        <img src={dataUser.urlAvatar} alt="" />
                      </div>
                      <p>{dataUser.username}</p>
                      {dataUser.username === user.username ? (
                        <div className="action-post">
                          <i
                            onClick={() => handleShowEdit(e.id)}
                            className="fa-solid fa-pen-to-square"
                          ></i>{" "}
                          <i
                            className="fa-solid fa-xmark"
                            onClick={() => handleDeletePost(e.id)}
                          ></i>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="content">
                      {e.dataPost.tagName ? (
                        <span className="tag-name">
                          {e.dataPost.tagName.map((e) => (
                            <b>@{e.value} </b>
                          ))}
                        </span>
                      ) : (
                        ""
                      )}
                      {e.dataPost.text ? (
                        <p className="noidung">{e.dataPost.text}</p>
                      ) : (
                        ""
                      )}
                      {e.dataPost.urlUpload ? (
                        <img src={e.dataPost.urlUpload} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="total-heart">
                      <i className="fa-solid fa-heart"></i> {e.like}
                    </div>
                    <div className="action-item">
                      <button
                        className="heart"
                        onClick={() => handleHeart(e.id)}
                      >
                        <i className="fa-solid fa-heart button_top"></i>
                      </button>
                      <button
                        disabled={e.like === 0}
                        className="dis-like"
                        onClick={() => handleDisLike(e.id)}
                      >
                        <i className="fa-solid fa-heart-crack button_top"></i>
                      </button>
                      <button
                        className="comment"
                        onClick={() => handleShow(e.id)}
                      >
                        <i className="fa-solid fa-comment button_top"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* modal comments */}
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

      {/* modal edit posts */}
      <ModalEditPost
        show={showEdit}
        handleClose={handleCloseEdit}
        idPost={idPost.current}
        setShowEdit={setShowEdit}
      />
    </div>
  );
}

export default Information;
