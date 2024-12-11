import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Button, CardActions } from '@mui/material';
import axios from 'axios';

function Projects() {
  const theme = useTheme();
  const [projects, setProjects] = useState([]); // State to store fetched project data

  // Fetch projects from the API
  useEffect(() => {
    axios.get('https://eazy-byts-ten.vercel.app/api/project')
      .then((response) => {
        setProjects(response.data.projects); // Store the fetched projects in state
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <div id="Project" className="flex flex-col pl-[15px] sm:pl-[250px] mt-20 sm:my-48 w-[98vw] h-full sm:h-[70vh]">
      <div className="flex justify-start items-start">
        <div className="flex flex-col items-start sm:py-2">
          <h2 className="sm:text-6xl text-4xl text-yellow-500 my-2">Discover</h2>
          <h1 className="sm:text-8xl text-5xl relative text-white">
            <span className="parent">My </span>
            <span>Projects </span>
          </h1>
        </div>
      </div>
      <div className="my-28 flex sm:flex-row justify-around items-center flex-col">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <MediaCard
              key={index}
              link={project.link}
              theme={theme}
              name={project.title}
              wed={project.imageUrl}
              dis={project.description}
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ color: '#fff' }}>No projects available</Typography>
        )}
      </div>
    </div>
  );
}

function MediaCard({ name, dis, wed, theme, link }) {
  return (
    <Card
      sx={{
        width: '500px',
        height: '580px',
        marginRight: '100px',
        backgroundColor: '#212121',
        borderRadius: '3',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
        },
        [theme.breakpoints.down('sm')]: {
          width: '90%',
          height: '570px',
          marginBottom: 5,
          marginRight: '10px',
        },
      }}
    >
      <CardMedia sx={{ height: 250 }} image={wed} title={name} />
      <CardContent sx={{ color: '#fff' }}>
        <Typography gutterBottom variant="h4" className="text-4xl" component="div">
          {name}
        </Typography>
        <Typography variant="p" sx={{ color: '#fff', textAlign: 'justify' }}>
          {dis}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={link} target="_blank">Navigate to Site</Button>
      </CardActions>
    </Card>
  );
}

export default Projects;
