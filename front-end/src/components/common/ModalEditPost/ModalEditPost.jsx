import "./ModalEditPost.scss";

import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import axios from "axios";
import { reloadPosts } from "../../../Store/reducerPost";
import { storage } from "../../../firebase/firebase";

function ModalEditPost({ show, handleClose, idPost, setShowEdit }) {
  const ref1 = useRef();
  const status = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [textEdit, setTextEdit] = useState("");
  const [defaultOption, setDefaultOptinos] = useState(null);
  const [options, setOptions] = useState([]);

  function handleChangeValue(value) {
    setDefaultOptinos(value);
  }

  const [dataPostEdit, setDataPostEdit] = useState({
    idUser: {
      username: "",
      urlAvatar: "",
    },
    dataPost: {
      text: "",
      urlUpload: "",
    },
  });

  // handle Del Image
  function handleDelImg() {
    setDataPostEdit({
      ...dataPostEdit,
      dataPost: { ...dataPostEdit.dataPost, urlUpload: "" },
    });
  }
  const [urlUpload, setUrlUpload] = useState();

  // handle change image
  async function handleGetImg(e) {
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
    dispatch(reloadPosts());
  }

  // handle Finish Edit
  async function handleFinishEdit() {
    await axios.patch(`http://localhost:8000/posts/${idPost}`, {
      ...dataPostEdit,
      dataPost: {
        tagName: defaultOption,
        text: textEdit,
        urlUpload: urlUpload,
      },
    });

    dispatch(reloadPosts());
    setShowEdit(false);
  }
  // useEffect
  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }

    axios
      .get(`http://localhost:8000/users`)
      .then((res) =>
        setOptions(
          res.data.map((e) => ({ label: e.username, value: e.username }))
        )
      )
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8000/posts/${idPost}`)
      .then((res) => {
        setDataPostEdit(res.data);
        setTextEdit(res.data.dataPost.text);
        setUrlUpload(res.data.dataPost.urlUpload);
        setDefaultOptinos(res.data.dataPost.tagName);
      })
      .catch((err) => console.log(err));
  }, [status]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="row-info">
            <div>
              <img src={dataPostEdit.idUser.urlAvatar} alt="" />
            </div>
            <p>{dataPostEdit.idUser.username}</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-edit">
          <Select
            value={defaultOption}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeValue}
          />
          {dataPostEdit.dataPost.text ? (
            <input
              ref={ref1}
              type="text"
              value={textEdit}
              onChange={(e) => setTextEdit(e.target.value)}
            />
          ) : (
            <input ref={ref} />
          )}
          {dataPostEdit.dataPost.urlUpload ? (
            <div className="block-img-edit">
              <img src={urlUpload} alt="" />
              <div className="absolute">
                <label htmlFor="edit">
                  <i className="fa-solid fa-pen"></i>
                </label>
                <input type="file" name="" id="edit" onChange={handleGetImg} />
                <label htmlFor="">
                  <i
                    onClick={handleDelImg}
                    className="fa-regular fa-circle-xmark"
                  ></i>
                </label>
              </div>
            </div>
          ) : (
            <div className="upload-firebase">
              <label className="box" htmlFor="upload">
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="upload"
                onChange={handleGetImg}
              />
            </div>
          )}
        </div>
        <div className="btn-finish">
          <button onClick={handleFinishEdit}>
            Finish <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalEditPost;
