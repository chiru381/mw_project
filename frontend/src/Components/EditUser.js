import React from "react";
import "../Styles/EditUser.css";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../SharableComponents/Loader";
import Input from "../SharableComponents/Input";

function EditUser({ onClose, onSubmit, user, loading }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
    },
  });

  function handleClick(data) {
    const userDetails = {
      user_id: user.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
    };

    onSubmit(userDetails);
  }

  return (
    <div className="popup-background">
      <div className="edit-user-container">
        <CloseIcon className="close-icon" sx={{ fontSize: 35 }} onClick={onClose} />
        <h3>Edit</h3>
        <form>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            validation={register("first_name", {
              required: "First Name is required",
            })}
            error={errors.first_name && errors.first_name.message}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            validation={register("last_name", {
              required: "Last Name is required",
            })}
            error={errors.last_name && errors.last_name.message}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            validation={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email && errors.email.message}
          />

          <Input
            label="Mobile number"
            placeholder="Enter your mobile number"
            validation={register("phone_number", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]/,
                message: "Invalid mobile number",
              },
              maxLength: {
                value: 10,
                message: "Invalid mobile number",
              },
              minLength: {
                value: 10,
                message: "Invalid mobile number",
              },
            })}
            error={errors.phone_number && errors.phone_number.message}
          />

          <button className="btn" onClick={handleSubmit(handleClick)} disabled={loading}>
            {loading ? <Loader /> : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
