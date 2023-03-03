import React from 'react'

import './Wave.css'

function WaveComponent() {
  return (
    <div className="wave-container">
<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="gradient" x1="99%" y1="40%" x2="1%" y2="60%">
    <stop offset="5%" stopColor="#ae0296"></stop>
    <stop offset="95%" stopColor="#3b68fd"></stop>
  </linearGradient>
</defs>
<path
  d="M0,224L48,234.7C96,245,192,267,288,234.7C384,203,480,117,576,106.7C672,96,768,160,864,160C960,160,1056,96,1152,96C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
  stroke="none"
  strokeWidth="0"
  fill="url(#gradient)"
  fillOpacity="1"

></path>
</svg>
    </div>
  )
}

export default WaveComponent


// big
{
  /* <svg
        viewBox="0 0 1440 590"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="99%" y1="40%" x2="1%" y2="60%">
            <stop offset="5%" stopColor="#ae0296"></stop>
            <stop offset="95%" stopColor="#3b68fd"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,600 C 0,600 0,300 0,300 C 117.07177033492826,298.32535885167465 234.14354066985652,296.65071770334924 322,307 C 409.8564593301435,317.34928229665076 468.4976076555023,339.7224880382775 550,333 C 631.5023923444977,326.2775119617225 735.8660287081342,290.4593301435407 836,254 C 936.1339712918658,217.54066985645935 1032.0382775119617,180.44019138755982 1132,188 C 1231.9617224880383,195.55980861244018 1335.9808612440193,247.7799043062201 1440,300 C 1440,300 1440,600 1440,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
          transform="rotate(-180 720 300)"
        ></path>
      </svg> */
}
// small
{
  /* <svg viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="gradient" x1="99%" y1="40%" x2="1%" y2="60%">
    <stop offset="5%" stopColor="#ae0296"></stop>
    <stop offset="95%" stopColor="#3b68fd"></stop>
  </linearGradient>
</defs>
<path
  d="M 0,500 C 0,500 0,250 0,250 C 72.02870813397132,261.16746411483257 144.05741626794264,272.3349282296651 242,265 C 339.94258373205736,257.6650717703349 463.7990430622009,231.82775119617224 568,233 C 672.2009569377991,234.17224880382776 756.7464114832536,262.35406698564594 849,284 C 941.2535885167464,305.64593301435406 1041.2153110047848,320.75598086124404 1141,314 C 1240.7846889952152,307.24401913875596 1340.3923444976076,278.62200956937795 1440,250 C 1440,250 1440,500 1440,500 Z"
  stroke="none"
  strokeWidth="0"
  fill="url(#gradient)"
  fillOpacity="1"
  transform="rotate(-180 720 250)"
></path>
</svg> */
}
