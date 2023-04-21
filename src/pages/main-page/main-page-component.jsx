import Box from '@mui/material/Box';
import Share from '../../components/SharePost/share-component';
import Posts from '../../components/Posts/posts-component';
import Header from '../../components/Header/header-component';

import '@fontsource/roboto/300.css';

const MainPage = () => {
 return (
  <Box sx={{ width: "100%" }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Share />
      <Posts />
    </Box>
  </Box>
 ) 
};

export default MainPage;
