import React from 'react';
import Header from '../components/Header';
import ExperienceColumn from '../components/ExperienceColumn';
import ProjectsColumn from '../components/ProjectsColumn';
import GitHubPulse from '../components/GitHubPulse';
import Footer from '../components/Footer';

const Home: React.FC = () => (
  <div className="grid-bg min-h-screen bg-base text-ink">
    <div className="screen-lock mx-auto flex min-h-screen max-w-[1400px] flex-col gap-4 px-4 py-4">
      <Header />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,1fr)_minmax(340px,1.25fr)_minmax(300px,1fr)]">
        <ExperienceColumn />
        <ProjectsColumn />
        <GitHubPulse />
      </div>

      <Footer />
    </div>
  </div>
);

export default Home;
