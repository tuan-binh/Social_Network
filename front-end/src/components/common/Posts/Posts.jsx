import "./Posts.scss";

import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import axios from "axios";
import { reloadPosts } from "../../../Store/reducerPost";
import { storage } from "../../../firebase/firebase";
import { useDispatch } from "react-redux";

function Posts() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );
  const loaderUser = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((res) => {
        setOptions(
          res.data.map((e) => ({ label: e.username, value: e.username }))
        );
      })
      .catch((err) => console.log(err));
  };

  // const status = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [textPost, setTextPost] = useState("");

  // const [url, setUrl] = useState("");
  const [urlUpload, setUrlUpload] = useState("");
  // async function handleChangeSrc(e) {}

  async function handleChangeSrc(e) {
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
          setUrlUpload(downloadURL);
        });
      }
    );
  }

  function handleDeleteImage() {
    setUrlUpload("");
  }

  // handle posts
  async function handlePost() {
    // set POSTS
    setShow(false);
    await axios.post("http://localhost:8000/posts", {
      like: 0,
      isHidden: false,
      idUser: {
        id: user.id,
        username: user.username,
        urlAvatar: user.urlAvatar,
      },
      dataPost: {
        tagName: selected,
        text: textPost,
        urlUpload: urlUpload,
      },
    });
    await axios.post("http://localhost:8000/comments", { dataComment: [] });
    dispatch(reloadPosts());
    setUrlUpload("");
  }

  function handleChangeValue(value) {
    setSelected(value);
  }
  // modal show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUrlUpload("");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    loaderUser();
  }, []);

  return (
    <>
      <div className="postNews" onClick={handleShow}>
        <div className="content">
          <h2>Writing for something...</h2>
        </div>
        <div className="actionPost">
          <div className="live">
            <i className="fa-solid fa-video"></i>
          </div>
          <div className="image">
            <i className="fa-solid fa-images"></i>
          </div>
          <div className="emoji">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>

      {/* Modal post */}
      <Modal className="modal-post" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title-modal">Tạo bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChangeValue}
            />
            <textarea
              placeholder="Bình, có thể viết gì đó"
              value={textPost}
              onChange={(e) => setTextPost(e.target.value)}
            ></textarea>
            {urlUpload ? (
              <div className="showImage">
                <img src={urlUpload} alt="" />
                <i
                  onClick={handleDeleteImage}
                  className="fa-regular fa-circle-xmark"
                ></i>
              </div>
            ) : (
              <div className="upload-firebase">
                <label className="box" htmlFor="upload">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </label>
                <input
                  type="file"
                  name=""
                  id="upload"
                  onChange={handleChangeSrc}
                />
              </div>
            )}
            <Button
              onClick={handlePost}
              className="btn"
              variant="primary"
              disabled={textPost === "" && urlUpload === ""}
              style={{
                backgroundColor: !textPost && !urlUpload ? "#ccc" : "",
                color: !textPost && !urlUpload ? "#000" : "",
                border: "none",
              }}
            >
              Đăng
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Posts;
