.signal-icon,
.arx-icon {
  display: block;
  width: 88px;
  height: 88px;
  object-fit: contain;
  flex: none;
  background: transparent;
}

/* Match the visible artwork while preserving both original images. */
.arx-icon {
  transform: scale(.86);
  transform-origin: center;
}

.feature-head .signal-icon,
.arx-home-heading .arx-icon {
  width: 88px;
  height: 88px;
}

.arx-home-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-bottom: 10px;
}

.arx-home-heading h2 { margin-bottom: 0; }
.arx-home-heading .eyebrow { margin-bottom: 12px; }

.app-card .signal-icon,
.app-card .arx-icon {
  width: 66px;
  height: 66px;
}

.app-card .card-heading > div { min-width: 0; }

.arx-project-art {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.app-heading .signal-icon,
.arx-project-art .arx-icon {
  width: 105px;
  height: 105px;
}

.arx-project-hero { text-align: center; }
.arx-project-hero p { margin-left: auto; margin-right: auto; }

.home-grid .project-heading,
.app-card .project-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 16px;
  width: 100%;
}

.project-heading > div { min-width: 0; }
.home-grid .project-heading { margin-bottom: 18px; }
.home-grid .project-heading .eyebrow { margin: 0 0 18px; }
.home-grid .project-heading h2,
.app-card .project-heading h2 { margin: 0; }
.aside-project { padding-top: 36px; }

.app-card .project-heading {
  min-height: 66px;
  margin-bottom: 16px;
}

.app-card .project-heading .eyebrow {
  font-size: 11px;
  line-height: 1.5;
  margin: 0 0 10px;
}

@media (max-width: 899px) {
  .aside-project { padding-top: 28px; }

  .feature-head .signal-icon,
  .arx-home-heading .arx-icon {
    width: 68px;
    height: 68px;
  }
}

@media (max-width: 680px) {
  .aside-project { padding-top: 23px; }

  .home-grid .project-heading {
    gap: 14px;
    margin-bottom: 13px;
  }

  .home-grid .project-heading .eyebrow {
    margin-bottom: 13px;
  }

  .feature-head .signal-icon,
  .arx-home-heading .arx-icon {
    width: 61px;
    height: 61px;
  }

  .arx-project-art { margin-bottom: 17px; }

  .app-heading .signal-icon,
  .arx-project-art .arx-icon {
    width: 78px;
    height: 78px;
  }
}
