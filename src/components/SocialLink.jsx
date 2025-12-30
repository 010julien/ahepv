import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialLink = ({ platform, url, style = {} }) => {
  const getIcon = (platformName) => {
    switch (platformName.toLowerCase()) {
      case 'facebook': return <FaFacebookF />;
      case 'linkedin': return <FaLinkedinIn />;
      case 'instagram': return <FaInstagram />;
      case 'twitter': return <FaTwitter />;
      case 'x': return <FaXTwitter />;
      case 'tiktok': return <FaTiktok />;
      default: return null;
    }
  };

  const getName = (platformName) => {
    return platformName.charAt(0).toUpperCase() + platformName.slice(1);
  };

  return (
    <div className="social-link-wrapper">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`social-link-item ${platform.toLowerCase()}`}
        aria-label={getName(platform)}
        style={style}
      >
        {getIcon(platform)}
      </a>
      <span className="social-tooltip">{getName(platform)}</span>
      
      <style>{`
        .social-link-wrapper {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .social-link-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%; /* Make it round like the example, or keep user's radius if preferred, but example looked round/pill? User said "icon changes". Let's stick to standard icon but add background on hover */
          color: inherit; /* Inherit color from parent (white in header, etc) */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.2rem;
          text-decoration: none;
        }

        .social-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background-color: var(--color-primary); /* Beige color from the screenshot */
          color: var(--color-white); /* Dark text */
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          margin-bottom: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Tooltip Arrow */
        /* .social-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: #e4c5a9 transparent transparent transparent;
        } */

        /* Hover States */
        .social-link-wrapper:hover .social-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .social-link-wrapper:hover .social-link-item {
          transform: translateY(-2px);
          color: white !important; /* Icon becomes white on colored background */
        }

        /* Brand Colors */
        .social-link-wrapper:hover .social-link-item.facebook {
          background-color: #1877F2;
          box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
        }

        .social-link-wrapper:hover .social-link-item.linkedin {
          background-color: #0A66C2;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
        }

        .social-link-wrapper:hover .social-link-item.instagram {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          box-shadow: 0 4px 12px rgba(214, 36, 159, 0.3);
        }

        .social-link-wrapper:hover .social-link-item.twitter {
          background-color: #1DA1F2;
          box-shadow: 0 4px 12px rgba(29, 161, 242, 0.3);
        }
        
        .social-link-wrapper:hover .social-link-item.x {
          background-color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .social-link-wrapper:hover .social-link-item.tiktok {
          background-color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          text-shadow: 2px 2px 0px #FE2C55, -2px -2px 0px #25F4EE; /* Tikok glitch effect */
        }
      `}</style>
    </div>
  );
};

export default SocialLink;
