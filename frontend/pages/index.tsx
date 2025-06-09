import React, { useEffect, useState } from 'react';
import WalletButton from '../components/WalletButton';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import api from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    }
    loadPosts();
  }, []);

  const handlePostCreated = () => {
    // Reload posts after new post
    api.get('/posts').then(res => setPosts(res.data));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <WalletButton />
      <PostComposer onPost={handlePostCreated} />
      <div className="mt-4 space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
