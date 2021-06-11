import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Flex,
  Text,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { FETCH_LOGOUT } from "../Actions/Types";
import { removeToken } from "../Tools/common";

const Navbar = props => {
  const handleLogout = () => {
    removeToken();
    props.setLogout();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Flex
            bg="blue.900"
            w="100%"
            px={5}
            py={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text pl={3} py="3" color="white" fontWeight="bold">
                <LinkRouter to="/movie/popular">Movie TV Apps</LinkRouter>
              </Text>
            </Flex>
            <Box display="flex">
              <Link
                m={2}
                as={LinkRouter}
                color="white"
                fontWeight="bold"
                to="/search"
              >
                Search
              </Link>
              <Menu>
                <MenuButton as={Link} color="white" fontWeight="bold" m="2">
                  Movie
                </MenuButton>
                <MenuList borderWidth="0">
                  <MenuItem as={LinkRouter} to="/movie/popular">
                    Popular
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/movie/now-playing">
                      Now Playing
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/movie/upcoming">
                      Upcoming
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/movie/top-rated">
                      Top Rated
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Link} color="white" fontWeight="bold" m="2">
                  TV Shows
                </MenuButton>
                <MenuList borderWidth="0">
                  <MenuItem as={LinkRouter} to="/tv-show">
                    Popular
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/tv-show/airing-today">
                      Airing Today
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/tv-show/on-the-air">
                      On TV
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={LinkRouter} to="/tv-show/top-rated">
                      Top Rated
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link
                m={2}
                as={LinkRouter}
                color="white"
                fontWeight="bold"
                to="/people"
              >
                People
              </Link>
              <Link
                m={2}
                as={LinkRouter}
                onClick={handleLogout}
                color="white"
                fontWeight="bold"
                to="login"
              >
                Logout
              </Link>
            </Box>
          </Flex>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  setLogout: payload =>
    dispatch({
      type: FETCH_LOGOUT,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
