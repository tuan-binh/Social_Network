import "./Comments.scss";

import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { reloadPosts } from "../../../Store/reducerPost";
import { useDispatch } from "react-redux";

function Comnents({
  show,
  handleClose,
  dataComment,
  textComment,
  statusUpdate,
  setStatusUpdate,
  setTextComment,
  idPost,
  postId,
}) {
  const indexEdit = useRef();

  const dispatch = useDispatch();
  // user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );

  // handle Commnets and state commnets
  async function handleComment(e) {
    e.preventDefault();
    if (statusUpdate) {
      // khi edit
      const newList = [...dataComment.dataComment];
      newList[indexEdit.current] = {
        idUser: { username: user.username, urlAvatar: user.urlAvatar },
        text: textComment,
      };
      await axios.patch(`http://localhost:8000/comments/${idPost}`, {
        dataComment: newList,
      });
      setStatusUpdate(false);
    } else {
      // khi comment
      const newCommnet = [...dataComment.dataComment];
      newCommnet.push({
        idUser: { username: user.username, urlAvatar: user.urlAvatar },
        text: textComment,
      });
      await axios.patch(`http://localhost:8000/comments/${idPost}`, {
        dataComment: newCommnet,
      });
    }
    dispatch(reloadPosts());
    setTextComment("");
  }

  // handle delete comment
  async function handleDeleteComment(index) {
    const newList = [...dataComment.dataComment];
    newList.splice(index, 1);
    await axios.patch(`http://localhost:8000/comments/${idPost}`, {
      dataComment: newList,
    });
    dispatch(reloadPosts());
  }

  // handle edit comments
  async function handleEditComment(index) {
    setStatusUpdate(true);
    const newList = [...dataComment.dataComment];
    indexEdit.current = index;
    setTextComment(newList[index].text);
  }

  return (
    <Modal className="modal-comment" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="row-info">
            <div>
              <img src={postId.idUser.urlAvatar} alt="" />
            </div>
            <p>{postId.idUser.username}</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="info-comment">
          <div className="tag-name">
            {postId.dataPost.tagName
              ? postId.dataPost.tagName.map((e, i) => (
                  <span key={i}>{e.value} </span>
                ))
              : ""}
          </div>
          <div className="noi-dung">
            {postId.dataPost.text ? postId.dataPost.text : ""}
          </div>
          <div className="block-img">
            {postId.dataPost.urlUpload ? (
              <img src={postId.dataPost.urlUpload} alt="" />
            ) : (
              ""
            )}
          </div>
        </div>
        <ul>
          {dataComment ? (
            dataComment.dataComment.map((comment, i) => {
              return (
                <li key={i}>
                  <img src={comment.idUser.urlAvatar} alt="" />
                  <div className="user">
                    <p>
                      <b>{comment.idUser.username}</b>
                    </p>
                    <p className="text-user">
                      <span>{comment.text}</span>
                      {comment.idUser.username === user.username ? (
                        <span className="action">
                          <i
                            onClick={() => handleEditComment(i)}
                            className="fa-solid fa-pen-to-square"
                          ></i>
                          {!statusUpdate ? (
                            <i
                              onClick={() => handleDeleteComment(i)}
                              className="fa-solid fa-xmark"
                            ></i>
                          ) : (
                            ""
                          )}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <form className="send-message" onSubmit={handleComment}>
          <img src={user.urlAvatar} alt="" />
          <input
            onChange={(e) => setTextComment(e.target.value)}
            value={textComment}
            type="text"
            placeholder="Enter your message..."
          />
          {statusUpdate ? (
            <Button
              className="btn-send"
              variant="primary"
              disabled={textComment === ""}
            >
              Upload <i className="fa-solid fa-paper-plane"></i>
            </Button>
          ) : (
            <Button
              className="btn-send"
              variant="primary"
              disabled={textComment === ""}
            >
              Send <i className="fa-solid fa-paper-plane"></i>
            </Button>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Comnents;
