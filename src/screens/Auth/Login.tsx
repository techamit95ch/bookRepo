import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interfaces";
import { NativeBaseProvider, ScrollView } from "native-base";
import LoginForm from "../../components/Forms/LoginForm";
import { login } from "../../actions/auth";

const LoginScreen = ({ navigation }) => {
  const results = useSelector((state: any) => state.results);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, results]);
  const [hide, setHide] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [successMessage, setSuccess] = useState<string>("");
  const [error, setError] = useState({
    isError: false,
    email: "",
    errorMessage: "",
  });
  const [alert, setAlert] = useState(false);
  const validate = () => {
    if (user.email !== "") {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(user.email))) {
        setError({ ...error, email: ``, isError: false });
      } else {
        console.log(user.email + ":");
        setError({
          ...error,
          email: user.email + `is not a valid email address`,
          isError: true,
        });
      }
    }
  };
  const submit = async () => {
    // console.log(user);
    try {
      await login(user);
      await dispatch(login(user));
      console.log(results);
      if (results.success && results.isAuthenticated) {
        await setSuccess("User Created Successfully");
        await setAlert(true);
        await setTimeout(() => navigation.navigate("Content"), 5000);
      } else {
        await setError({ ...error, errorMessage: results.errorMessage });
        await setAlert(true);
      }
    } catch (err: any) {
      await setError({ ...error, errorMessage: results.errorMessage });
      console.error(err);
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView style={{ height: "100%", backgroundColor: "#fff" }}>
        <LoginForm
          navigation={navigation}
          user={user}
          setUser={setUser}
          validate={validate}
          submit={submit}
          alert={alert}
          error={error}
          loginUser={results}
        />
        
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
