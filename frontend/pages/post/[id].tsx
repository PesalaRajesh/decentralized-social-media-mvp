import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WalletButton from '../../components/WalletButton';
import api from '../../services/api';
import { useAccount } from 'wagmi';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();
  const [post, setPost] = useState<any>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const handleLike = async () => {
    if (!address) return;
    await api.post(`/posts/${id}/like`, { wallet_address: address });
    // Refresh post details
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const handleComment = async () => {
    if (!address || !commentText.trim()) return;
    await api.post(`/posts/${id}/comment`, { wallet_address: address, content: commentText.trim() });
    setCommentText('');
    // Refresh post details
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <WalletButton />
      <div className="border p-4 rounded space-y-4">
        <div className="font-bold">{post.wallet_address}</div>
        <div>{post.content}</div>
        <div>
          <button onClick={handleLike} className="mr-4">
            👍 Like ({post.likes?.length || 0})
          </button>
        </div>
        <div>
          <h3 className="font-semibold">Comments</h3>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c: any) => (
              <div key={c.id} className="border-t py-2">
                <div className="font-semibold">{c.wallet_address}</div>
                <div>{c.content}</div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          {address && (
            <div className="mt-2">
              <textarea
                rows={3}
                className="w-full border rounded p-2"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                onClick={handleComment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
