import { Button } from "Components/Button";
import { Radio } from "Components/Checkbox";
import { Field, FieldCheckboxes } from "Components/Field";
import Input from "Components/input/input";
import { Label } from "Components/label";
import { db } from "FirebaseApp/Firebase-config";
import DashboardHeading from "Module/Dashboard/DashboardHeading";
import PageNotFound from "Pages/NotFoundPage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.title, { lower: true }),
      status: +values.status,
    });
    toast.success("Update category succesfully");
    navigate("/manage/category")
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id : ${categoryId}`}
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
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
                checked={+watchStatus === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
