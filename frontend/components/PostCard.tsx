'use client';

import React from 'react';
import Link from 'next/link';
import api from '../services/api';
import { useAccount } from 'wagmi';

export default function PostCard({ post }: any) {
  const { address } = useAccount();

  const like = async () => {
    if (!address) return;
    try {
      await api.post(`/posts/${post.id}/like`, { wallet_address: address });
    } catch (error) {
      console.error('Like failed', error);
    }
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <div className="font-bold">{post.wallet_address}</div>
      <div>{post.content}</div>
      <div className="flex space-x-4">
        <button onClick={like} className="text-blue-600">
          👍 {post.likes?.length || 0}
        </button>
        <Link href={`/post/${post.id}`} className="text-blue-600">
          🗨️ {post.comments?.length || 0}
        </Link>
      </div>
    </div>
  );
}
