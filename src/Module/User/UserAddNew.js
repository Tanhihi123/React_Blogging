import { Button } from "Components/Button";
import { Radio } from "Components/Checkbox";
import { Field, FieldCheckboxes } from "Components/Field";
import ImageUpload from "Components/Image/ImageUpload";
import Input from "Components/input/input";
import { Label } from "Components/label";
import { useAuth } from "Contexts/Auth-context";
import { auth, db } from "FirebaseApp/Firebase-config";
import useFirebaseImg from "Hooks/UseFirebaseImg";
import DashboardHeading from "Module/Dashboard/DashboardHeading";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    handleSelectImage,
    handleDelImage,
    progress,
    image,
    setImage,
    setProgress,
  } = useFirebaseImg(setValue, getValues);
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password); // Thêm vào authentication
    await addDoc(collection(db, "users"), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.username || values.fullname, {
        lower: true,
        replacement: "",
        trim: true,
      }),
      avatar: image,
      status: +values.status,
      role: +values.role,
      createdAt: serverTimestamp(),
    });
    toast.success(
      `Create new user with email : ${values.email} successfully !!`
    );
    reset({
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    });
    setImage("");
    setProgress(0);
    } catch (error) {
      console.log(error)
      toast.error("Can not create new user");
    }
    
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDelImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
