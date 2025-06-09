'use client';

import React from 'react';
import PostCard from './PostCard';

export default function Feed({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
