import React, { useState, useEffect } from "react";
import {
  Box,
  CSSReset,
  Heading,
  ThemeProvider,
  theme,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { saveToken } from "../../../Tools/common";
import { FETCH_LOGIN } from "../../../Actions/Types";
import { apiRequestTokenGet, apiLoginPost } from "../action";

const LoginPage = props => {
  const [warningMessage, setWarningMessage] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    request_token: ""
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
    setWarningMessage(false);
  };
  const handleSubmit = async () => {
    try {
      const response = await apiLoginPost(formValue, {
        api_key: "9fb464885aa2556a6049224563c3f671"
      });
      const { data } = response;
      if (data.success) {
        saveToken(data.request_token);
        props.setLogin(data.request_token);
        props.history.replace("/movie/popular");
      }
    } catch (e) {
      console.log(e);
      setFormValue({ ...formValue, username: "", password: "" });
      setWarningMessage(true);
    }
  };

  const getRequestToken = async () => {
    try {
      const response = await apiRequestTokenGet({
        api_key: "9fb464885aa2556a6049224563c3f671"
      });
      const { data } = response;
      props.setLogin(data.request_token);
      setFormValue({ ...formValue, request_token: data.request_token });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRequestToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box w={500} p={4} m="20px auto">
          <Heading as="h2" size="xl" textAlign="center" m={5}>
            Login Form
          </Heading>
          <Box
            border
            borderRadius="lg"
            mx="5"
            spacing="8"
            p="5"
            rounded="lg"
            boxShadow="lg"
            bg="white"
          >
            <FormControl id="username" my="5">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                size="sm"
                borderRadius="5px"
                borderWidth="1"
                borderColor="gray.400"
                bg="white"
                value={formValue.username}
              />
            </FormControl>
            <FormControl id="password" my="5">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                size="sm"
                borderRadius="5px"
                borderWidth="1"
                borderColor="gray.400"
                bg="white"
                value={formValue.password}
              />
            </FormControl>
            <Button
              isFullWidth
              colorScheme="facebook"
              type="submit"
              onClick={handleSubmit}
              my="3"
            >
              Submit
            </Button>
            <FormControl>
              <FormHelperText color="red">
                {warningMessage && "Wrong Username / Password"}
              </FormHelperText>
              {/* <FormHelperText>
                <Link as={LinkRouter} to="/register" color="teal.500" href="#">
                  Create New Account
                </Link>
              </FormHelperText> */}
            </FormControl>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
const mapStateToProps = state => ({
  token: state.auths.token,
  session: state.auths.session
});

const mapDispatchToProps = dispatch => ({
  setLogin: payload =>
    dispatch({
      type: FETCH_LOGIN,
      payload
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
