'use client';

import React, { useState } from 'react';

export default function ProfileEditor({
  profile,
  onSave,
  onCancel,
}: {
  profile: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [username, setUsername] = useState(profile?.username || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [profilePicUrl, setProfilePicUrl] = useState(profile?.profile_pic_url || '');

  const handleSubmit = () => {
    onSave({ username, bio, profile_pic_url: profilePicUrl });
  };

  return (
    <div className="border p-4 rounded space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Username</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Bio</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Profile Picture URL</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
