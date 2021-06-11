import React, { useState } from "react";
import { connect } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Image,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Heading,
  Button
} from "@chakra-ui/react";

export const MediaList = props => {
  const [option, setOption] = useState({ media: "poster" });
  const { movie, match } = props;

  const handleButton = v => {
    setOption({ media: v });
  };

  let renderMedia;

  if (option.media === "backdrop") {
    renderMedia =
      props &&
      movie &&
      movie.images &&
      movie.images.backdrops &&
      movie.images.backdrops.length > 0 &&
      movie.images.backdrops.slice(0, 5).map(item => {
        return (
          <Td key={`${item.file_path}-${item.width}-${item.vote_count}`}>
            <Box
              width="400px"
              borderRadius="lg"
              rounded="lg"
              boxShadow="lg"
              bg="white"
              border
            >
              <Image
                width="100%"
                alt=""
                src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${item.file_path}`}
              />
            </Box>
          </Td>
        );
      });
  } else {
    renderMedia =
      props &&
      movie &&
      movie.images &&
      movie.images.posters &&
      movie.images.posters.length > 0 &&
      movie.images.posters.slice(0, 5).map(item => {
        return (
          <Td key={`${item.file_path}-${item.width}-${item.vote_count}`}>
            <Box
              w="200px"
              borderRadius="lg"
              rounded="lg"
              boxShadow="lg"
              bg="white"
              border
            >
              <Image
                borderRadius="lg"
                rounded="lg"
                alt=""
                width="100%"
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.file_path}`}
              />
            </Box>
          </Td>
        );
      });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" mx="5" py="1">
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <Box>
              <Heading fontSize="24" my="5">
                Media
              </Heading>
            </Box>

            <Box>
              {/* <Button
                colorScheme="blue"
                my="5"
                mx="2"
                cursor="pointer"
                variant={option.media === "video" ? "solid" : "outline"}
                onClick={() => handleButton("video")}
              >
                Video
              </Button> */}
              <Button
                colorScheme="blue"
                my="5"
                mx="2"
                cursor="pointer"
                variant={option.media === "poster" ? "solid" : "outline"}
                onClick={() => handleButton("poster")}
              >
                Posters
              </Button>
              <Button
                colorScheme="blue"
                my="5"
                mx="2"
                cursor="pointer"
                variant={option.media === "backdrop" ? "solid" : "outline"}
                onClick={() => handleButton("backdrop")}
              >
                Backdrops
              </Button>
            </Box>

            <Box>
              <Button
                as={LinkRouter}
                to={`/movie/${match.params.id}/${option.media}s`}
                variant="link"
                colorScheme="blue"
                mt="2"
                mb="4"
                cursor="pointer"
              >
                See All
              </Button>
            </Box>
          </Flex>
          <Box overflowX="auto">
            <Table size="sm">
              <Tbody>
                <Tr>{renderMedia}</Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps)(MediaList);
