import React, { useState, useEffect } from 'react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { Avatar } from '@telegram-apps/telegram-ui';

import homeSvg from './assets/home.svg';
import homeActiveSvg from './assets/home-active.svg';
import settingsSvg from './assets/settings.svg';
import settingsActiveSvg from './assets/settings-active.svg';

const HomePage = () => (
  <div style={{ color: "#fff", fontSize: 20 }}>
    <h2>Home Page</h2>
    <p>Welcome to the home page!</p>
  </div>
);

const SettingsPage = () => (
  <div style={{ color: "#fff", fontSize: 20 }}>
    <h2>Settings</h2>
    <p>Here you can change your app settings.</p>
  </div>
);

const ProfilePage = () => (
  <div style={{ color: "#fff", fontSize: 20 }}>
    <h2>Your Profile</h2>
    <p>This is your profile page.</p>
  </div>
);

const TABS = {
  home: {
    title: 'Home',
    icon: homeSvg,
    activeIcon: homeActiveSvg,
    component: <HomePage />
  },
  settings: {
    title: 'Settings',
    icon: settingsSvg,
    activeIcon: settingsActiveSvg,
    component: <SettingsPage />
  },
  profile: {
    title: 'Profile',
    component: <ProfilePage />
  }
};

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'settings' | 'profile'>('home');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Получаем данные пользователя из Telegram Web App
  useEffect(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user?.photo_url) {
      setUserPhoto(user.photo_url);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111",
      }}
    >
      {/* Контент */}
      <div
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: "#111",
        }}
      >
        {TABS[currentTab].component}
      </div>

      {/* Tabbar */}
      <div
        style={{
          backgroundColor: "#111",
          borderTop: "1px solid #222"
        }}
      >
        <Tabbar>
          {Object.entries(TABS).map(([id, tab]) => (
            <Tabbar.Item
              key={id}
              selected={id === currentTab}
              text={tab.title}
              onClick={() => setCurrentTab(id as any)}
            >
              {id === 'profile' && userPhoto ? (
                <Avatar size={24} src={userPhoto} />
              ) : (
                <img
                  src={id === currentTab ? tab.activeIcon : (tab.icon || '')}
                  width={24}
                  height={24}
                  alt={tab.title}
                  style={{ display: "block" }}
                />
              )}
            </Tabbar.Item>
          ))}
        </Tabbar>
      </div>
    </div>
  );
};

export default App;