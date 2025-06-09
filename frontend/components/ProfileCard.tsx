'use client';

import React from 'react';

export default function ProfileCard({ profile }: any) {
  if (!profile) {
    return <p>No profile data.</p>;
  }
  return (
    <div className="border p-4 rounded">
      <img
        src={profile.profile_pic_url || '/default-profile.png'}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold">{profile.username || 'Unnamed'}</h2>
      <p>{profile.bio || 'No bio provided'}</p>
      <p className="text-sm text-gray-500">{profile.wallet_address}</p>
    </div>
  );
}
