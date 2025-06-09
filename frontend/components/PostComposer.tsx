'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import api from '../services/api';

export default function PostComposer({ onPost }: { onPost: () => void }) {
  const { address } = useAccount();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!address || !content.trim()) return;
    if (content.length > 280) {
      alert('Post content cannot exceed 280 characters');
      return;
    }
    try {
      await api.post('/posts', { wallet_address: address, content });
      setContent('');
      onPost();
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  if (!address) {
    return <p>Please connect your wallet to post.</p>;
  }

  return (
    <div>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={280}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
