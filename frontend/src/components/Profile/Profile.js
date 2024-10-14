import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', bio: '', profileImage: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } });
      setProfile(res.data.profile);
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('bio', profile.bio);
    if (file) {
      formData.append('profileImage', file);
    }
    const token = localStorage.getItem('token');
    await axios.put('/profile/update', formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Bio"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Update Profile</button>
      </form>
      {profile.profileImage && <img src={profile.profileImage} alt="Profile" />}
    </div>
  );
};

export default Profile;
