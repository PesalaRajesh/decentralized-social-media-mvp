import React, { useEffect, useState } from 'react';
import WalletButton from '../components/WalletButton';
import ProfileCard from '../components/ProfileCard';
import ProfileEditor from '../components/ProfileEditor';
import { useAccount } from 'wagmi';
import api from '../services/api';

export default function Profile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!address) return;
    api.get(`/users/${address}`).then(res => setProfile(res.data));
  }, [address]);

  const onSave = async (updatedProfile: any) => {
    if (!address) return;
    try {
      await api.post('/users', { wallet_address: address, ...updatedProfile });
      setProfile({ wallet_address: address, ...updatedProfile });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  if (!address) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <WalletButton />
        <p>Please connect your wallet to view and edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <WalletButton />
      {editMode ? (
        <ProfileEditor profile={profile} onSave={onSave} onCancel={() => setEditMode(false)} />
      ) : (
        <>
          <ProfileCard profile={profile} />
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}
