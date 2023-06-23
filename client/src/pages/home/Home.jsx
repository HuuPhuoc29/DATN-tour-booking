import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import { Box, Image, Text } from '@chakra-ui/react';
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <Box display="flex" flexDir={"column"} textAlign={"center"} w="full" mb="20px">
          {/* <Box >
            <Text fontSize={"28px"} className='fontReey' color={"var(--highlight-color)"}>Danh sách địa điểm</Text>
          </Box> */}
          <Box >
            <Text fontSize={"28px"} className='fontReey' color={"var(--highlight-color)"}>
            Tận hưởng nhưỡng điều mới lạ
            </Text>
          </Box>
          <Box>
            <Text fontSize={"38px"} fontWeight={"700"} color={"var(--highlight-color)"} >Khám phá những địa điểm huyền bí !</Text>
          </Box>
          {/* <Box>
            <Text fontSize={"38px"} fontWeight={"700"} color={"var(--highlight-color)"} >Chào mừng đến với bình nguyên vô tận !</Text>
          </Box> */}
        </Box>
        <Box display="flex" alignItems="center" w="full" mb="10px">
          {/* <Box maxW={'25%'} px="5px" role="group"> */}
          <Box maxW={'50%'} px="5px" role="group"> 
            <Box overflow={"hidden"} rounded={'10px'}>
              <Image
                w={'full'}
                transition={"all 0.5s ease"}
                cursor="pointer"
                _groupHover={{
                  transform: 'scale(1.1)',
                }}
                src={
                  'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-1.f32b89c3.png'
                }
                // src={
                //   'https://telehub.vn/wp-content/uploads/2021/09/99-thuyen_hoa.jpeg'
                // }
              />
            </Box>
          </Box>
          <Box maxW={'50%'} px="5px" role="group">
              <Box overflow={"hidden"} rounded={'10px'}>
                  <Image
                      w={'full'}
                      transition={"all 0.5s ease"}
                      cursor={"pointer"}
                      _groupHover={{
                          transform: 'scale(1.1)'
                      }}
                      rounded={'10px'}
                      src={
                      'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-2.6b007ca8.png'
                      }
                      // src={
                      //   'https://www.anhdulich.vn/storage/sliders/slide4.jpg'
                      // }
                  />
              </Box>          
          </Box>
          <Box maxW={'28%'} px="5px" role="group">
            <Box overflow={"hidden"} rounded={'10px'}>
              <Image
                w={'full'}
                transition={"all 0.5s ease"}
                cursor="pointer"
                _groupHover={{
                  transform: 'scale(1.1)',
                }}
                src={
                  'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-3.d37d50e6.png'
                }
                // src={
                //   'https://savingbooking.com/wp-content/uploads/2020/05/chia-se-4-meo-nho-chup-anh-du-lich-sieu-sieu-dep-savingbooking-6.jpg'
                // }
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" w="full" mb="10px">
          <Box maxW={'50%'} px="5px" role="group">
            <Box overflow={"hidden"} rounded={'10px'}>
              <Image
                w={'full'}
                transition={"all 0.5s ease"}
                cursor="pointer"
                _groupHover={{
                  transform: 'scale(1.1)',
                }}
                src={
                  'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-4.0ba8a85a.png'
                }
                // src={
                //   'https://i2-prod.manchestereveningnews.co.uk/incoming/article23387908.ece/ALTERNATES/s1200b/0_GettyImages-1384570282.jpg'
                // }
              />
            </Box>
          </Box>  
          <Box maxW={'50%'} px="5px" role="group">
            <Box overflow={"hidden"} rounded={'10px'}>
              <Image
                w={'full'}
                transition={"all 0.5s ease"}
                cursor="pointer"
                _groupHover={{
                  transform: 'scale(1.1)',
                }}
                src={
                  'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-5.a1a8d71b.png'
                }
                // src={
                //   'https://scontent.fdad8-1.fna.fbcdn.net/v/t39.30808-6/305470577_2133440270160721_6526450887703845510_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CiIHT9LxpKMAX-Qrjii&_nc_ht=scontent.fdad8-1.fna&oh=00_AfByOZEtQnmwJBS0jIuHGpfJ3Xfu7gfXwGgCS5m1BYwZDg&oe=6372BFA6'
                // }
                
              />
            </Box>
          </Box>      
        </Box> 
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
