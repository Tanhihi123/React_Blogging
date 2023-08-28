import Input from "Components/input/input";
import { Label } from "Components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "Components/Field";
import { Button } from "Components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "FirebaseApp/Firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "Components/input/InputPasswordToggle";
import slugify from "slugify";
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  Email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  Password: yup
    .string()
    .min(8, "Your password must be at least 8 character or greater")
    .matches(
      /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "The password must contain at least one capital letter and one special character"
    )
    .required("Please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    // console.log(values);
    if (!isValid) return;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000);
    // });
    const user = await createUserWithEmailAndPassword(
      auth,
      values.Email,
      values.Password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.Email,
      password: values.Password,
      username: slugify(values.fullname, { lower: true }),
    });
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.Email,
    //   password: values.Password,

    // });
    toast.success("Register successfully !!!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <div>
      <AuthenticationPage>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="fullname" className="label">
              FullName
            </Label>
            <Input
              name="fullname"
              type="text"
              placeholder="Enter Your Full Name"
              control={control}
            ></Input>
            <Label htmlFor="Email" className="label">
              Email Address
            </Label>
            <Input
              name="Email"
              type="email"
              placeholder="Enter Your Email Address"
              control={control}
            ></Input>
            <Label htmlFor="Password" className="label">
              Password
            </Label>
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
          <div className="have-account">
            You already have an account , bro ?{" "}
            <NavLink to={"/sign-in"}>Login</NavLink>
          </div>
          <Button
            type="submit"
            style={{
              width: "100%",
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </AuthenticationPage>
    </div>
  );
};

export default SignUpPage;
