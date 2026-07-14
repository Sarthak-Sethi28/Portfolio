import { profile } from '../profile';
import { experience } from '../experience';
import { projects } from '../projects';

describe('profile', () => {
  it('has the core public fields', () => {
    expect(profile.name).toBe('Sarthak Sethi');
    expect(profile.email).toBe('s36sethi@uwaterloo.ca');
    expect(profile.github).toBe('Sarthak-Sethi28');
    expect(profile.githubUrl).toContain('Sarthak-Sethi28');
    expect(profile.linkedinUrl).toContain('linkedin.com');
    expect(profile.resumeUrl).toMatch(/\.pdf$/);
  });

  it('does not expose a phone number', () => {
    expect(JSON.stringify(profile)).not.toMatch(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
  });
});

describe('experience', () => {
  it('has 5 entries, each with company/role/period/location/metric', () => {
    expect(experience).toHaveLength(5);
    for (const e of experience) {
      expect(e.company.trim()).not.toBe('');
      expect(e.role.trim()).not.toBe('');
      expect(e.period.trim()).not.toBe('');
      expect(e.location.trim()).not.toBe('');
      expect(e.metric.trim()).not.toBe('');
    }
  });

  it('leads with Volaris in present tense (current role)', () => {
    expect(experience[0].company).toMatch(/Volaris|Constellation/);
    expect(experience[0].metric).toMatch(/^(Shipping|Building)/);
  });

  it('marks exactly one education entry', () => {
    expect(experience.filter((e) => e.isEducation)).toHaveLength(1);
  });
});

describe('projects', () => {
  it('has exactly 6 projects, each with a metric and >=1 tag', () => {
    expect(projects).toHaveLength(6);
    for (const p of projects) {
      expect(p.title.trim()).not.toBe('');
      expect(p.metric.trim()).not.toBe('');
      expect(p.tags.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('gives award badges only to the two winners', () => {
    const winners = projects.filter(
      (p) => p.badge === 'Hackathon Winner' || p.badge === '1st Prize'
    );
    expect(winners.map((p) => p.title).sort()).toEqual(
      ['CarRaksha', 'Muse Sketch Studio'].sort()
    );
  });

  it('does not include the dropped meta portfolio project', () => {
    expect(projects.some((p) => /portfolio website/i.test(p.title))).toBe(false);
  });

  it('every external project link is a real https url', () => {
    for (const p of projects) {
      if (p.url) expect(p.url).toMatch(/^https:\/\//);
    }
  });
});
