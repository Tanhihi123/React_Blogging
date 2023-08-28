import { Button } from "Components/Button";
import Radio from "Components/Checkbox/Radio";
import { Dropdown } from "Components/Dropdown";
import { Field } from "Components/Field";
import Input from "Components/input/input";
import { Label } from "Components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "Components/Image/ImageUpload";
import useFirebaseImg from "Hooks/UseFirebaseImg";
import Toggle from "Components/Toggle/Toggle";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "FirebaseApp/Firebase-config";
import { useAuth } from "Contexts/Auth-context";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryID: "",
      hot: false,
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    handleSelectImage,
    handleDelImage,
    progress,
    image,
    setImage,
    setProgress,
  } = useFirebaseImg(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectcategory, setSelectCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = +values.status;
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt : serverTimestamp(),
      });
      toast.success("Create new post successfully");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryID: "",
        hot: false,
      });
      setImage("");
      setProgress(0);
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    document.title = "Add Post";
  },[])
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let rs = [];
      querySnapshot.forEach((doc) => {
        rs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(rs);
    }
    getData();
  }, []);
  const handleClickOption = (item) => {
    setValue("categoryID", item.id);
    setSelectCategory(item);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDelImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectcategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-green-50 text-sm text-green-600 font-medium">
                {selectcategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto w-[250px]" isLoading={loading} disabled={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
