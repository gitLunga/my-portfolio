import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { FaCode, FaFire, FaTrophy } from "react-icons/fa";
import { Reveal } from "../ScrollReveal";
import { useTheme } from "../../context/ThemeContext";

const GITHUB_USERNAME = "gitLunga";

// The calendar needs a real color it can parse (it runs the value through
// tinycolor2 to derive the four intensity shades), not a CSS custom property
// string — so the two theme variants of --accent are mirrored here by hand
// from src/styles/tokens.css. Update both places together if that token moves.
const ACCENT_DARK = "#c770f0";
const ACCENT_LIGHT = "#7c3aed";

function computeStreaks(days) {
  const total = days.reduce((sum, d) => sum + d.count, 0);

  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.count > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  // Counts backward from the most recent day in the response. If that day
  // hasn't happened yet (contributed nothing so far today), the streak
  // correctly reads 0 until it does — same behavior as GitHub's own profile.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i].count > 0) current += 1;
    else break;
  }

  return { total, current, longest };
}

function Github() {
  const { theme } = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Same public, unauthenticated endpoint react-github-calendar itself
    // calls for the calendar's own data — reusing it means these numbers
    // can never disagree with what the calendar draws.
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((data) => {
        if (!cancelled) setStats(computeStreaks(data.contributions));
      })
      .catch(() => {
        // Stats are a bonus on top of the calendar below, which fetches and
        // handles its own error state independently — failing quietly here
        // just means the stat row doesn't render, nothing else breaks.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Reveal variant="fadeUp" delay={0} className="github-card">
        {stats && (
          <div className="github-stats-row">
            <div className="github-stat">
              <FaCode className="github-stat-icon" />
              <div>
                <span className="github-stat-value">{stats.total}</span>
                <span className="github-stat-label">contributions this year</span>
              </div>
            </div>
            <div className="github-stat">
              <FaFire className="github-stat-icon" />
              <div>
                <span className="github-stat-value">{stats.current}</span>
                <span className="github-stat-label">day streak</span>
              </div>
            </div>
            <div className="github-stat">
              <FaTrophy className="github-stat-icon" />
              <div>
                <span className="github-stat-value">{stats.longest}</span>
                <span className="github-stat-label">longest streak</span>
              </div>
            </div>
          </div>
        )}

        <div className="github-calendar-wrapper">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            blockSize={14}
            blockMargin={5}
            blockRadius={3}
            color={theme === "light" ? ACCENT_LIGHT : ACCENT_DARK}
            fontSize={14}
          />
        </div>
      </Reveal>
    </Row>
  );
}

export default Github;
