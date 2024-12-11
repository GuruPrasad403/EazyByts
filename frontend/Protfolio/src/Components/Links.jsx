import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

function Links() {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <div className="flex flex-col gap-2 sm:flex-row justify-around items-center sm:h-[6vh] h-[12vh] w-full bg-[#212121] p-4">
      
     
      {/* Right: Social Media Links */}
      <div className="flex space-x-6">
        
        {/* GitHub Link */}
        <a href="https://github.com/guruprasad403" target="_blank" rel="noopener noreferrer">
          <GitHubIcon sx={{ fontSize: 30, color: 'white' }} className="hover:text-[#efa22d]" />
        </a>

        {/* Instagram Link */}
        <a href="https://www.instagram.com/Chandu_7.g" target="_blank" rel="noopener noreferrer">
          <InstagramIcon sx={{ fontSize: 30, color: 'white' }} className="hover:text-[#efa22d]" />
        </a>

        {/* X (Twitter) Link */}
        <a href="https://twitter.com/guru89516" target="_blank" rel="noopener noreferrer">
          <XIcon sx={{ fontSize: 30, color: 'white' }} className="hover:text-[#efa22d]" />
        </a>

        {/* LinkedIn Link */}
        <a href="https://www.linkedin.com/in/g-guru-prasad-766025254/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon sx={{ fontSize: 30, color: 'white' }} className="hover:text-[#efa22d]" />
        </a>

      </div>
       {/* Left: Copyright Text */}
       <div className="text-white text-sm">
        © {currentYear} All rights reserved.
      </div>
      
      
    </div>
  );
}

export default Links;
