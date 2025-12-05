import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Image, X } from "lucide-react";

export default function Blog() {
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newText, setNewText] = useState("");
  const [newPicture, setNewPicture] = useState("");

  const getUser = JSON.parse(localStorage.getItem("currentUser"));
  const API_URL = "https://space-back-rnyc.onrender.com"; 

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddPost = async () => {
    if (!newText.trim()) return alert("Post matni bo‘sh bo‘lishi mumkin emas!");

    const newPost = {
      studentId: getUser._id,  
      content: newText,         
      image: newPicture,        
    };

    try {
      const res = await fetch(`${API_URL}/post/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Post qo‘shilmadi!");
      }

      const createdPost = await res.json();
      setPosts([...posts, createdPost]); 
      setNewText("");
      setNewPicture("");
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert(err.message || "Xatolik yuz berdi!");
    }
  };

  return (
    <div className="bg-[#F7F9FB] min-h-screen flex flex-col justify-center items-center max-w-[650px] w-full  mx-auto py-6">
      <div className="w-full max-w-2xl mb-6">
        <div
          onClick={() => setOpenModal(true)}
          className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-2 cursor-pointer hover:shadow-md transition"
        >
          <img
            src={getUser.avatar || ""}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <input
            type="text"
            placeholder="Nimalar haqida o‘yla"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 cursor-pointer"
            readOnly
          />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm mt-10">Hozircha hech qanday post yo‘q 😔</p>
      ) : (
        posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm p-5 w-full max-w-2xl mb-4"
          >
            <div className="flex items-center mb-3">
              <img
                src={post.student.avatar || ""}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <div className="flex gap-2">
                  <h3 className="font-semibold text-gray-800">{post.student.firstname}</h3>
                  <h3 className="font-semibold text-gray-800">{post.student.lastname}</h3>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(post.time).toLocaleString()}
                </p>
              </div>
            </div>

            {post.image && <img className="w-full mb-3" src={post.image} alt="" />}
            <p className="text-gray-800 mb-4">{post.content}</p>

            <div className="flex items-center space-x-4 mb-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{post.likes || 0}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments?.length || 0}</span>
              </button>
            </div>

            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2">
              <input
                type="text"
                placeholder="Comment..."
                maxLength={100}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
              />
              <span className="text-xs text-gray-400 mr-3">0 / 100</span>
              <button className="bg-[#FF6C6C] text-white p-2 rounded-lg hover:bg-[#ff4f4f] transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}

      {openModal && (
        <AddPostModal
          user={getUser}
          text={newText}
          picture={newPicture}
          setText={setNewText}
          setPicture={setNewPicture}
          onClose={() => setOpenModal(false)}
          onPost={handleAddPost}
        />
      )}
    </div>
  );
}

function AddPostModal({ user, text, setText, picture, setPicture, onClose, onPost }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-semibold text-xl mb-5">Post qo‘shish</h2>

        <div className="flex items-center mb-4">
          <img src={!user.avatar || ""} alt="user" className="w-10 h-10 rounded-full object-cover" />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{user.firstname}</h3>
            <p className="text-sm text-gray-500">
              {new Date().toISOString().slice(0, 16).replace("T", ", ")}
            </p>
          </div>
        </div>

        <textarea
          placeholder="O‘z fikrlaringizni qoldiring"
          maxLength={256}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded-xl p-3 resize-none outline-none text-gray-700 placeholder-gray-400"
          rows="3"
        ></textarea>

        <div className="mt-2 text-right text-xs text-gray-400">
          {text.length} / 256
        </div>

        <label className="flex items-center gap-2 border rounded-xl p-3 mt-4 cursor-pointer hover:bg-gray-50 transition">
          <Image className="text-red-500" />
          <input
            type="text"
            placeholder="Rasm URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="flex-1 outline-none bg-transparent"
          />
        </label>

        <button
          onClick={onPost}
          className="w-full mt-5 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Postni joylash
        </button>
      </div>
    </div>
  );
}
